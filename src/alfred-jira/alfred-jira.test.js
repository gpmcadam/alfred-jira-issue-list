const alfredJira = require('.');

const requiredParams = {
  rapidViewId: 'foo',
  jiraUrl: 'https://example.org',
  project: 'project'
};

jest.mock('../lib/jira', () => ({
  getIssues: () =>
    Promise.resolve([
      {
        key: 'foo',
        statusName: 'bar',
        summary: 'baz'
      }
    ])
}));

test('the app throws an exception when a required param is missing', async () => {
  for (const key in Object.keys(requiredParams)) {
    try {
      await alfredJira({
        ...requiredParams,
        [key]: undefined
      });
    } catch (e) {
      expect(e.message).toContain('Missing');
      expect(e.message).toContain(key);
    }
  }

  try {
    await alfredJira();
  } catch (e) {
    expect(e.message).toContain('Missing');
  }
});

test('the app gives back alfred-compatible results', async () => {
  const expected = [
    {
      title: 'foo',
      subtitle: 'bar | baz',
      match: 'foo bar baz',
      text: {
        copy: 'foo',
        largetype: 'foo'
      },
      arg: `${requiredParams.jiraUrl}/browse/foo`
    }
  ];
  const res = await alfredJira(requiredParams);
  expect(res).toEqual(expected);
});
