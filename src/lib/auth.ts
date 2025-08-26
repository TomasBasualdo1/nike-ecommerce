import { BetterAuth } from 'better-auth';
import { DrizzleAdapter } from 'better-auth/drizzle-adapter';
import { db } from './db';
import { users } from './db/schema';
import Google from 'better-auth/providers/google';

export const auth = new BetterAuth({
  adapter: DrizzleAdapter(db, users),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
});
