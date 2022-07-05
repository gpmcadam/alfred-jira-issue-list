import alfy from 'alfy';

import alfredJira from '../alfred-jira/index.js';

const { PROJECT, RAPIDVIEWID, JIRA_URL, API_KEY, API_USER } = process.env;

export default async () => {
  if (!PROJECT) {
    throw new Error('Please configure the plugin. Missing: PROJECT');
  }

  if (!RAPIDVIEWID) {
    throw new Error('Please configure the plugin. Missing: RAPIDVIEWID');
  }

  if (!JIRA_URL) {
    throw new Error('Please configure the plugin. Missing: JIRA_URL');
  }

  try {
    const options = {
      project: PROJECT,
      rapidViewId: RAPIDVIEWID,
      jiraUrl: JIRA_URL,
      apiUser: API_USER,
      apiKey: API_KEY,
    };
    const res = await alfredJira(options);
    alfy.output(res);
  } catch (e) {
    alfy.error(e.message);
  }
};
