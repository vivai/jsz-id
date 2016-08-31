//@flow

import {EMPTY_STRING} from 'jsz-string';

// eslint-disable-next-line no-magic-numbers
const COUNTER_LIMIT = Math.floor(Number.MAX_SAFE_INTEGER / 2);
const HEX_RADIX = 16;

let counter = 0;
let separator = ':';
let uuidTemplate = Array.from('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx');
let randomHexDigit = () => Math.floor(Math.random() * HEX_RADIX);
let seed = uuid();

/**
 * Returns a unique id composed from a uuid and a counter.
 * @example
 * console.log(uid()); // 5c4d369a-5973-4946-804d-3bd875900383:0
 * console.log(uid()); // 5c4d369a-5973-4946-804d-3bd875900383:1
 *
 */
export function uid(): string {
  let id = seed + separator + counter.toString(HEX_RADIX);

  if (counter < COUNTER_LIMIT) {
    counter++;
  } else {
    counter = 0;
    seed = uuid();
  }

  return id;
}

/**
 * Create and return a "version 4" RFC-4122 UUID string.
 * @example
 * console.log(uuid()); // 2c6e369a-5973-4946-804d-3bd875900383
 */
export function uuid(): string {
  return uuidTemplate.map((digit) => {
    if (digit === 'x') {
      digit = randomHexDigit().toString(HEX_RADIX);
    } else if (digit === 'y') {
      /* eslint-disable no-magic-numbers */
      digit = (randomHexDigit() & 0x3 | 0x8).toString(HEX_RADIX);
      /* eslint-enable */
    }

    return digit;
  }).join('');
}

/**
 * Returns a function to generate ids.
 * @example
 * let id = idGenerator();
 * id(); // 0
 * id(); // 1
 *
 * let fooId = idGenerator('foo');
 * fooId(); // foo:0
 * fooId(); // foo:1
 *
 * let barId = idGenerator('bar', 10);
 * barId(); // bar:a
 * barId(); // bar:b
 */
export function idGenerator(
    prefix: string = EMPTY_STRING, start: number = 0): () => string {

  if (start > COUNTER_LIMIT) {
    throw new Error(`Start value too large (max = ${COUNTER_LIMIT}).`);
  }

  let counter = start;

  if (prefix !== EMPTY_STRING) {
    prefix += separator;
  }

  return function() {
    let id = prefix + counter.toString(HEX_RADIX);

    if (counter < COUNTER_LIMIT) {
      counter++;
    } else {
      prefix += counter.toString(HEX_RADIX) + separator;
      counter = 0;
    }

    return id;
  }
}
