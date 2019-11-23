// import * as authentication from '@feathersjs/authentication';
import { before_Sit, after_Sit } from '../../hooks/player';
// Don't remove this comment. It's needed to format import lines nicely.

// const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [before_Sit()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [after_Sit()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
