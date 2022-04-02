import { formatCurrency, formatDate } from '@/lib/format';
import { AuDetailECProps } from '@/types/PropTypes';
import { Box, Divider, Heading } from '@chakra-ui/react';
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
      padding="1.5em"
      w="full"
      style={style}
    >
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
        <Box paddingX="1em" paddingY="0.25em" w="50%">
          <Heading color="yellow.500" size="sm">
            FECHA DE PAGO SIN RECARGO
          </Heading>
          <span>{formatDate(estadoCuenta.fechaVencimiento)}</span>
        </Box>
        <Box paddingX="1em" paddingY="0.25em" w="50%">
          <Heading color="yellow.500" size="sm">
            VALOR SIN RECARGO
          </Heading>
          <span>
            {formatCurrency(
              estadoCuenta.listaDetalles.reduce((a, b, i) => {
                if (b.total > 0) return a + b.total;
                return a;
              }, 0)
            )}
          </span>
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
        <Box paddingX="1em" paddingY="0.25em" w="50%">
          <Heading color="yellow.500" size="sm">
            FECHA DE PAGO CON RECARGO
          </Heading>
          <span>{formatDate(estadoCuenta.fechaVencimiento)}</span>
        </Box>
        <Box paddingX="1em" paddingY="0.25em" w="50%">
          <Heading color="yellow.500" size="sm">
            VALOR CON RECARGO
          </Heading>
          <span>
            {formatCurrency(
              estadoCuenta.listaDetalles.reduce((a, b, i) => {
                if (b.total > 0) return a + b.total;
                return a;
              }, 0)
            )}
          </span>
        </Box>
      </Box>
      <Divider style={{ margin: '1em 0' }} />
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
        {Object.keys(headers).map((key, i) => (
          <Box key={`header-${i}`} paddingX="1em" paddingY="0.25em" w="50%">
            <Heading color="yellow.500" size="xs">
              {headers[key]?.toUpperCase()}
            </Heading>
            <span>
              {key === 'fechaCorte'
                ? formatDate(estadoCuenta[key])
                : estadoCuenta[key]}
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AuDetailEC;
