import React, { useState } from "react";
import axios from "axios";

const PaymentForm = ({ invoiceId, amount, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handlePayment = async () => {
    try {
      const response = await axios.post("https://localhost:7085/api/Payment", {
        invoiceID: invoiceId,
        amount: amount,
        paymentDate: new Date().toISOString()
      });

      if (response.status === 200) {
        alert("Payment successful! Your reservation is now confirmed.");
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="card">
      <h3>Complete Your Payment</h3>
      <label>Payment Method:</label>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option>Credit Card</option>
        <option>PayPal</option>
      </select>
      <button onClick={handlePayment} className="btn btn-primary">Pay Now</button>
    </div>
  );
};

export default PaymentForm;
