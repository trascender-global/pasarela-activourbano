import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
  Icon,
  Box,
} from '@chakra-ui/react';
import { TableProps } from '@/types/PropTypes';
import { EstadoCuenta } from '@/types/ApiResponses';
import { formatCurrency, formatDate } from '@/lib/format';
import { BiDollar, BiListOl } from 'react-icons/bi';
import Link from 'next/link';
import { FC } from 'react';

const AuTable: FC<TableProps> = ({ headers, body }) => {
  return (
    <Table
      variant="striped"
      colorScheme="blackAlpha"
      size="lg"
      style={{ maxWidth: '100%' }}
    >
      <Thead
        backgroundColor="gray.800"
        style={{
          position: 'sticky',
          top: '0',
          zIndex: '10',
        }}
      >
        <Tr>
          <Th color="yellow.500" style={{ paddingTop: '2em' }}>
            {headers.contrato_cliente}
          </Th>
          <Th color="yellow.500" style={{ paddingTop: '2em' }}>
            {headers.fechacorte}
          </Th>
          <Th color="yellow.500" style={{ paddingTop: '2em' }}>
            {headers.valor}
          </Th>
          <Th color="yellow.500" style={{ paddingTop: '2em' }}>
            {headers.accion}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {body.map((item: EstadoCuenta, i) => (
          <Tr key={`row-${i}`}>
            <Td>{item.contrato_cliente}</Td>
            <Td>{formatDate(item.fechacorte)}</Td>
            <Td>{formatCurrency(item.valor)}</Td>
            <Td>
              <Box display="inline-flex" justifyContent="start" gap="0.5em">
                <Button colorScheme="green" rounded="full">
                  <Icon as={BiDollar} marginRight={1} marginTop={0.5} />
                  <span>Pagar</span>
                </Button>
                <Link
                  href={`estado-cuenta/detalles?ref=${item.referencia}`}
                  passHref
                >
                  <Button colorScheme="blackAlpha" rounded="full">
                    <Icon as={BiListOl} marginRight={1} marginTop={0.5} />
                    <span>Detalles</span>
                  </Button>
                </Link>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AuTable;
