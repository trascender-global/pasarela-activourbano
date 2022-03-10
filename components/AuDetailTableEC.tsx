import { formatCurrency, formatDate } from '@/lib/format';
import { AuDetailTableECProps } from '@/types/PropTypes';
import {
  Box,
  Button,
  Checkbox,
  Icon,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { BiDollar } from 'react-icons/bi';

const AuDetailTableEC: FC<AuDetailTableECProps> = ({ headers, data }) => {
  const [checkedDetails, setCheckedDetails] = useState(
    Array<boolean>(data.length).fill(false)
  );

  const isChecked = checkedDetails.every(Boolean);
  const isIndeterminate = checkedDetails.some(Boolean) && !isChecked;

  // https://docs.wompi.co/docs/en/widget-checkout-web#paso-6-escoge-un-m%C3%A9todo-de-integraci%C3%B3n
  // https://docs.wompi.co/docs/en/widget-checkout-web#bot%C3%B3n-personalizado-opcional
  const handlePayment = useCallback(() => {}, []);

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
          <Th>
            <Checkbox
              colorScheme="green"
              isIndeterminate={isIndeterminate}
              isChecked={isChecked}
              onChange={() => {
                if (isChecked) {
                  setCheckedDetails(Array<boolean>(data.length).fill(false));
                } else {
                  setCheckedDetails(Array<boolean>(data.length).fill(true));
                }
              }}
            />
          </Th>
          <Th>{headers.nombre_Concepto}</Th>
          <Th>{headers.fechaDcto}</Th>
          <Th isNumeric>{headers.total}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((d, i) => (
          <Tr key={`detail-${i}`}>
            <Td>
              <Checkbox
                colorScheme="green"
                isChecked={checkedDetails[i]}
                onChange={(e) => {
                  checkedDetails[i] = e.target.checked;
                  setCheckedDetails([...checkedDetails]);
                }}
              />
            </Td>
            <Td>{d.nombre_Concepto}</Td>
            <Td>{formatDate(d.fechaDcto)}</Td>
            <Td isNumeric>{formatCurrency(d.total)}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th colSpan={3}>
            <Button
              colorScheme="green"
              rounded="full"
              isFullWidth
              onClick={() => {
                handlePayment();
              }}
            >
              <Icon as={BiDollar} marginRight={1} marginTop={0.5} />
              <span>Pagar</span>
            </Button>
          </Th>
          <Th isNumeric>
            <span>
              {formatCurrency(
                data.reduce((a, b, i) => {
                  if (checkedDetails[i]) return a + b.total;
                  return a;
                }, 0)
              )}
            </span>
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default AuDetailTableEC;
