// index
// Copyright © Joel A Mussman. All rights reserved.
//
// This module depends on following import { 'vi' } from 'vitest'. This module
// always depends on the "latest" version. If the version does not line up with
// the version used in the test suite, the method will not appear on that vi
// because node_modules manages multiple versions.
//

import { vi } from 'vitest'

import mockForNodeRequire from '../src/mockForNodeRequire'

// vi is and alias, not a class, and does not have a prototoype. The function is injected
// directly onto it. See the index.d.ts file for TypeScript declarations.

vi.mockForNodeRequire = mockForNodeRequire

// Export all defined mock creation functions here for direct use.

export { mockForNodeRequire }