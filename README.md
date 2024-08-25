![Banner Light](./.assets/banner-vitest-mockrequire-light.png#gh-light-mode-only)
![banner Dark](./.assets/banner-vitest-mockrequire-dark.png#gh-dark-mode-only)

# vitest-mockrequire

## Overview

To be frank, I started writing more vitest scenarios for Auth0 Action Scripts and Auth0 does not support ESM in Action Scripts, only CommonJS.
I became tired of trying to work around the limitation in vitest that it won't mock Node.js "require".
I get the problems facing the maintainers of vitest.
If you are using a package framework with its own module loader this is not easy to do.
But, I am running unit tests in Node.js, and the module loader is well defined.
Well, not in the documentation, but it is!

So, I created a Node.js package that can be used to shim a "mockRequire" method onto the vi object in vitest to mock "requires" in
the code under test.

## Implementation


## Configuration



## License

The code is licensed under the MIT license. You may use and modify all or part of it as you choose, as long as attribution to the source is provided per the license. See the details in the [license file](./LICENSE.md) or at the [Open Source Initiative](https://opensource.org/licenses/MIT).


<hr>
Copyright © 2024 Joel A Mussman. All rights reserved.