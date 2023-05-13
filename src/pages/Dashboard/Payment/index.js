import React from 'react';
import { PaymentComponent } from '../../../components/payment';
import { ConfirmPayment } from '../../../components/payment/paymentConfirmation';
import useTickets from '../../../hooks/api/useTickets';
export default function Payment() {
  const { data } = useTickets();

  if (!data) return <PaymentComponent />;

  return <ConfirmPayment data={data} />;
}
