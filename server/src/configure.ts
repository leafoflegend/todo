import { install } from 'source-map-support';
import dotenv from 'dotenv';
import path from 'path';

import { Logger } from './utils';

const l = new Logger('configure');

const configureApplication = (startPath: string = '../../..', tries: number = 0): void => {
  // TODO: Switch this to recursively searching upwards. This seems off because of what the file structure looks like when we build the TS.
  if (!process.env.LOCAL_DEV && !process.env.CI && !process.env.DEPLOYED) {
    const envPath = path.join(__dirname, startPath, './.env');
    l.info('Installing .env variables.');
    const envConfigResult = dotenv.config({ path: envPath });

    if (envConfigResult.error) {
      if (tries === 0) {
        l.info('Taking second attempt at locating .env file.');
        configureApplication('../..', tries + 1);
      } else {
        l.err('Cannot find .env file after multiple attempts.', envConfigResult.error);
        process.exit(1);
      }
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
