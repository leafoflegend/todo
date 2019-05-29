import { install } from 'source-map-support';
import dotenv from 'dotenv';
import path from 'path';

import { Logger } from './utils';

const l = new Logger('configure');

const configureApplication = (): void => {
  if (!process.env.DEV) {
    // TODO: Switch this to recursively searching upwards. This seems off because of what the file structure looks like when we build the TS.
    const envPath = path.join(__dirname, '../../..', './.env');
    l.info('Installing .env variables.');
    const envConfigResult = dotenv.config({ path: envPath });

    if (envConfigResult.error) {
      l.err('Error configuring .env file.', envConfigResult.error);
    } else {
      l.info('Parsed .env variables added: ', JSON.stringify(envConfigResult.parsed));
      const injectedStatuses = Object.keys(envConfigResult.parsed).map(envKey => {
        if (
          typeof process.env[envKey] !== 'undefined' &&
          process.env[envKey] === envConfigResult.parsed[envKey]
        ) {
          return `${envKey}: TRUE`;
        }

        return `${envKey}: FALSE`;
      });
      l.info('Injection Statuses: ', JSON.stringify(injectedStatuses));
    }
  }

  install();
};

export default configureApplication;
