import bcrypt from 'bcrypt';
import { User, usersByProperty } from '../models/User';
// export const login = (res, rej) => {};

export const findUserByEmail = (email: string): Promise<User> => {
  return new Promise(async (res, rej) => {
    const user = usersByProperty({ email }).first();
    if (!user) {
      rej();
    }
    res(user);
  });
};

export const validatePassword = (password: string, user: User): Promise<User> => {
  return new Promise(async (res, rej) => {
    if (await bcrypt.compare(password, user.password)) {
      res(user);
    } else {
      rej();
    }
  });
};
