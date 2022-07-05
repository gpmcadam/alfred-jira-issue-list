import fs from 'fs';

const { USE_ENTERPRISE_SSL } = process.env;

const CA_PATH = process.env.CA_PATH || '/etc/pki/tls/certs/ca-bundle.crt';
const CERT_PATH = process.env.CERT_PATH || '/etc/pki/tls/certs/client.crt';
const KEY_PATH = process.env.KEY_PATH || '/etc/pki/tls/private/client.key';

export default USE_ENTERPRISE_SSL
  ? {
      ca: fs.existsSync(CA_PATH) && fs.readFileSync(CA_PATH),
      cert: fs.existsSync(CERT_PATH) && fs.readFileSync(CERT_PATH),
      key: fs.existsSync(KEY_PATH) && fs.readFileSync(KEY_PATH),
      keepAlive: true,
      rejectUnauthorized: false,
      secureProtocol: 'TLSv1_method',
    }
  : {};
