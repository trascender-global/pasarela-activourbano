import AuDetailEC from '@/components/AuDetailEC';
import DefaultLayout from '@/layouts/default';
import { mockDetalladoEstadoCuenta } from '@/lib/mock';
import { EstadoCuentaDetallado } from '@/types/ApiResponses';
import { NextPageAuth } from '@/types/AuthPages';
import { DetailHeaders } from '@/types/PropTypes';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Show,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';

const headers: DetailHeaders = {
  referencia: 'Referencia',
  fechaCorte: 'Fecha de corte',
  fechaVencimiento: 'Fecha de vencimiento',
  fechaVencimiento_Recargo: 'Fecha de vencimiento con recargo',
  urbanizacion_Clente: 'Urbanización',
  periodo_Canon: 'Periodo canon',
  valor_sin_Recargo: 'Valor sin recargo',
  valor_Con_Recargo: 'Valor con recargo',
};

const Detalles: NextPageAuth = () => {
  const router = useRouter();
  const ref = router.query?.ref;

  const estadoCuenta: EstadoCuentaDetallado = mockDetalladoEstadoCuenta(
    ref as string
  );

  useEffect(() => {
    if (ref === undefined) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Detalles | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Detalles" />
      </Head>
      <Box
        paddingY={8}
        paddingX={[2, 4, 4, 8]}
        color="white"
        display="flex"
        flexGrow={1}
        overflow="auto"
        flexDir="column"
        alignItems="stretch"
        w="full"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignItems="center"
          gap="0.5em"
        >
          <Heading
            size="md"
            style={{
              marginTop: '0.5em',
              paddingBottom: '0.5em',
              borderBottom: '2px solid #b7791f',
            }}
          >
            Estado de Cuenta Detallado
          </Heading>
          <Show below="md">
            <Link href="/" passHref>
              <IconButton
                variant="solid"
                colorScheme="blackAlpha"
                borderWidth="2px"
                borderColor="yellow.500"
                aria-label="Volver al inicio"
                rounded="full"
                icon={<Icon as={BiArrowBack} />}
              />
            </Link>
          </Show>
          <Show above="md">
            <Link href="/" passHref>
              <Button
                variant="solid"
                colorScheme="blackAlpha"
                borderWidth="2px"
                borderColor="yellow.500"
                aria-label="Volver al inicio"
                rounded="full"
              >
                <Icon as={BiArrowBack} marginRight="0.25em" />
                <span>Volver</span>
              </Button>
            </Link>
          </Show>
        </Box>
        <HStack wrap="wrap" paddingTop="2em">
          <AuDetailEC headers={headers} estadoCuenta={estadoCuenta} />
          <Box></Box>
        </HStack>
      </Box>
    </>
  );
};

Detalles.auth = true;
Detalles.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Detalles;
