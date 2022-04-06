import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Show,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { BsFillEmojiDizzyFill } from 'react-icons/bs';
import Head from 'next/head';
import { NextPageAuth } from '@/types/AuthPages';
import ky from '@lib/ky';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EstadosCuentaResponse, EstadoCuenta } from '@/types/ApiResponses';
import AuTable from '@/components/AuTable';
import { HomePageProps, TableHeaders } from '@/types/PropTypes';
import AuMobileEC from '@/components/AuMobileEC';
import { NextPage, NextPageContext } from 'next';
import DefaultLayout from '@/layouts/default';
import { BiFilter, BiSearchAlt } from 'react-icons/bi';
import { formatCurrency, formatDate } from '@/lib/format';
import { useRouter } from 'next/router';

const headers: TableHeaders = {
  contrato_cliente: 'No. Contrato',
  direccion_cliente: 'Dirección',
  fechacorte: 'Fecha de corte',
  valor: 'Valor',
  accion: 'Acción',
};

const headersMobile: TableHeaders = {
  contrato_cliente: 'No. Contrato',
  direccion_cliente: 'Dirección',
  fechacorte: 'Fecha de corte',
  valor: 'Valor',
};

const orderByOptions = [
  {
    text: 'Ordenar por',
    value: '0',
  },
  {
    text: 'No. Contrato',
    value: 'contrato_cliente',
  },
  {
    text: 'Fecha de corte',
    value: 'fechacorte',
  },
  {
    text: 'Valor',
    value: 'valor',
  },
];

export async function getServerSideProps(ctx: NextPageContext) {
  try {
    const session = await getSession(ctx);

    const res: EstadosCuentaResponse = await ky
      .get('estadosdecuenta/getestadosdecuenta/ActivoUrbano', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .json();
    const estadosCuenta = res.data;

    return {
      props: {
        estadosCuenta,
      },
    };
  } catch (error) {
    return {
      props: {
        fetchError: true,
      },
    };
  }
}

const Home: NextPageAuth<HomePageProps> = ({ estadosCuenta, fetchError }) => {
  const router = useRouter();
  const toast = useToast();
  const width = useBreakpointValue({ base: 'full', md: 'auto' });

  const [orderBy, setOrderBy] = useState('0');
  const [filter, setFilter] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filterEC = (item: EstadoCuenta): boolean => {
    return Object.values({
      contrato_cliente: item.contrato_cliente,
      fechacorte: formatDate(item.fechacorte),
      valor: formatCurrency(item.valor),
    })
      .join(' ')
      .includes(filter);
  };

  const sortEC = (a: EstadoCuenta, b: EstadoCuenta): number => {
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  };

  const refresh = () => {
    router.reload();
    setRefreshing(true);
  };

  useEffect(() => {
    setRefreshing(false);
    if (router.query?.error) {
      toast({
        title: `Ocurrió un error cargando ${router.query?.error}`,
        description: 'Inténtelo de nuevo.',
        isClosable: true,
        status: 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Estados de cuenta | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Estados de cuenta" />
      </Head>
      <Box
        paddingY={8}
        paddingX={[2, 2, 2, 4]}
        color="white"
        display="flex"
        flexGrow={1}
        overflow="auto"
        flexDir={fetchError ? 'row' : 'column'}
        justifyContent={fetchError ? 'center' : 'start'}
        alignItems={fetchError ? 'center' : 'start'}
      >
        {fetchError ? (
          <Box display="flex" flexDir="column" alignItems="center">
            <i>
              <Icon as={BsFillEmojiDizzyFill} w={24} h={24} color="red.500" />
            </i>
            <Heading>Ocurrió un error cargando los detalles.</Heading>
            <Button
              mt={24}
              colorScheme="yellow"
              bgColor="yellow.500"
              _hover={{ backgroundColor: 'yellow.600' }}
              rounded="full"
              isLoading={refreshing}
              onClick={() => {
                refresh();
              }}
            >
              Reintentar
            </Button>
          </Box>
        ) : (
          <>
            <Box
              display="flex"
              w="full"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Heading
                id="estados-cuenta"
                size="md"
                style={{
                  width,
                  marginTop: '0.5em',
                  paddingBottom: '0.5em',
                  borderBottom: '2px solid #b7791f',
                }}
              >
                Estados de Cuenta
              </Heading>
              <Box
                display="inline-flex"
                flexWrap={['wrap', 'wrap', 'nowrap']}
                paddingY="2em"
                gap="0.5em"
                w={width}
              >
                <Select
                  id="order-by-select"
                  aria-label="Ordenar por"
                  variant="filled"
                  color="white"
                  bg="whiteAlpha.100"
                  borderColor="yellow.600"
                  _hover={{ backgroundColor: 'whiteAlpha.200' }}
                  _focus={{ backgroundColor: 'whiteAlpha.300' }}
                  rounded="full"
                  icon={<Icon as={BiFilter} />}
                  defaultValue={0}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  {orderByOptions.map((opt, i) => (
                    <option
                      key={`order-by-opt-${i}`}
                      value={opt.value}
                      style={{ backgroundColor: '#222222' }}
                    >
                      {opt.text}
                    </option>
                  ))}
                </Select>
                <InputGroup>
                  <Input
                    id="filter-input"
                    aria-label="Filtrar"
                    variant="filled"
                    color="white"
                    bg="whiteAlpha.100"
                    borderColor="yellow.600"
                    _hover={{ backgroundColor: 'whiteAlpha.200' }}
                    _focus={{ backgroundColor: 'whiteAlpha.300' }}
                    _placeholder={{ color: 'white' }}
                    rounded="full"
                    placeholder="Filtrar"
                    onChange={(e) => setFilter(e.target.value)}
                  />
                  <InputRightElement>
                    <Icon as={BiSearchAlt} />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
            <Show above="lg">
              <Box
                bg="whiteAlpha.100"
                borderTopColor="yellow.600"
                borderTopWidth="5px"
                borderRadius="lg"
                boxShadow="base"
                overflow="auto"
                w={[null, '450px', '750px', '950px', '1240px']}
              >
                <AuTable
                  headers={headers}
                  body={estadosCuenta.filter(filterEC).sort(sortEC)}
                  filter={filter}
                  orderBy={orderBy}
                />
              </Box>
            </Show>
            <Show below="lg">
              {estadosCuenta
                .filter(filterEC)
                .sort(sortEC)
                .map((ec, i) => (
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
    </>
  );
};

Home.auth = true;
Home.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
