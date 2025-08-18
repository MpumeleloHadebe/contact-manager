const assert = require('assert');
const db = require('../db');

describe('Database Tests', function() {
  it('should connect to the database', function(done) {
    db.connect((err) => {
      assert.strictEqual(err, null);
      done();
    });
  });

  it('should fetch all contacts', function(done) {
    db.query('SELECT * FROM contacts', (err, results) => {
      assert.strictEqual(err, null);
      assert.ok(Array.isArray(results));
      done();
    });
  });
});
