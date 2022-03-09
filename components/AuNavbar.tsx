import { Box, Button, Icon } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';

const AuNavbar: FC = ({ children }) => {
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
          _hover={{ backgroundColor: 'yellow.100' }}
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
