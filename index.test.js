jest.mock('alfy', () => ({
  output: jest.fn(),
  error: jest.fn()
}));

const mockResults = [
  {
    title: 'foo',
    subtitle: 'baz'
  }
];

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

test('alfy app outputs a valid list', async () => {
  const alfy = require('alfy');
  jest.mock('./src/alfred-jira', () => () => Promise.resolve(mockResults));
  await require('.');
  expect(alfy.output).toHaveBeenCalledWith(mockResults);
});

test('alfy app passes appropriate config to jira', async () => {
  jest.mock('./src/alfred-jira', () => jest.fn());
  const alfredJira = require('./src/alfred-jira');
  process.env.PROJECT = 'proj';
  process.env.RAPIDVIEWID = 'rvi';
  process.env.JIRA_URL = 'ju';
  await require('.');
  expect(alfredJira).toHaveBeenCalledWith({
    project: 'proj',
    rapidViewId: 'rvi',
    jiraUrl: 'ju'
  });
});

test('alfy app reports errors using alfy.error', async () => {
  const alfy = require('alfy');
  jest.mock('./src/alfred-jira', () => () => Promise.reject(new Error('foobarbaz')));
  await require('.');
  expect(alfy.output).not.toHaveBeenCalled();
  expect(alfy.error).toHaveBeenCalledWith('foobarbaz');
});
