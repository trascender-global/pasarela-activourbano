import { Box, Heading, HStack, Show } from '@chakra-ui/react';
import Head from 'next/head';
import { NextPageAuth } from '@/types/AuthPages';
import ky from '@lib/ky';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EstadosCuentaResponse, EstadoCuenta } from '@/types/ApiResponses';
import AuNavbar from '@/components/AuNavbar';
import AuTable from '@/components/AuTable';
import { mockEstadosCuenta } from '@/lib/mock';
import { TableHeaders } from '@/types/PropTypes';
import AuMobileEC from '@/components/AuMobileEC';

const headers: TableHeaders = {
  contrato_cliente: 'No. Contrato',
  fechacorte: 'Fecha de corte',
  valor: 'Valor',
  accion: 'Acción',
};

const headersMobile: TableHeaders = {
  contrato_cliente: 'No. Contrato',
  fechacorte: 'Fecha de corte',
  valor: 'Valor',
};

const Home: NextPageAuth = () => {
  const session = useSession();
  const [estadosCuenta, setEstadosCuenta] = useState([] as EstadoCuenta[]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function getEstadosCuenta() {
      try {
        setLoading(true);
        const res: EstadosCuentaResponse = await ky
          .get('estadosdecuenta/getestadosdecuenta/ActivoUrbano', {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          })
          .json();

        const estadosCuenta = res.data;
        setEstadosCuenta(mockEstadosCuenta(5));
        setLoading(false);
      } catch (error) {
        setFetchError(true);
        setLoading(false);
      }
    }
    getEstadosCuenta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Zona Activa | Activo Urbano</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Box
        bg="gray.700"
        w="full"
        h="full"
        display="flex"
        alignItems="center"
        flexDir="column"
      >
        <AuNavbar />
        <Box
          paddingY={8}
          paddingX={[2, 2, 2, 4]}
          color="white"
          display="flex"
          flexGrow={1}
          overflow="auto"
          flexDir={loading || fetchError ? 'row' : 'column'}
          justifyContent={loading || fetchError ? 'center' : 'start'}
          alignItems={loading || fetchError ? 'center' : 'start'}
        >
          {loading ? (
            <Box>Cargando</Box>
          ) : fetchError ? (
            <Box>Hubo un error</Box>
          ) : (
            <>
              <Box display="flex" flexWrap="wrap">
                <Heading size="md" style={{ padding: '0 0 0.5em 0' }}>
                  Estados de Cuenta
                </Heading>
              </Box>
              <Show above="md">
                <Box
                  bg="gray.800"
                  borderTopColor="yellow.600"
                  borderTopWidth="5px"
                  borderRadius="lg"
                  boxShadow="base"
                  overflow="auto"
                  w={[null, '450px', '750px', '950px', '1240px']}
                  paddingTop="1em"
                >
                  <AuTable headers={headers} body={estadosCuenta} />
                </Box>
              </Show>
              <Show below="md">
                {estadosCuenta.map((ec, i) => (
                  <AuMobileEC
                    key={`ec-${i}`}
                    headers={headersMobile}
                    estadoCuenta={ec}
                    style={{ marginBottom: '0.5em' }}
                  />
                ))}
              </Show>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

Home.auth = true;

export default Home;
