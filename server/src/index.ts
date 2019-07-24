import { DBManager } from './db';
import setupNest from './api';
import { Logger } from './utils';
import configureApplication from './configure';

const l = new Logger('root');

const bootstrapApplication = async () => {
  const dbManager = new DBManager();

  dbManager
    .setup(!!process.env.CLEAR_DB, !!process.env.SEED_DB)
    .then(() => {
      l.suc('Database initialized.');
    })
    .catch(e => {
      l.err('Database failed to initialize.', e);
    });

  try {
    l.info('Bootstrapping application...');

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
