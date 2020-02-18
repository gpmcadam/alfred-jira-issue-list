require("dotenv").config();

const fs = require("fs");
const crypto = require("crypto");
const alfy = require("alfy");
const mime = require("mime-types");

const request = require("./fetch-with-certs");

const { PROJECT, RAPIDVIEWID, JIRA_URL } = process.env;

const URL = `${JIRA_URL}/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=${RAPIDVIEWID}&selectedProjectKey=${PROJECT}`;

const data = await request({ uri: URL, json: true });
const issues = data.issuesData.issues.map(
	({ key, statusName, summary, avatarUrl }) => ({
		title: key,
		subtitle: `${statusName} | ${summary}`,
		match: `${key} ${statusName} ${summary}`,
		text: {
			copy: key,
			largetype: key
		},
		arg: `${JIRA_URL}/browse/${key}`
	})
);

alfy.output(issues);
