const fs = require('fs');
const alfy = require('alfy');

const request = require('./fetch-with-certs');

const { PROJECT, RAPIDVIEWID, JIRA_URL } = process.env;

if (!PROJECT) {
  alfy.error('Missing environment variable PROJECT');
  process.exit(-1);
}

if (!RAPIDVIEWID) {
  alfy.error('Missing environment variable RAPIDVIEWID');
  process.exit(-1);
}

if (!JIRA_URL) {
  alfy.error('Missing environment variable JIRA_URL');
  process.exit(-1);
}

const URL = `${JIRA_URL}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${RAPIDVIEWID}&selectedProjectKey=${PROJECT}`;

const data = await request({ uri: URL, json: true });
const issues = data.issuesData.issues.map(({ key, statusName, summary, avatarUrl }) => ({
  title: key,
  subtitle: `${statusName} | ${summary}`,
  match: `${key} ${statusName} ${summary}`,
  text: {
    copy: key,
    largetype: key
  },
  arg: `${JIRA_URL}/browse/${key}`
}));

alfy.output(issues);
