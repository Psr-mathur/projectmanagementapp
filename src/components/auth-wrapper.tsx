import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      const authUrl = new URL('/api/auth/signin', window.location.origin);
      router.push(authUrl.toString()).catch(console.error);
    }
  }, [router, session, status]);

  return (
    <>
      {children}
    </>
  );
}