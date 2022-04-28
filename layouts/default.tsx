import AuNavbar from '@/components/AuNavbar';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';

const DefaultLayout: FC = ({ children }) => {
  const alignItems = useBreakpointValue({ base: 'stretch', md: 'center' });

  return (
    <Box
      bg="blackAlpha.900"
      w="full"
      h="full"
      display="flex"
      alignItems={alignItems}
      flexDir="column"
    >
      <AuNavbar />
      {children}
    </Box>
  );
};

export default DefaultLayout;
