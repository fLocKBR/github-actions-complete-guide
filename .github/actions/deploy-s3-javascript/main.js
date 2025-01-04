const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  const bucketName = core.getInput('bucket-name', { required: true });
  const sourceDir = core.getInput('source-dir', { required: true });
  const region = core.getInput('region', { required: true });
  const s3Uri = `s3://${bucketName}`;

  exec.exec(`aws s3 sync ${sourceDir} ${s3Uri} --delete --region ${region}`);

  const websiteUrl = `http://${bucketName}.s3-website-${region}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl);

  core.notice('Deploying to S3');
}

run();