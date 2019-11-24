// import * as authentication from '@feathersjs/authentication';
import { sitBefore, sitAfter } from '../../hooks/player';
// Don't remove this comment. It's needed to format import lines nicely.

// const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [sitBefore()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [sitAfter()],
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
