#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NewsletterBlogStack } from '../lib/newsletter-blog-stack';

const app = new cdk.App();
new NewsletterBlogStack(app, 'NewsletterBlogStack');
