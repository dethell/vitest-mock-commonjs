// index.d.ts
// Copyright © 2024 Joel A Mussman. All rights reserved.
//
// Look at index.js for the injection of mock creation functions into the vi object.
// vi is an alias for the interface VitestUtils, so the interface is updated here
// with the mock creation functions injected into vi.
//
// Note: to follow the pattern established in VitestUtils the mock creation functions
// will return the object to which they are attached and allow method chaining. This
// is ignored in the direct call to the functions, where "this" will be undefined
// and there is nothing to return.
//

import { Vitest } from "vitest";

interface VitestUtils {

    mockNodeRequire: (module: string, testDouble: any) => VitestUtils
}

export function mockNodeRequire(module: string, testDouble: any): void;