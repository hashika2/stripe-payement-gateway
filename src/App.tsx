import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./routes/success";
import Cancel from "./routes/cancel";

const stripePromise = loadStripe("pk_test_51RnCMmISiyerA7oPaqGfvhdzHwH50FeQf05fyvwz8fiRQaJuj8gJeAZJObbX8jphomiYNqvzZaAgGx39EImyew0300DMFGKMPe");

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;