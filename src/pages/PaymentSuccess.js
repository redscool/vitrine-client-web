import React, { useContext, useEffect } from "react";
import { ServiceContext } from "../utils/context/serviceContext";

export default function PaymentSuccess() {
  const serviceObj = useContext(ServiceContext);
//   useEffect(()=>{
//     serviceObj.request('post', '/api/monet/order/confirm', {})
//   }, [])
  return <div>PaymentSuccess</div>;
}
