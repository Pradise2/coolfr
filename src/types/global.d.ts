declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Authorization token for the bot. This is used to validate the hash's authenticity. */
      BOT_TOKEN: string;
    }
  }
}
