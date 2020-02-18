const alfy = require('alfy');

const alfredJira = require('./src/alfred-jira');

const { PROJECT, RAPIDVIEWID, JIRA_URL } = process.env;

(async () => {
  try {
    const options = {
      project: PROJECT,
      rapidViewId: RAPIDVIEWID,
      jiraUrl: JIRA_URL
    };
    const res = await alfredJira(options);
    alfy.output(res);
  } catch (e) {
    alfy.error(e.message);
  }
})();
