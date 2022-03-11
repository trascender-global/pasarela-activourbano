import DefaultLayout from '@/layouts/default';
import { NextPageAuth } from '@/types/AuthPages';
import { NextPage } from 'next';
import Head from 'next/head';

const PaymentCallback: NextPageAuth = () => {
  return (
    <>
      <Head>
        <title>Pago | Zona Activa - Activo Urbano</title>
        <meta name="description" content="Detalles" />
      </Head>
      <p>Payment Callback</p>
    </>
  );
};

PaymentCallback.auth = true;
PaymentCallback.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default PaymentCallback;
