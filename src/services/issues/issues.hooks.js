const { authenticate } = require("@feathersjs/authentication").hooks;
const sendNotification = require('../../hooks/after-issue');
const beforeIssueCreate = require('../../hooks/before-issue-create');

module.exports = {
    before: {
        all: [
            authenticate("jwt")
        ],
        find: [],
        get: [],
        create: [beforeIssueCreate()],
        update: [],
        patch: [],
        remove: []
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [
          //  sendNotification()
        ],
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
