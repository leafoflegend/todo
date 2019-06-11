import { DBManager } from './db';
import setupNest from './api';
import { Logger } from './utils';
import configureApplication from './configure';

const l = new Logger('root');

const bootstrapApplication = async () => {
  try {
    l.info('Bootstrapping application...');

    const dbManager = new DBManager();

    await dbManager.setup(!!process.env.CLEAR_DB, !!process.env.SEED_DB);

    await setupNest();

    l.info('Application bootstrapped.');
  } catch (e) {
    l.err('Failed to bootstrap application.', e);
    throw e;
  }
};

configureApplication();
const applicationBootstrappedPromise = bootstrapApplication();

export default applicationBootstrappedPromise;
