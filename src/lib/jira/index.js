const request = require('request-promise');

const getIssues = ({ jiraUrl, project, rapidViewId, options }) => {
  const URL = `${jiraUrl}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`;

  return request({ ...options, uri: URL, json: true }).then(res => res.issuesData.issues);
};

module.exports = { getIssues };
