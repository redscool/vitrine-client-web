import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/pages/Checkout.module.css";
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../utils/context/serviceContext";
export default function Checkout() {
  const serviceObj = useContext(ServiceContext);
  const { spaceId } = useParams();
  const [space, setSpace] = useState({});
  const [copied, setCopied] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    serviceObj.request(
      "get",
      "/api/community/space/page",
      { id: spaceId },
      ({ data }) => {
        const { pageData, space } = data;
        setSpace({
          ...pageData,
          ...space,
        });
      },
      console.log
    );
  }, []);

  const handlePay = async () => {
    if (paymentInitiated) return;
    setPaymentInitiated(true);
    serviceObj.request(
      "post",
      "/api/monet/order/createOrder",
      { spaceId, amount: space.price },
      ({ data }) => {
        var options = {
          key: data.pgKey,
          amount: String(space.price * 100),
          currency: "INR",
          name: "BaljeetKode",
          description: "Product Purchase",
          image: "http://localhost:3000/logo.svg",
          order_id: data.pgOrderId,
          callback_url: "http://localhost:5000/api/community/paymentRedirect?success=true",
          // redirect: true,
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#FDA92D",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        console.log(rzp1);
      },
      console.log
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <img className={styles.logo} src="/logo.svg" />
        <p className={styles.title}>Checkout summary</p>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.space}>
          <p className={styles.warning}>You are about to buy :</p>
          <div className={styles.spaceTile}></div>
          <p className={styles.planInfo}>Plan type: One time</p>
        </div>
        <div className={styles.payment}>
          <div className={styles.button} onClick={handlePay}>
            <p>Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
