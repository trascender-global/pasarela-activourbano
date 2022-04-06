import AuDetailEC from '@/components/AuDetailEC';
import AuDetailTableEC from '@/components/AuDetailTableEC';
import DefaultLayout from '@/layouts/default';
import { EstadosCuentaDetalladoResponse } from '@/types/ApiResponses';
import { NextPageAuth } from '@/types/AuthPages';
import {
  DetailHeaders,
  DetallesPageProps,
  TableDetailHeaders,
} from '@/types/PropTypes';
import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Show,
  useBreakpointValue,
} from '@chakra-ui/react';
import ky from '@lib/ky';
import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

const headers: DetailHeaders = {
  referencia: 'Referencia',
  fechaCorte: 'Fecha de corte',
  urbanizacion_Clente: 'Urbanización',
  periodo_Canon: 'Periodo canon',
};

const detailHeaders: TableDetailHeaders = {
  nombre_Concepto: 'CONCEPTO',
  fechaDcto: 'FECHA DE DESCUENTO',
  total: 'TOTAL',
};

export async function getServerSideProps(ctx: NextPageContext) {
  if (ctx.query?.ref === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  try {
    const session = await getSession(ctx);
    const detalle: EstadosCuentaDetalladoResponse = await ky
      .get(
        `estadosdecuenta/getestadocuenta/ActivoUrbano/${
          ctx.query.ref as string
        }`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .json();

    return {
      props: {
        estadoCuenta: detalle.data,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: { permanent: false, destination: '/?error=detalles' },
    };
  }
}

const Detalles: NextPageAuth<DetallesPageProps> = ({ estadoCuenta }) => {
  const router = useRouter();
  const ref = router.query?.ref;
  const justifyContent = useBreakpointValue({
    base: 'space-between',
    md: 'space-evenly',
  });

  return (
    <>
      <Head>
        <title>Detalles | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Detalles" />
      </Head>
      <Box
        paddingY={8}
        paddingX={[2, 4, 4, 8, 16]}
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
          justifyContent={justifyContent}
          alignItems="center"
          paddingX="0.25em"
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
                bgColor="whiteAlpha.100"
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
                bgColor="whiteAlpha.100"
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
        <Box display="flex" flexDir="column" alignItems="center" gap="1em">
          <Box paddingTop="2em" flexGrow={1} maxW="full">
            <AuDetailEC headers={headers} estadoCuenta={estadoCuenta} />
          </Box>
          <Box paddingTop="2em" flexGrow={1} maxW="full">
            <AuDetailTableEC
              headers={detailHeaders}
              data={estadoCuenta.listaDetalles}
              referencia={ref as string}
            />
          </Box>
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
