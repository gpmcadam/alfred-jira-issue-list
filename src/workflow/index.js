const alfy = require('alfy');

const alfredJira = require('../alfred-jira');

const { PROJECT, RAPIDVIEWID, JIRA_URL, API_KEY, API_USER } = process.env;

module.exports = async () => {
  try {
    const options = {
      project: PROJECT,
      rapidViewId: RAPIDVIEWID,
      jiraUrl: JIRA_URL,
      apiUser: API_USER,
      apiKey: API_KEY
    };
    const res = await alfredJira(options);
    alfy.output(res);
  } catch (e) {
    alfy.error(e.message);
  }
};
