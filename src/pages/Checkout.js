import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/pages/Checkout.module.css";
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../utils/context/serviceContext";
import Modal from "../components/Modal";
import { getFileURL } from "../utils/Misc";
export default function Checkout() {
  const serviceObj = useContext(ServiceContext);
  const { spaceId } = useParams();
  const [space, setSpace] = useState({});
  const [copied, setCopied] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [success, setSuccess] = useState("");
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

  const handlePayment = (response) => {
    serviceObj.request(
      "post",
      "/api/monet/order/confirm",
      { razorpayPaymentId: response.razorpay_payment_id },
      ({ data }) => {
        if (data.paymentSuccess) {
          setSuccess("Payment Done");
          setTimeout(() => {
            navigate(`/space/${spaceId}/`);
          }, 1000);
        } else if (data.refundPayment) setSuccess("Payment Already done");
        else setSuccess("Something went wrong");
      },
      () => setSuccess("something went wrong")
    );
  };

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
          handler: handlePayment,
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
      },
      console.log
    );
  };
  return (
    <div className={styles.container}>
      {success ? <Modal success={success} setSuccess={setSuccess} /> : null}
      <div className={styles.titleBar}>
        <img className={styles.logo} src="/logo.svg" />
        <p className={styles.title}>Checkout summary</p>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.space}>
          <p className={styles.warning}>You are about to buy :</p>
          <div className={styles.spaceTile}>
            <div className={styles.coverPicture}>
              <img src={getFileURL(space.banner)} />
            </div>
            <div className={styles.details}>
              <div className={styles.heading}>
                <p>{space.heading}</p>
              </div>
              <div className={styles.subHeading}>
                <p>{space.subHeading}</p>
              </div>
            </div>
          </div>
          <p className={styles.planInfo}>Plan type: One time</p>
        </div>
        <div className={styles.payment}>
          <div className={styles.warning}>
            <p>Payment Details</p>
          </div>
          <div className={styles.price}>
            <p>
              ₹<span className={styles.color1}>{space.price}</span>
            </p>
          </div>
          <div className={styles.button} onClick={handlePay}>
            <p>Pay Now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
