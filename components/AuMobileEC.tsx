import { formatCurrency, formatDate } from '@/lib/format';
import { MobileECProps } from '@/types/PropTypes';
import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { BiDollar } from 'react-icons/bi';

const AuMobileEC: FC<MobileECProps> = ({ estadoCuenta, headers, style }) => {
  return (
    <Box
      bg="gray.800"
      borderTopColor="yellow.600"
      borderTopWidth="2px"
      borderRadius="lg"
      boxShadow="base"
      width="full"
      padding="1.5em"
      style={style}
    >
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {Object.keys(headers).map((key, i) => (
          <Box key={`header-${i}`} paddingX="1em">
            <Heading color="yellow.500" size="xs">
              {headers[key]?.toUpperCase()}
            </Heading>
            <span>
              {key === 'fechacorte'
                ? formatDate(estadoCuenta[key])
                : key === 'valor'
                ? formatCurrency(estadoCuenta[key])
                : estadoCuenta[key]}
            </span>
          </Box>
        ))}
      </Box>
      <Box paddingX="1em" paddingTop="1em">
        <Link
          href={`estado-cuenta/detalles?ref=${estadoCuenta.referencia}`}
          passHref
        >
          <Button colorScheme="green" rounded="full" isFullWidth>
            <Icon as={BiDollar} marginRight={1} marginTop={0.5} />
            <span>Ver detalle</span>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AuMobileEC;
