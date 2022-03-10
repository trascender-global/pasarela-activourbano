import { formatCurrency, formatDate } from '@/lib/format';
import { AuDetailTableECProps, WompiOptions } from '@/types/PropTypes';
import {
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
import { FC, useEffect, useMemo, useState } from 'react';
import { BiCheckShield } from 'react-icons/bi';

const AuDetailTableEC: FC<AuDetailTableECProps> = ({
  headers,
  data,
  referencia,
}) => {
  const [checkedDetails, setCheckedDetails] = useState(
    Array<boolean>(data.length).fill(false)
  );

  const isChecked = checkedDetails.every(Boolean);
  const isIndeterminate = checkedDetails.some(Boolean) && !isChecked;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      data.reduce((a, b, i) => {
        if (checkedDetails[i]) return a + b.total;
        return a;
      }, 0)
    );
  }, [checkedDetails, data]);

  const [wompi, setWompi] = useState<WompiOptions>({
    publicKey: process.env.WOMPI_PUBLICKEY || '',
    currency: 'COP',
    amountInCents: total * 100,
    reference: referencia,
  });
  useEffect(() => {
    setWompi({
      publicKey: process.env.WOMPI_PUBLICKEY || '',
      currency: 'COP',
      amountInCents: total * 100,
      reference: referencia,
    });
  }, [total, referencia]);

  // https://docs.wompi.co/docs/en/widget-checkout-web#paso-6-escoge-un-m%C3%A9todo-de-integraci%C3%B3n
  // https://docs.wompi.co/docs/en/widget-checkout-web#bot%C3%B3n-personalizado-opcional

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
            <form action="https://checkout.wompi.co/p/" method="GET">
              <input type="hidden" name="public-key" value={wompi.publicKey} />
              <input type="hidden" name="currency" value="MONEDA" />
              <input
                type="hidden"
                name="amount-in-cents"
                value={wompi.amountInCents}
              />
              <input type="hidden" name="reference" value={wompi.reference} />
              {wompi.signatureIntegrity ? (
                <input
                  type="hidden"
                  name="signature:integrity"
                  value={wompi.signatureIntegrity}
                />
              ) : (
                <></>
              )}
              {wompi.redirectUrl ? (
                <input
                  type="hidden"
                  name="redirect-url"
                  value={wompi.redirectUrl}
                />
              ) : (
                <></>
              )}
              {wompi.taxInCents?.vat ? (
                <input
                  type="hidden"
                  name="tax-in-cents:vat"
                  value={wompi.taxInCents.vat}
                />
              ) : (
                <></>
              )}
              {wompi.taxInCents?.consumption ? (
                <input
                  type="hidden"
                  name="tax-in-cents:consumption"
                  value={wompi.taxInCents.consumption}
                />
              ) : (
                <></>
              )}
              {wompi.customerData?.email ? (
                <input
                  type="hidden"
                  name="customer-data:email"
                  value={wompi.customerData.email}
                />
              ) : (
                <></>
              )}
              {wompi.customerData?.fullName ? (
                <input
                  type="hidden"
                  name="customer-data:full-name"
                  value={wompi.customerData.fullName}
                />
              ) : (
                <></>
              )}
              {wompi.customerData?.phoneNumber ? (
                <input
                  type="hidden"
                  name="customer-data:phone-number"
                  value={wompi.customerData.phoneNumber}
                />
              ) : (
                <></>
              )}
              {wompi.customerData?.phoneNumberPrefix ? (
                <input
                  type="hidden"
                  name="customer-data:phone-number-prefix"
                  value={wompi.customerData.phoneNumberPrefix}
                />
              ) : (
                <></>
              )}
              {wompi.customerData?.legalId ? (
                <input
                  type="hidden"
                  name="customer-data:legal-id"
                  value={wompi.customerData.legalId}
                />
              ) : (
                <></>
              )}
              {wompi.customerData?.legalIdType ? (
                <input
                  type="hidden"
                  name="customer-data:legal-id-type"
                  value={wompi.customerData.legalIdType}
                />
              ) : (
                <></>
              )}
              {wompi.shippingAddress?.addressLine1 ? (
                <input
                  type="hidden"
                  name="shipping-address:address-line-1"
                  value={wompi.shippingAddress.addressLine1}
                />
              ) : (
                <></>
              )}
              {wompi.shippingAddress?.addressLine2 ? (
                <input
                  type="hidden"
                  name="shipping-address:address-line-2"
                  value={wompi.shippingAddress.addressLine2}
                />
              ) : (
                <></>
              )}
              {wompi.shippingAddress?.country ? (
                <input
                  type="hidden"
                  name="shipping-address:country"
                  value={wompi.shippingAddress.country}
                />
              ) : (
                <></>
              )}
              {wompi.shippingAddress?.phoneNumber ? (
                <input
                  type="hidden"
                  name="shipping-address:phone-number"
                  value={wompi.shippingAddress.phoneNumber}
                />
              ) : (
                <></>
              )}
              {wompi.shippingAddress?.city ? (
                <input
                  type="hidden"
                  name="shipping-address:city"
                  value={wompi.shippingAddress.city}
                />
              ) : (
                <></>
              )}
              {wompi.shippingAddress?.region ? (
                <input
                  type="hidden"
                  name="shipping-address:region"
                  value={wompi.shippingAddress.region}
                />
              ) : (
                <></>
              )}
              <Button
                colorScheme="green"
                rounded="full"
                isFullWidth
                type="submit"
                disabled={!isChecked && !isIndeterminate}
              >
                <Icon as={BiCheckShield} marginRight={1} marginTop={0.5} />
                <span>Pagar con Wompi</span>
              </Button>
            </form>
          </Th>
          <Th isNumeric>
            <span>{formatCurrency(total)}</span>
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default AuDetailTableEC;
