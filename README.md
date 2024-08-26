![Banner Light](./.assets/banner-vitest-mockrequire-light.png#gh-light-mode-only)
![banner Dark](./.assets/banner-vitest-mockrequire-dark.png#gh-dark-mode-only)

# vitest-mockrequire

## Overview

I started writing more vitest scenarios for Auth0 Action Scripts and Auth0 does not support ESM in Action Scripts, only CommonJS.
And, I became tifrustrated trying to work around the limitation in vitest that it won't mock Node.js "require".
I understand the problems facing the maintainers of vitest.
If you are using a package framework with its own module loader this may not be easy to hook into and mock.

However, the CommonJS module loader for Node.js is well defined.
Well, maybe not in the documentation, but it is!
So, to start I created a Node.js package that can be used to shim a "mockNodeRequire" method onto the vi object in vitest
to mock "requires" in the code under test.
The model allows for similar shims to be created and delivered for other module loaders using the framework defined
in this package.

## Configuration and Use

With npm or yarn import this module into the test module where you want to mock CommonJS modules.
Since this is intended for unit testing, import the module as a development dependency.
The module overrrides the module loader and allows the mocking of multiple CommonJS modules.

```
$ npm install --save-dev vitest-mockrequire
```

This module depends on the "latest" version of vitest; the test suite also needs to do that to make
sure it is using the same version (or this will not work).
package.json should specify "latest":

```
{
    "devDependencies": {
        "vitest-mockrequire": "latest"
        "vitest": "latest"
    }
}
```

Import vitest and the module in the test suite.
This module depends on the prior import of 'vi' from 'vitest', in order to align
with whatever version of vitest brought into your project.
What other exports from vitest you import are up to you, this is just an example.

```
import { beforeAll, beforeEach, vi } from 'vitest'
import 'vitest-mockrequire'
```

vitest-mockrequire does export the mock creation function.
If you prefer, and it is defined in the index.d.ts file for TypeScript, you
may import and use the function directly:

```
import { mockNodeRequire } from 'vitest-mockrequire'
```

Mock CommonJS modules by calling the mock creation function.
This example uses the mockNodeRequire creation function:

```
vi.mockNodeRequire('auth0', {}) // or directly with mockNodeRequire('auth0', {})
```

This extends to the modules tested from the test suite by override the module load for all running code.

## Implementation

vitest fits with ESM very well, while jest fits with CommonJS.
Because the focus is ESM, vitest-mockrequire is only delivered as an ESM module.
Of course an index.d.ts file is provided for TypeScript compatibility.

### 

CommonJS require loads modules when called, not hoisted to the top of the module.
Because of this, there is no requirement to hoist an overload of require before anything
else in a module load.
This model defines a function that may be used 

```
async function mockNodeRequire(module, testDouble) {
}

vi.mockNodeRequire = mockNodeRequire

export default mockNodeRequire
```

### Multiple Module Mocking

This model extends some examples that are found around the Internet, but adds mocking multiple
CommonJS modules at the same time.
An object named *testDoubles* is attached to the function object to remember the test doubles
for each module, using the module name as an object property name.
Strict mode blocks a standalone function from having a *this* pointer that points to itself;
to get arround this the function is names using a classic  and the name references
the function:

```
async function  mockNodeRequire(module, testDouble) {

    if (!Object.getOwnPropertyNames(mockRequire).testDoubles) {

        mockNodeRequire.testDoubles = {}
```

### Overridding Module._load

Overriding the Node.js module loader is fairly simple with ESM.
In this model the override is handled in the function that will be used for mocking, the first time the
function is called.
After the override, if it is necessary, the test double is added to the testDoubles object.
_load looks at the module requested and either serves the double or the actual module if no double exists:

```
async function  mockNodeRequire(module, testDouble) {

    if (!mockNodeRequire.testDoubles) {

        mockNodeRequire.testDoubles = {}

        const { Module } = await import('module')

        Module._load_original = Module._load

        Module._load = (uri, parent) => {

            const result = mocNodeRequire.testDoubles[uri] ?? Module._load_original(uri, parent)

            return result
        }
    }

    mockNodeRequire.testDoubles[module] = testDouble
}
```

The last step is the index.js module.
This loads all of the defined mock require modules for different module loaders and attaches them
too the vi object:

```
import mockNodeRequire from './mockNodeRequire'

vi.mockNodeRequire = mockNodeRequire

export { mockNodeRequire }
```

## License

The code is licensed under the MIT license. You may use and modify all or part of it as you choose, as long as attribution to the source is provided per the license. See the details in the [license file](./LICENSE.md) or at the [Open Source Initiative](https://opensource.org/licenses/MIT).


<hr>
Copyright © 2024 Joel A Mussman. All rights reserved.