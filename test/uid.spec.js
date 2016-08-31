//@flow
'use strict';

import {test} from 'tape';
import {uuid,uid} from '../src/id.js';

/* eslint-disable no-magic-numbers */

test('uid', function(t) {

  t.ok(typeof uid === 'function',
      'Function uid is imported.');

  t.ok(typeof uuid === 'function',
      'Function uuid is imported.');

  let myUid1 = uid();
  let myUid2 = uid();
  let myUuid = uuid();

  let formatUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  t.true(formatUuid.test(myUuid));

  t.equal(myUid1.substring(0,35), myUid2.substring(0, 35));

  t.end();

});
