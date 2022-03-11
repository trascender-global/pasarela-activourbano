import DefaultLayout from '@/layouts/default';
import { WompiTransaction } from '@/types/ApiResponses';
import { NextPageAuth } from '@/types/AuthPages';
import { RedirectPageProps } from '@/types/PropTypes';
import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import ky from 'ky';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { formatCurrency, formatDate } from '@/lib/format';
import Link from 'next/link';

export async function getServerSideProps(context: NextPageContext) {
  const id = context.query?.id;

  if (id) {
    const wompiRes: any = await ky
      .get(process.env.WOMPI_API_URL + `/transactions/${id}`)
      .json();
    const transaction: WompiTransaction = wompiRes.data;
    return { props: { transaction } };
  }

  return { redirect: { permanent: false, destination: '/' }, props: {} };
}

const PaymentCallback: NextPageAuth<RedirectPageProps> = ({ transaction }) => {
  const width = useBreakpointValue({ base: 'full', md: 'auto' });
  return (
    <>
      <Head>
        <title>Pago | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Detalles" />
      </Head>
      <Box
        paddingY={8}
        paddingX={[2, 2, 2, 4]}
        color="white"
        display="flex"
        flexGrow={1}
        overflow="auto"
        flexDir="column"
        justifyContent="start"
        alignItems="center"
      >
        <Box display="flex" paddingY="2em" w="full">
          <Heading
            size="md"
            style={{
              paddingBottom: '0.5em',
              borderBottom: '2px solid #b7791f',
            }}
          >
            Pago
          </Heading>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          bg="gray.800"
          borderTopColor="yellow.600"
          borderTopWidth="5px"
          borderRadius="lg"
          boxShadow="base"
          overflow="hidden"
          w={width}
          color="white"
          padding="2em"
          alignItems="center"
        >
          {transaction.status === 'APPROVED' ? (
            <>
              <Icon as={MdCheckCircle} color="green.400" w={24} h={24} />
              <Heading textAlign="center" size="md">
                Transacción Aprobada
              </Heading>
              <Heading size="sm">No. {transaction.reference}</Heading>
              <Text paddingTop="2em">
                Su información será actualizada prontamente.
              </Text>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                w="full"
                paddingTop="2em"
              >
                <Box paddingX="1em" paddingY="0.25em" w="50%">
                  <Heading color="yellow.500" size="sm">
                    FECHA
                  </Heading>
                  <span>{formatDate(transaction.created_at)}</span>
                </Box>
                <Box paddingX="1em" paddingY="0.25em" w="50%">
                  <Heading color="yellow.500" size="sm">
                    VALOR
                  </Heading>
                  <span>
                    {formatCurrency(transaction.amount_in_cents / 100)}
                  </span>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Icon as={MdCancel} color="red.500" w={24} h={24} />
              <Heading textAlign="center" size="md">
                Transacción Rechazada
              </Heading>
              <Heading size="sm">No. {transaction.reference}</Heading>
              <Text paddingTop="2em">
                Vuelva a intentarlo y compruebe que su información sea correcta.
              </Text>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                w="full"
                paddingTop="2em"
              >
                <Box paddingX="1em" paddingY="0.25em" w="50%">
                  <Heading color="yellow.500" size="sm">
                    FECHA
                  </Heading>
                  <span>{formatDate(transaction.created_at)}</span>
                </Box>
                <Box paddingX="1em" paddingY="0.25em" w="50%">
                  <Heading color="yellow.500" size="sm">
                    VALOR
                  </Heading>
                  <span>
                    {formatCurrency(transaction.amount_in_cents / 100)}
                  </span>
                </Box>
              </Box>
              <Box paddingTop="1em" w="full">
                <Link
                  href={`/estado-cuenta/detalles?ref=${transaction.reference}`}
                  passHref
                >
                  <Button
                    colorScheme="yellow"
                    bgColor="yellow.500"
                    _hover={{ backgroundColor: 'yellow.600' }}
                    isFullWidth
                    rounded="full"
                  >
                    Volver a intentarlo
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

PaymentCallback.auth = true;
PaymentCallback.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default PaymentCallback;
