const fs = require("fs");

const request = require("request-promise");

const CA_PATH = process.env.CA_PATH || "/etc/pki/tls/certs/ca-bundle.crt";
const CERT_PATH = process.env.CERT_PATH || "/etc/pki/tls/certs/client.crt";
const KEY_PATH = process.env.KEY_PATH || "/etc/pki/tls/private/client.key";

const defaultOptions = {
	ca: fs.readFileSync(CA_PATH),
	cert: fs.readFileSync(CERT_PATH),
	key: fs.readFileSync(KEY_PATH),
	keepAlive: true,
	rejectUnauthorized: false,
	secureProtocol: "TLSv1_method"
};

module.exports = options => {
	return request({ ...defaultOptions, ...options });
};
