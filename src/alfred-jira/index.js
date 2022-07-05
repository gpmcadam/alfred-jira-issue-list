import { getIssues } from '../lib/jira/index.js';
import certOptions from '../lib/fetch-with-certs/index.js';

export default async ({ project, rapidViewId, jiraUrl, apiUser, apiKey }) => {
  const issues = await getIssues({ project, rapidViewId, jiraUrl, apiUser, apiKey, options: certOptions });

  return issues.map(({ key, statusName, summary, assigneeName }) => ({
    title: key,
    subtitle: `${statusName} | ${summary}`,
    match: `${key} ${statusName} ${summary} ${assigneeName}`,
    text: {
      copy: key,
      largetype: key,
    },
    arg: `${jiraUrl}/browse/${key}`,
  }));
};
