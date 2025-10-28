//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import '@testing-library/jest-dom/vitest';
import { expect, vi } from 'vitest';
import { createSerializer } from '@emotion/jest';

expect.addSnapshotSerializer(createSerializer());

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
