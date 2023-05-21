#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import * as config from '../config.json'
import { ProjectCblSiteStackStack } from '../lib/project_cbl_site_stack-stack'

const app = new cdk.App()
new ProjectCblSiteStackStack(app, 'ProjectCblSiteStackStack', {
  env: {
    account: config.account,
    region: config.region,
  },
})
