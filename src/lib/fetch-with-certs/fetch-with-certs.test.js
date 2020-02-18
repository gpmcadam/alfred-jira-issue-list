jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn(path => {
    const filesMock = {
      ca: 'ca-contents',
      key: 'key-contents',
      cert: 'cert-contents'
    };
    return filesMock[path];
  })
}));

test('it returns a valid list of options', () => {
  process.env.CA_PATH = 'ca';
  process.env.CERT_PATH = 'cert';
  process.env.KEY_PATH = 'key';

  const config = require('.');

  expect(config).toEqual({
    ca: 'ca-contents',
    cert: 'cert-contents',
    key: 'key-contents',
    keepAlive: true,
    rejectUnauthorized: false,
    secureProtocol: 'TLSv1_method'
  });
});
