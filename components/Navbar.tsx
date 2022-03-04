import { Box, Button, Icon } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { BiLogOutCircle } from 'react-icons/bi';

const Navbar: React.FC = ({ children }) => {
  return (
    <Box
      bg="gray.800"
      width="full"
      display="relative"
      zIndex={10}
      paddingX={8}
      paddingY={6}
    >
      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => signOut()}
          colorScheme="yellow"
          style={{
            alignItems: 'center',
          }}
        >
          <Icon as={BiLogOutCircle} w={5} h={5} marginRight={2} />
          <span>Cerrar Sesión</span>
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
