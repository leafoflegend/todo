import { genSalt, hash, compare } from 'bcrypt';
import CONSTANTS from '../constants';

const {
  AUTHENTICATION: { SALT_ROUNDS },
} = CONSTANTS;

type CreateSalt = () => Promise<string>;
const createSalt: CreateSalt = () =>
  new Promise((res, rej) => {
    genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) rej(err);
      else res(salt);
    });
  });

type CreateHash = (password: string, salt: string) => Promise<string>;
const createHash: CreateHash = (password, salt) =>
  new Promise((res, rej) => {
    hash(password, salt, (err, hash) => {
      if (err) rej(err);
      else res(hash);
    });
  });

type ComparePassAndHash = (password: string, hash: string) => Promise<boolean>;
const comparePassAndHash: ComparePassAndHash = (password, hash) =>
  new Promise((res, rej) => {
    compare(password, hash, (err, same) => {
      if (err) rej(err);
      res(same);
    });
  });

export { createSalt, createHash, comparePassAndHash };
