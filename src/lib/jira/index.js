import got from 'got';

const getHeaders = (apiKey, apiUser) => {
  if (!apiKey || !apiUser) {
    return {};
  }
  const auth = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  return {
    headers: {
      authorization: `Basic ${auth}`,
    },
  };
};

export const getIssues = async ({ jiraUrl, project, rapidViewId, options, apiKey, apiUser }) => {
  const URL = `${jiraUrl}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`;
  const headers = getHeaders(apiKey, apiUser);
  const { issuesData } = await got(URL, { ...options, ...headers }).json();

  return issuesData.issues;
};
