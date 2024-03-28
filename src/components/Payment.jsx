import React, { useState } from 'react';
import "../css/Payment.css";


function PaymentPage({ totalPrice }) {
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cvv, setCvv] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any form submission logic here


    // Show payment successful message in an alert
    alert('Payment successful! Thank you for your purchase.');
    setCardHolderName('');
    setCardNumber('');
    setCardExpiry('');
    setCvv('');
  };
   


  return (
    <>
    <div className="title">
        <h1>Mobile Store Payment</h1>
    </div>
    <div className="card">
        <div className="cardhead">
            <h2>Debit card</h2>
        </div>
        <h4>Total Amount: ₹{ totalPrice }</h4>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardHolder">Card Holder Name</label>
                        <input placeholder="Name on Card" type="text" value={cardHolderName} id="cardHolder" name="cardHolder" onChange={(e) => setCardHolderName(e.target.value)} required/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="tel" pattern="[0-9\s]{13,19}" value={cardNumber}
                               autoComplete="cc-number" maxLength="19" 
                               placeholder="xxxx-xxxx-xxxx-xxxx" id="cardNumber" name="cardNumber" onChange={(e) => setCardNumber(e.target.value)} required/>
                    </div>
                    <div className="cvv-group">
                    <div className="nearby">
                        <label htmlFor="cvv">CVV</label>
                        <input placeholder="CVV" value={cvv} type="text" id="cvv" name="cvv" onChange={(e) => setCvv(e.target.value)} required/>&nbsp;
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input value={cardExpiry} type="month" min="2024-04"  max="2030-04"  id="expiryDate" name="expiryDate" onChange={(e) => setCardExpiry(e.target.value)} required/>                     
                    </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div> 
    </>   
  );
}


export default PaymentPage;

