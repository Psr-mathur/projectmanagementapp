import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Layout from '@/components/app-layout';
import { AuthWrapper } from '@/components/auth-wrapper';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={GeistSans.className}>
        <Layout>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </Layout>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
