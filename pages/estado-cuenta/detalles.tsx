import DefaultLayout from '@/layouts/default';
import { NextPageAuth } from '@/types/AuthPages';
import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';

const Detalles: NextPageAuth = () => {
  return (
    <>
      <Head>
        <title>Detalles | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Detalles" />
      </Head>
      <Box
        paddingY={8}
        paddingX={[2, 2, 2, 4]}
        color="white"
        display="flex"
        flexGrow={1}
        overflow="auto"
        alignItems="start"
      >
        <Box display="flex" flexWrap="wrap">
          <Heading size="md" style={{ padding: '0 0 0.5em 0' }}>
            Estado de Cuenta detallado
          </Heading>
        </Box>
      </Box>
    </>
  );
};

Detalles.auth = true;
Detalles.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Detalles;
