import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import {
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  SSLMethod,
  ViewerCertificate,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3'
import { Aws, RemovalPolicy } from 'aws-cdk-lib'
import * as certificateManager from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as cloudWatch from 'aws-cdk-lib/aws-cloudwatch'
import * as path from 'path'

export class ProjectCblSiteStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // DOC assets holder
    const bucket = new Bucket(this, `ProjectCBLAssetBucket`, {
      accessControl: BucketAccessControl.PRIVATE,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    // distribution files
    const filesPath = '../../build'

    // Grant access to assets bucket
    const originAccessIdentity = new OriginAccessIdentity(
      this,
      'OriginAccessIdentity'
    )
    bucket.grantDelete(originAccessIdentity)
    bucket.grantRead(originAccessIdentity)

    const domainName = 'projectcbl.com'

    // Look up pre-established route53 Domain
    const hostedZone = route53.HostedZone.fromLookup(this, 'myHostedZone', {
      domainName: domainName,
    })

    // Validate Certificate through DNS
    const certificateArn = new certificateManager.DnsValidatedCertificate(
      this,
      'cdk-acm',
      {
        domainName: domainName,
        hostedZone: hostedZone,
        region: 'us-east-1',
      }
    ).certificateArn

    const viewCertificate = ViewerCertificate.fromAcmCertificate(
      {
        certificateArn,
        env: {
          region: Aws.REGION,
          account: Aws.ACCOUNT_ID,
        },
        node: this.node,
        stack: this,
        applyRemovalPolicy(policy: RemovalPolicy) {
          // Add your removal policy if necessary
        },
        metricDaysToExpiry: () => {
          return new cloudWatch.Metric({
            namespace: 'cdk-metric',
            metricName: 'cdk-metric',
          })
        },
      },
      {
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
        aliases: [domainName],
      }
    )

    // Aws Cloudfront distribution
    const cloudFrontDistribution = new CloudFrontWebDistribution(
      this,
      'cloudFront',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: originAccessIdentity,
            },
            behaviors: [
              {
                viewerProtocolPolicy:
                  ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                allowedMethods:
                  CloudFrontAllowedMethods.GET_HEAD,
                compress: true,
                isDefaultBehavior: true,
              },
            ],
          },
        ],
        viewerCertificate: viewCertificate,
        defaultRootObject: '/index.html',
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            //todo: Add error page destination
            responsePagePath: '/index.html',
          },
        ],
      }
    )

    // Deploy distribution to assets bucket
    const bucketDeployment = new BucketDeployment(
      this,
      `BucketDeployment`,
      {
        destinationBucket: bucket,
        sources: [Source.asset(path.resolve(__dirname, filesPath))],
        distribution: cloudFrontDistribution,
        distributionPaths: ['/*'],
      }
    )

    new route53.ARecord(this, 'a-record', {
      recordName: domainName,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(cloudFrontDistribution)
      ),
    })
  }
}
