import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import crypto from 'crypto';
import { Params } from 'express-serve-static-core';

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';

// A type interface for our user (it does not validate any data)
interface UserData {
  _id?: string;
  email: string;
  nick?: string;
  password: string;
  avatar?: string;
  country?: string;
  githubId?: string;
}

export class Users extends Service<UserData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create (data: UserData, params?: Params) {
    // This is the information we want from the user signup data
    console.log('user', data, params);
    const { email, password, githubId } = data;
    const nick = email.split('@')[0];
    const country = 'US';
    // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    // The full avatar URL
    const avatar = `${gravatarUrl}/${hash}?${query}`;
    // The complete user
    const userData = {
      email,
      nick,
      password,
      avatar,
      country,
      githubId
    };

    console.log('user', userData);
    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
}
