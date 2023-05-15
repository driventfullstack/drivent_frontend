import useAsync from "../useAsync";

import * as paymentApi from "../../services/paymentApi";

export default function usePayment(){
    const {
        loading: paymentLoading,
        error: paymentError,
        act: createPayment
      } = useAsync(paymentApi.createPayment, false);
    
      return {
        paymentLoading,
        paymentError,
        createPayment
      };
}