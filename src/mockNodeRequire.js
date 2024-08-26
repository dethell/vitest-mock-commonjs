// mockNodeRequire
// Copyright © 2024 Joel A Mussman. All rights reserved.
//

// There is no "this" on a function in strict mode so the only way to attach data to the function
// is to name it and refer to the name, this explains the class funciton . testDoubles is
// used to hold the double for each module overridden.

async function  mockNodeRequire(module, testDouble) {

    if (!Object.getOwnPropertyNames(mockNodeRequire).testDoubles) {

        mockNodeRequire.testDoubles = {}

        // On the first call override the Module._load() method in Node.js. The override checks the
        // testDoubles to see if the module requested is overridden, and if it is the double is
        // returned, else the actual module.

        const { Module } = await import('module')

        Module._load_original = Module._load

        Module._load = (uri, parent) => {

            const result = mockNodeRequire.testDoubles[uri] ?? Module._load_original(uri, parent)

            return result
        }
    }

    mockNodeRequire.testDoubles[module] = testDouble

    // If the function is standalone, "this" will be undefined. If the function is used attached to
    // vi (VitestUtils) the function will return the object for chained method calls.

    return this
}

export default mockNodeRequire