import { install } from 'source-map-support';
install();

import { dbManager } from './db';
import setupNest from './api';
import { Logger } from './utils';

const l = new Logger('root');

const bootstrapApplication = async () => {
  try {
    l.info('Bootstrapping application...');
    await dbManager.setup(!!process.env.CLEAR_DB, !!process.env.SEED_DB);
    await setupNest();
    l.info('Application bootstrapped.');
  } catch (e) {
    l.err('Failed to bootstrap application.', e);
  }
};

bootstrapApplication();
