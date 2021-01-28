const { getIssues } = require('.');

jest.mock('request-promise', () =>
  jest.fn(() =>
    Promise.resolve({
      issuesData: {
        issues: []
      }
    })
  )
);

const request = require('request-promise');

test('makes a request for jira issues', async () => {
  const jiraUrl = 'https://example.org';
  const rapidViewId = '123';
  const project = 'proj';
  const options = {
    foo: 'bar'
  };

  await getIssues({ jiraUrl, rapidViewId, project, options });

  const uri = `${jiraUrl}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`;

  expect(request).toBeCalledWith({
    uri,
    foo: 'bar',
    json: true
  });
});

test('uses api user and key if given', async () => {
  const jiraUrl = 'https://example.org';
  const rapidViewId = '123';
  const project = 'proj';
  const apiUser = 'user';
  const apiKey = 'abcdef';
  const options = {
    foo: 'bar'
  };

  await getIssues({ jiraUrl, rapidViewId, project, apiUser, apiKey, options });

  const uri = `${jiraUrl}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`;

  const auth = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  expect(request).toBeCalledWith({
    uri,
    foo: 'bar',
    json: true,
    headers: {
      authorization: `Basic ${auth}`
    }
  });
});
