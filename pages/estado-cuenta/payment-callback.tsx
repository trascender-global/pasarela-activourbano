import DefaultLayout from '@/layouts/default';
import { NextPageAuth } from '@/types/AuthPages';
import { NextPage } from 'next';

const PaymentCallback: NextPageAuth = () => {
  return <p>Payment Callback</p>;
};

PaymentCallback.auth = true;
PaymentCallback.layout = function layout(page: NextPage) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default PaymentCallback;
