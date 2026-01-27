//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import '@testing-library/jest-dom/vitest';
import { createSerializer } from '@emotion/jest';
import { expect } from 'vitest';

expect.addSnapshotSerializer(createSerializer());

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
