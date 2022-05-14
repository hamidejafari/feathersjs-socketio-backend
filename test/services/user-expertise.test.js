const assert = require('assert');
const app = require('../../src/app');

describe('\'userExpertise\' service', () => {
  it('registered the service', () => {
    const service = app.service('userExpertise');

    assert.ok(service, 'Registered the service');
  });
});
