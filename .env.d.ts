interface ImportMetaEnv {
  // Environment
  NODE_ENV: 'development' | 'production';

  // URL
  WEB_URL: string;

  // CMS
  WEB_AUTH_DOMAIN: string;
  WEB_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>;
}
