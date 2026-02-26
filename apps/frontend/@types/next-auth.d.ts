import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string // Passkey associated with the user
    } & DefaultSession['user']
  }
  interface User {
    accessToken: string // Passkey associated with the user
  }
}
