import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
  Icon,
} from '@chakra-ui/react';
import { TableProps } from '@/types/PropTypes';
import { EstadoCuenta } from '@/types/ApiResponses';
import { formatCurrency, formatDate } from '@/lib/format';
import { BiDollar } from 'react-icons/bi';

const AuTable: React.FC<TableProps> = ({ children, headers, body }) => {
  return (
    <Table
      variant="striped"
      colorScheme="blackAlpha"
      size="lg"
      style={{ maxWidth: '100%' }}
    >
      <Thead>
        <Tr>
          <Th color="yellow.500">{headers.contrato_cliente}</Th>
          <Th color="yellow.500">{headers.fechacorte}</Th>
          <Th color="yellow.500">{headers.valor}</Th>
          <Th color="yellow.500">{headers.accion}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {body.map((item: EstadoCuenta, i) => (
          <Tr key={`row-${i}`}>
            <Td>{item.contrato_cliente}</Td>
            <Td>{formatDate(item.fechacorte)}</Td>
            <Td>{formatCurrency(item.valor)}</Td>
            <Td>
              <Button colorScheme="green" rounded="full">
                <Icon as={BiDollar} marginRight={1} marginTop={0.5} />
                <span>Pagar</span>
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AuTable;
