const { getIssues } = require('../lib/jira');
const certOptions = require('../lib/fetch-with-certs');

const required = args => {
  Object.entries(args).map(([name, val]) => {
    if (!val) {
      throw new Error(`Missing required argument for app: ${name}`);
    }
  });
};

module.exports = async ({ project, rapidViewId, jiraUrl } = {}) => {
  required({ project, rapidViewId, jiraUrl });

  const issues = await getIssues({ project, rapidViewId, jiraUrl, options: certOptions });

  return issues.map(({ key, statusName, summary }) => ({
    title: key,
    subtitle: `${statusName} | ${summary}`,
    match: `${key} ${statusName} ${summary}`,
    text: {
      copy: key,
      largetype: key
    },
    arg: `${jiraUrl}/browse/${key}`
  }));
};
