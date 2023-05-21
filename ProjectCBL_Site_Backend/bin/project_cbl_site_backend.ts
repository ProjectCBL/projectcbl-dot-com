#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProjectCblSiteBackendStack } from '../lib/project_cbl_site_backend-stack';

const app = new cdk.App();
new ProjectCblSiteBackendStack(app, 'ProjectCblSiteBackendStack', {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  }
});