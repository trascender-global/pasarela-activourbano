import { Box, Button, Icon, Image, Show } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';

const AuNavbar: FC = ({ children }) => {
  return (
    <Box
      id="navbar"
      bg="whiteAlpha.100"
      width="full"
      display="relative"
      zIndex={10}
      paddingX={8}
      paddingY={1}
      role="navigation"
      borderBottomWidth="2px"
      borderColor="yellow.600"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Show above="sm">
          <Link href="/" passHref>
            <Image
              src="/au_horizontal.png"
              alt="Inicio - Activo Urbano"
              h="100px"
              w="200px"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </Show>
        <Show below="sm">
          <Link href="/" passHref>
            <Image
              src="/au_logo.png"
              alt="Inicio - Activo Urbano"
              h="80px"
              w="80px"
            />
          </Link>
        </Show>
        <Button
          id="logout-btn"
          aria-label="Cerrar sesión"
          onClick={() => signOut()}
          colorScheme="yellow"
          _hover={{ backgroundColor: 'yellow.100', color: 'yellow.700' }}
          variant="outline"
          style={{
            alignItems: 'center',
          }}
          rounded="full"
        >
          <Icon
            as={BiLogOutCircle}
            w={5}
            h={5}
            marginRight={2}
            marginTop={0.5}
          />
          <span>Cerrar Sesión</span>
        </Button>
      </Box>
    </Box>
  );
};

export default AuNavbar;
