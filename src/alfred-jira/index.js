const { getIssues } = require('../lib/jira');
const certOptions = require('../lib/fetch-with-certs');

const required = args => {
  Object.entries(args).map(([name, val]) => {
    if (!val) {
      throw new Error(`Missing required argument for app: ${name}`);
    }
  });
};

module.exports = async ({ project, rapidViewId, jiraUrl, apiUser, apiKey } = {}) => {
  required({ project, rapidViewId, jiraUrl });

  const issues = await getIssues({ project, rapidViewId, jiraUrl, apiUser, apiKey, options: certOptions });

  return issues.map(({ key, statusName, summary, assigneeName }) => ({
    title: key,
    subtitle: `${statusName} | ${summary}`,
    match: `${key} ${statusName} ${summary} ${assigneeName}`,
    text: {
      copy: key,
      largetype: key
    },
    arg: `${jiraUrl}/browse/${key}`
  }));
};
