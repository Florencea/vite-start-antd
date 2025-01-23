/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string;
  readonly VITE_FAVICON: string;
  readonly VITE_TITLE: string;
  readonly VITE_WEB_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
