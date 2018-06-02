// const { authenticate } = require('feathers-authentication').hooks;
const { disallow, populate } = require('feathers-hooks-common');
const {
  restrictToOwner
} = require('feathers-authentication-hooks');
const restrict = [
  restrictToOwner()
];

const commentSchema = {
  include: {
    service: 'comments',
    nameAs: 'comment',
    parentField: 'relatedCommentId',
    childField: '_id',
    query: {
      $limit: 1
    },
    include: {
      service: 'users',
      nameAs: 'user',
      parentField: 'userId',
      childField: '_id',
      query: {
        $limit: 1,
        $select: ['_id', 'name', 'slug', 'avatar', 'lastActiveAt', 'thumbnails']
      }
    }
  }
};

const contributionSchema = {
  include: {
    service: 'contributions',
    nameAs: 'contribution',
    parentField: 'relatedContributionId',
    childField: '_id',
    query: {
      $limit: 1
    }
  }
};

const userSchema = {
  include: {
    service: 'users',
    nameAs: 'user',
    parentField: 'relatedUserId',
    childField: '_id',
    query: {
      $limit: 1,
      $select: ['_id', 'name', 'slug', 'avatar', 'lastActiveAt', 'thumbnails']
    }
  }
};

module.exports = {
  before: {
    all: [ ],
    find: [ ...restrict ],
    get: [ ...restrict ],
    create: [ disallow('external') ],
    update: [ ...restrict ],
    patch: [ ...restrict ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      populate({ schema: contributionSchema }),
      populate({ schema: commentSchema }),
      populate({ schema: userSchema })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
