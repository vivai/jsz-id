# jst-uid

Generators for universally unique ids, unique ids and ids.

## API

### idGenerator
```
idGenerator(prefix: string = EMPTY_STRING, start: number = 0): () => string
```
Returns a function to generate ids.

Example:
```
let id = idGenerator();
id(); // 0
id(); // 1

let fooId = idGenerator('foo');
fooId(); // foo:0
fooId(); // foo:1

let barId = idGenerator('bar', 10);
barId(); // bar:a
barId(); // bar:b
```

### uid
```
uid(): string
```
Returns a unique id composed from a uuid and a counter.

Example:
```
console.log(uid()); // 5c4d369a-5973-4946-804d-3bd875900383:0
console.log(uid()); // 5c4d369a-5973-4946-804d-3bd875900383:1
```

### uuid
```
uuid(): string
```
Create and return a "version 4" RFC-4122 UUID string.

Example:
```
console.log(uuid()); // 2c6e369a-5973-4946-804d-3bd875900383
```
