import nock from 'nock';

import { getIssues } from '.';

test('makes a request for jira issues', async () => {
  const jiraUrl = 'https://example.org';
  const rapidViewId = '123';
  const project = 'proj';

  nock(jiraUrl)
    .get(`/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`)
    .reply(200, {
      issuesData: {
        issues: [{ foo: 'bar' }],
      },
    });

  const issues = await getIssues({ jiraUrl, rapidViewId, project });

  expect(issues).toEqual([{ foo: 'bar' }]);
});

test('uses api user and key if given', async () => {
  const jiraUrl = 'https://example.org';
  const rapidViewId = '123';
  const project = 'proj';
  const apiUser = 'user';
  const apiKey = 'abcdef';

  const auth = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  nock(jiraUrl, {
    reqheaders: { authorization: `Basic ${auth}` },
  })
    .get(`/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`)
    .reply(200, {
      issuesData: {
        issues: [{ foo: 'bar' }],
      },
    });

  const issues = await getIssues({ jiraUrl, rapidViewId, project, apiUser, apiKey });

  expect(issues).toEqual([{ foo: 'bar' }]);
});
