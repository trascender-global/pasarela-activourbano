import { formatCurrency, formatDate } from '@/lib/format';
import { AuDetailECProps } from '@/types/PropTypes';
import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';

const AuDetailEC: FC<AuDetailECProps> = ({ headers, estadoCuenta, style }) => {
  return (
    <Box
      bg="gray.800"
      borderTopColor="yellow.600"
      borderTopWidth="5px"
      borderRadius="lg"
      boxShadow="base"
      overflow="auto"
      w="full"
      style={style}
    >
      {Object.keys(headers).map((key, i) => (
        <Box key={`header-${i}`} paddingX="1em">
          <Heading color="yellow.500" size="xs">
            {headers[key]?.toUpperCase()}
          </Heading>
          <span>
            {key === 'fechaCorte'
              ? formatDate(estadoCuenta[key])
              : key === 'valor'
              ? formatCurrency(estadoCuenta[key])
              : estadoCuenta[key]}
          </span>
        </Box>
      ))}
    </Box>
  );
};

export default AuDetailEC;
