import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import crypto from 'crypto';
import { Params } from 'express-serve-static-core';

// The Gravatar image service
const gravatarUrl = 'http://s.gravatar.com/avatar';
// The size query.
const query = 's=60';

// A type interface for our user ( it does not validate any data)
interface UserData {
  _id?: string;
  email: string;
  password: string;
  avatar?: string;
  oauth_id?: string;
}

export class Users extends Service {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create(data: UserData, params?: Params) {
    console.log(data);
    // This is the information we want from the user signup data
    const { email, password, oauth_id } = data;
    // Gravtar uses MD5 hashes from an email address (all lowercase) to get the image
    const hash = crypto
      .createHash('md5')
      .update(email.toLocaleLowerCase())
      .digest('hex');
    // The full avatar URL
    const avatar = `${gravatarUrl}/${hash}?${query}`;
    // The complete user
    const UserData = {
      email,
      password,
      oauth_id,
      avatar
    };

    // Call the orgiginal 'create method with exisiting 'params' and new data
    return super.create(UserData, params);
  }
}
