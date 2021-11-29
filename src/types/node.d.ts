declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ENV: 'dev' | 'prod';
    }
  }
}

export {};
