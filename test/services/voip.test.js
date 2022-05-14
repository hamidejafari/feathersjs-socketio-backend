const assert = require('assert');
const app = require('../../src/app');

describe('\'voip\' service', () => {
  it('registered the service', () => {
    const service = app.service('voip');

    assert.ok(service, 'Registered the service');
  });
});
