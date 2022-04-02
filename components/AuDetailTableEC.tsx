import { formatCurrency } from '@/lib/format';
import { AuDetailTableECProps, WompiOptions } from '@/types/PropTypes';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Icon,
  Show,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import ky from 'ky';
import { useSession } from 'next-auth/react';
import getConfig from 'next/config';
import { FC, useEffect, useState } from 'react';
import { BiCheckShield } from 'react-icons/bi';

const { publicRuntimeConfig } = getConfig();

const AuDetailTableEC: FC<AuDetailTableECProps> = ({
  headers,
  data,
  referencia,
}) => {
  const session = useSession();

  const [checkedDetails, setCheckedDetails] = useState(
    Array<boolean>(data.length).fill(false)
  );

  const isChecked = checkedDetails.every(Boolean);
  const isIndeterminate = checkedDetails.some(Boolean) && !isChecked;

  const [total, setTotal] = useState(0);
  const [updatingTotal, setUpdatingTotal] = useState(false);

  useEffect(() => {
    setTotal(
      data.reduce((a, b, i) => {
        if (checkedDetails[i] && b.total > 0) return a + b.total;
        return a;
      }, 0)
    );
  }, [checkedDetails, data]);

  const [wompi, setWompi] = useState<WompiOptions>({
    publicKey: publicRuntimeConfig.wompiPublicKey || '',
    currency: 'COP',
    amountInCents: total * 100,
    reference: referencia,
    redirectUrl: publicRuntimeConfig.appUrl + '/pago/redirect',
    customerData: {
      legalIdType: 'CC',
      legalId: session.data?.id as string,
    },
  });

  useEffect(() => {
    const handleEffect = async () => {
      try {
        setUpdatingTotal(true);
        const res: any = await ky
          .post(publicRuntimeConfig.appUrl + '/api/wompi/integrity', {
            json: {
              referencia,
              monto: (total * 100).toString(),
              moneda: 'COP',
            },
          })
          .json();

        const signatureIntegrity = res.signatureIntegrity;

        setWompi({
          ...wompi,
          amountInCents: total * 100,
          signatureIntegrity,
        });
        setUpdatingTotal(false);
      } catch (error) {
        setWompi({
          ...wompi,
          amountInCents: total * 100,
          redirectUrl: publicRuntimeConfig.appUrl + '/pago/redirect',
        });
        setUpdatingTotal(false);
      }
    };
    handleEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // https://docs.wompi.co/docs/en/widget-checkout-web#paso-6-escoge-un-m%C3%A9todo-de-integraci%C3%B3n
  // https://docs.wompi.co/docs/en/widget-checkout-web#bot%C3%B3n-personalizado-opcional

  return (
    <>
      <Show above="md">
        <Box
          bg="gray.800"
          borderTopColor="yellow.600"
          borderTopWidth="5px"
          borderRadius="lg"
          boxShadow="base"
          overflowX="auto"
          w="full"
          sx={{
            scrollbarColor: '#b7791f #1a202c',
          }}
        >
          <Table
            variant="striped"
            colorScheme="blackAlpha"
            size="lg"
            style={{ maxWidth: '100%' }}
          >
            <Thead backgroundColor="gray.800">
              <Tr>
                <Th>
                  <Checkbox
                    colorScheme="green"
                    isIndeterminate={isIndeterminate}
                    isChecked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        setCheckedDetails(
                          Array<boolean>(data.length).fill(false)
                        );
                      } else {
                        setCheckedDetails(
                          Array<boolean>(data.length).fill(true)
                        );
                      }
                    }}
                  />
                </Th>
                <Th>{headers.nombre_Concepto}</Th>
                <Th isNumeric>{headers.total}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((d, i) => (
                <Tr key={`detail-${i}`}>
                  <Td>
                    <Checkbox
                      colorScheme="green"
                      isChecked={checkedDetails[i] || d.total < 0}
                      isDisabled={d.total < 0}
                      onChange={(e) => {
                        if (d.total > 0) checkedDetails[i] = e.target.checked;
                        else checkedDetails[i] = true;
                        setCheckedDetails([...checkedDetails]);
                      }}
                    />
                  </Td>
                  <Td>{d.nombre_Concepto}</Td>
                  <Td isNumeric>{formatCurrency(d.total)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Show>
      <Show below="md">
        <Box padding="1em" display="flex" alignItems="center" gap="1em">
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
          <Heading as="h3" size="sm" sx={{ display: 'inline-block' }}>
            SELECCIONAR TODO
          </Heading>
        </Box>
        {data.map((d, i) => (
          <Box
            key={`detail-${i}`}
            bg="gray.800"
            borderTopColor="yellow.600"
            borderTopWidth="5px"
            borderRadius="lg"
            boxShadow="base"
            overflowX="auto"
            w="full"
            display="flex"
            padding="1em"
            marginBottom="0.5em"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.5em',
              }}
            >
              <Checkbox
                colorScheme="green"
                isChecked={checkedDetails[i] || d.total < 0}
                isDisabled={d.total < 0}
                onChange={(e) => {
                  if (d.total > 0) checkedDetails[i] = e.target.checked;
                  else checkedDetails[i] = true;
                  setCheckedDetails([...checkedDetails]);
                }}
              />
            </Box>
            <Box
              paddingX="1em"
              paddingY="0.25em"
              sx={{ display: 'flex', flexDir: 'column', flexGrow: 1 }}
            >
              <Heading as="span" color="yellow.500" size="sm" textAlign="right">
                {d.nombre_Concepto}
              </Heading>
              <Text as="span" textAlign="right">
                {formatCurrency(d.total)}
              </Text>
            </Box>
          </Box>
        ))}
      </Show>
      <Box style={{ padding: '1em 0.5em' }}>
        <form action="https://checkout.wompi.co/p/" method="GET">
          <input type="hidden" name="public-key" value={wompi.publicKey} />
          <input type="hidden" name="currency" value={wompi.currency} />
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
            isLoading={updatingTotal}
            disabled={(!isChecked && !isIndeterminate) || updatingTotal}
          >
            <Icon as={BiCheckShield} marginRight={1} marginTop={0.5} />
            <span>Pagar {formatCurrency(total)}</span>
          </Button>
          <Heading
            color="gray.500"
            size="xs"
            textAlign="center"
            paddingTop="0.25em"
          >
            * Pagos realizados a través de Wompi
          </Heading>
        </form>
      </Box>
    </>
  );
};

export default AuDetailTableEC;
