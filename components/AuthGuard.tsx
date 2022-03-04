import { Box } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthProps {
  guest: boolean;
}

const AuthGuard: React.FC<AuthProps> = ({ children, guest }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.accessToken;

  if (status !== 'loading') {
    if (guest) {
      if (!isUser) {
        return <>{children}</>;
      } else {
        router.push('/');
      }
    } else {
      if (isUser) {
        return <>{children}</>;
      } else {
        router.push('/auth/login');
      }
    }
  }

  return (
    <>
      <Box bg="gray.700" width="full" height="full"></Box>
    </>
  );
};

export default AuthGuard;
