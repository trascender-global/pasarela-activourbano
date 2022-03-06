import { BiCheckCircle, BiIdCard } from 'react-icons/bi';
import {
  Box,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Stack,
  Button,
  InputGroup,
  InputLeftElement,
  useToast,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@schemas/login.schema';
import { signIn } from 'next-auth/react';
import { NextPageAuth } from '@/types/AuthPages';
import Link from 'next/link';

const Login: NextPageAuth = () => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { id: '' },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (form: any) => {
    try {
      signIn('credentials', {
        id: form.id,
        callbackUrl: '/',
      });
    } catch (error) {
      toast({
        title: 'Combinación inválida',
        description:
          'No se pudo iniciar sesión, verifique su documento de identidad.',
        isClosable: true,
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Zona Activa | Activo Urbano</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Box bg="gray.700" width="full" height="full">
        <Stack
          align="center"
          justify="center"
          style={{ width: '100%', height: '100%' }}
        >
          <Box
            bg="gray.800"
            borderTopColor="yellow.600"
            borderTopWidth="5px"
            borderRadius="lg"
            boxShadow="base"
            overflow="hidden"
            w={['100%', '480px', '640px', '720px']}
          >
            <Link href="https://www.activourbano.com.co/" passHref>
              <Tooltip
                label="Ir a Activo Urbano"
                bg="gray.100"
                color="black"
                aria-label="Ir a Activo Urbano"
              >
                <Image
                  src="/au_240.png"
                  alt="Activo Urbano"
                  style={{
                    margin: '0 auto',
                    padding: '1.5rem',
                    cursor: 'pointer',
                  }}
                  role="link"
                />
              </Tooltip>
            </Link>
            <Box p="6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.id}>
                  <FormLabel htmlFor="user-id" color="white">
                    Documento de identidad
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={BiIdCard} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      id="user-id"
                      type="text"
                      color="white"
                      placeholder="#########"
                      isInvalid={!!errors.id}
                      {...register('id')}
                    />
                  </InputGroup>
                  {errors.id ? (
                    <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
                  ) : touchedFields.id ? (
                    <FormHelperText color="green.300">
                      <Icon as={BiCheckCircle} />
                      <span> Tu documento de identidad es válido</span>
                    </FormHelperText>
                  ) : (
                    <FormHelperText color="gray.400">
                      Ingresa tu documento de identidad
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  mt={4}
                  isFullWidth
                  colorScheme="yellow"
                  bgColor="yellow.500"
                  _hover={{ backgroundColor: 'yellow.600' }}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Iniciar Sesión
                </Button>
              </form>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

Login.auth = false;

export default Login;
