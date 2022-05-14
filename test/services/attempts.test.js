const assert = require('assert');
const app = require('../../src/app');

describe('\'attempts\' service', () => {
  it('registered the service', () => {
    const service = app.service('attempts');

    assert.ok(service, 'Registered the service');
  });
});
