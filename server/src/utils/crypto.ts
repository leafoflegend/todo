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
    hash(password, salt, (err, genHash) => {
      if (err) rej(err);
      else res(genHash);
    });
  });

type ComparePassAndHash = (password: string, genHash: string) => Promise<boolean>;
const comparePassAndHash: ComparePassAndHash = (password, genHash) =>
  new Promise((res, rej) => {
    compare(password, genHash, (err, same) => {
      if (err) rej(err);
      res(same);
    });
  });

export { createSalt, createHash, comparePassAndHash };
