import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./routes/success";
import Cancel from "./routes/cancel";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || "" );

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