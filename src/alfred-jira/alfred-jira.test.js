import nock from 'nock';

import alfredJira from '.';

const project = 'project';
const rapidViewId = 'foo';
const jiraUrl = 'https://example.org';

test('the app gives back alfred-compatible results', async () => {
  const expected = [
    {
      title: 'foo',
      subtitle: 'bar | baz',
      match: 'foo bar baz qux',
      text: {
        copy: 'foo',
        largetype: 'foo',
      },
      arg: `https://example.org/browse/foo`,
    },
  ];

  nock(jiraUrl)
    .get(`/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${rapidViewId}&selectedProjectKey=${project}`)
    .reply(200, {
      issuesData: {
        issues: [
          {
            key: 'foo',
            statusName: 'bar',
            summary: 'baz',
            assignee: '124',
            assigneeName: 'qux',
          },
        ],
      },
    });

  const res = await alfredJira({
    rapidViewId,
    jiraUrl,
    project,
  });
  expect(res).toEqual(expected);
});
