const request = require('request-promise');

const getHeaders = (apiKey, apiUser) => {
  if (!apiKey || !apiUser) {
    return {};
  }
  const auth = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  return {
    headers: {
      authorization: `Basic ${auth}`
    }
  };
};

const getIssues = ({ jiraUrl, project, rapidViewId, options, apiKey, apiUser }) => {
  const URL = `${jiraUrl}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`;
  const headers = getHeaders(apiKey, apiUser);
  return request({ ...options, uri: URL, json: true, ...headers }).then(res => res.issuesData.issues);
};

module.exports = { getIssues };
