// server.js or your backend API route
const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")('add-key-here'); // Ensure you have your Stripe secret key in .env
app.use(express.json());
app.use(cors())

app.post("/create-payment-intent", async (req, res) => {
  const { payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // e.g., $10.00
      currency: "usd",
      payment_method,
      confirm: true,
      return_url: "http://localhost:5173/success", // Adjust this URL to your frontend success page
    });

    console.log("Payment intent created:", paymentIntent);

    res.send({ success: true, paymentIntent });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// server.ts
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'My Product',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5173/cancel',
  });

  res.send({ url: session.url });
});


app.listen(5000, () => console.log("Server running on port 5000"));
