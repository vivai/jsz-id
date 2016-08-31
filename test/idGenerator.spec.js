//@flow
'use strict';

import {test} from 'tape';
import {idGenerator} from '../src/id.js';

/* eslint-disable no-magic-numbers */

test('idGenerator', function(t) {

  t.ok(typeof idGenerator === 'function',
      'Function idGenerator is imported.');

  let myId = idGenerator();

  t.equal(myId(), '0', 'myId() // 0');
  t.equal(myId(), '1', 'myId() // 1');
  t.equal(myId(), '2', 'myId() // 2');

  let fooId = idGenerator('FOO');

  t.equal(fooId(), 'FOO:0', 'fooId() // FOO:0');
  t.equal(fooId(), 'FOO:1', 'fooId() // FOO:1');
  t.equal(fooId(), 'FOO:2', 'fooId() // FOO:2');

  let start = Math.floor(Number.MAX_SAFE_INTEGER / 2);
  let barId = idGenerator('BAR', start);

  t.equal(barId(), 'BAR:fffffffffffff',
      'barId() // FOO:fffffffffffff');
  t.equal(barId(), 'BAR:fffffffffffff:0',
      'barId() // FOO:fffffffffffff:1');
  t.equal(barId(), 'BAR:fffffffffffff:1',
      'barId() // FOO:fffffffffffff:2');

  t.throws(function() {
    idGenerator('BOO', Number.MAX_VALUE);
  }, /.*Start.value.too.large.*/, 'Start value to large');
  t.end();

});
