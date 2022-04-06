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
import { BiDollar } from 'react-icons/bi';
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
        backgroundColor="blackAlpha.300"
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
            {headers.direccion_cliente}
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
        {body.length ? (
          body.map((item: EstadoCuenta, i) => (
            <Tr key={`row-${i}`}>
              <Td>{item.contrato_cliente}</Td>
              <Td>{item.direccion_cliente}</Td>
              <Td>{formatDate(item.fechacorte)}</Td>
              <Td>{formatCurrency(item.valor)}</Td>
              <Td>
                <Link
                  href={`estado-cuenta/detalles?ref=${item.referencia}`}
                  passHref
                >
                  <Button colorScheme="green" rounded="full">
                    <Icon as={BiDollar} marginRight={1} marginTop={0.5} />
                    <span>Ver detalle</span>
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={5} textAlign="center">
              No tienes estados de cuenta pendientes
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default AuTable;
