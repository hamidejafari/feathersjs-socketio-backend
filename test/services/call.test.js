const assert = require('assert');
const app = require('../../src/app');

describe('\'call\' service', () => {
  it('registered the service', () => {
    const service = app.service('call');

    assert.ok(service, 'Registered the service');
  });
});
