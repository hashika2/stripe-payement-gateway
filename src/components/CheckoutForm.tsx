
import React from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const CheckoutForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    /** this comment section for direct payment process  **/

    // if (!stripe || !elements) return;

    // const card = elements.getElement(CardElement);
    // if (!card) return;

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card,
    // });

    // if (error) {
    //   console.error("Payment error:", error.message);
    //   return;
    // }

    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ payment_method: paymentMethod.id }),
    });
    const response = await res.json();
    setIsSubmitting(false);

    // const result = stripe.redirectToCheckout({
    //   sessionId: response.paymentIntent?.id, // Assuming the server returns a session ID
    // })

    // console.log("Payment intent result:", result);
    window.location.href = response.url; 
  };

  return (
    <form onSubmit={handleSubmit} >
      {/* <CardElement /> */}
      <button type="submit" disabled={!stripe} style={{backgroundColor:'blue', color:'white'}}>{isSubmitting? 'Paying ...':'Pay'}</button>
    </form>
  );
};

export default CheckoutForm;
