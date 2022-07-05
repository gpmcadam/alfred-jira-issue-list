import { jest } from '@jest/globals';

jest.unstable_mockModule('alfy', () => ({
  default: {
    output: jest.fn(),
    error: jest.fn(),
  },
}));

const mockResults = [
  {
    title: 'foo',
    subtitle: 'baz',
  },
];

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

process.env.PROJECT = 'proj';
process.env.RAPIDVIEWID = 'rvi';
process.env.JIRA_URL = 'ju';
process.env.API_USER = 'apiu';
process.env.API_KEY = 'apik';

test('alfy app outputs a valid list', async () => {
  const alfy = await import('alfy');
  jest.unstable_mockModule('../alfred-jira', () => ({
    default: () => Promise.resolve(mockResults),
  }));
  const { default: workflow } = await import('.');
  await workflow();
  expect(alfy.default.output).toHaveBeenCalledWith(mockResults);
});

test('alfy app passes appropriate config to jira', async () => {
  jest.unstable_mockModule('../alfred-jira', () => ({ default: jest.fn() }));
  const alfredJira = await import('../alfred-jira');
  const { default: workflow } = await import('.');

  await workflow();
  expect(alfredJira.default).toHaveBeenCalledWith({
    project: 'proj',
    rapidViewId: 'rvi',
    jiraUrl: 'ju',
    apiUser: 'apiu',
    apiKey: 'apik',
  });
});

test('alfy app reports errors using alfy.error', async () => {
  const alfy = await import('alfy');
  jest.unstable_mockModule('../alfred-jira', () => ({ default: () => Promise.reject(new Error('foobarbaz')) }));
  const { default: workflow } = await import('.');
  await workflow();

  expect(alfy.default.output).not.toHaveBeenCalled();
  expect(alfy.default.error).toHaveBeenCalledWith('foobarbaz');
});
