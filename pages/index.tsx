import {
  Box,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Show,
  useBreakpointValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { NextPageAuth } from '@/types/AuthPages';
import ky from '@lib/ky';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EstadosCuentaResponse, EstadoCuenta } from '@/types/ApiResponses';
import AuTable from '@/components/AuTable';
import { mockEstadosCuenta } from '@/lib/mock';
import { TableHeaders } from '@/types/PropTypes';
import AuMobileEC from '@/components/AuMobileEC';
import { NextPage } from 'next';
import DefaultLayout from '@/layouts/default';
import { BiFilter, BiSearchAlt } from 'react-icons/bi';
import { formatCurrency, formatDate } from '@/lib/format';

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

const Home: NextPageAuth = () => {
  const session = useSession();
  const [estadosCuenta, setEstadosCuenta] = useState([] as EstadoCuenta[]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const width = useBreakpointValue({ base: 'full', md: 'auto' });
  const [orderBy, setOrderBy] = useState('0');
  const [filter, setFilter] = useState('');

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
        setEstadosCuenta(mockEstadosCuenta(25));
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
            <Box
              display="flex"
              w="full"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Heading
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
                  bg="gray.900"
                  borderColor="yellow.600"
                  _hover={{ backgroundColor: 'gray.800' }}
                  _focus={{ backgroundColor: 'gray.800' }}
                  rounded="full"
                  icon={<Icon as={BiFilter} />}
                  defaultValue={0}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  {orderByOptions.map((opt, i) => (
                    <option
                      key={`order-by-opt-${i}`}
                      value={opt.value}
                      style={{ backgroundColor: '#1a202c' }}
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
                    bg="gray.900"
                    borderColor="yellow.600"
                    _hover={{ backgroundColor: 'gray.800' }}
                    _focus={{ backgroundColor: 'gray.800' }}
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
            <Show above="md">
              <Box
                bg="gray.800"
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
            <Show below="md">
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
