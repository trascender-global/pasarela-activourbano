import DefaultLayout from '@/layouts/default';
import { NextPageAuth } from '@/types/AuthPages';
import { Box, Icon } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { BiCheckCircle } from 'react-icons/bi';

const PaymentCallback: NextPageAuth = () => {
  return (
    <>
      <Head>
        <title>Pago | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Detalles" />
      </Head>
      <Box
        bg="gray.800"
        borderTopColor="yellow.600"
        borderTopWidth="5px"
        borderRadius="lg"
        boxShadow="base"
        overflow="hidden"
        w={['100%', '480px', '720px']}
      >
        Aquí va un mensaje 👍👎 dependiendo de si se aprobó la transacción o no
      </Box>
    </>
  );
};

PaymentCallback.auth = true;
PaymentCallback.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default PaymentCallback;
