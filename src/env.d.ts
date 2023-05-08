//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

declare module 'ress';

interface ImportMeta {
  readonly env: {
    readonly VITE_APPLICATIONINSIGHTS_INSTRUMENTATION_KEY: string,
    readonly VITE_MSAL_AUTHORITY: string,
    readonly VITE_MSAL_CLIENT_ID: string,
    readonly VITE_MSAL_TENANT_ID: string
  }
}
