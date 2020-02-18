const jira = require('.');

jest.mock('request-promise', () => jest.fn());

const request = require('request-promise');

test('makes a request for jira issues', async () => {
  const jiraUrl = 'https://example.org';
  const rapidViewId = '123';
  const project = 'proj';
  const options = {
    foo: 'bar'
  };

  await jira({ jiraUrl, rapidViewId, project, options });

  const uri = `${jiraUrl}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`;

  expect(request).toBeCalledWith({
    uri,
    foo: 'bar',
    json: true
  });
});
