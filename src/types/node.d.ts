declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'prod';
    }
  }
}

export {};
