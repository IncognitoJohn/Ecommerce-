import './CheckoutPage.css';
import './checkout-header.css';
import {Link} from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {OrderSummary} from "./OrderSummary.jsx";
import {PaymentSummary} from "./PaymentSummary.jsx";

export function CheckoutPage({cart = [],loadCart}) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    useEffect(() => {
        const fetchCheckoutData= async ()=>{
            let response
                =await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
                setDeliveryOptions(response.data);
            response
                = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data);
        };

      fetchCheckoutData();

    }, [cart]);
    return (
         <>
            <title>Checkout Page </title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">

                            <img className="logo" src="/images/logo.png"/>
                            <img className="mobile-logo" src="/images/mobile-logo.png"/>
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (
                        <Link to="/" className="return-to-home-link">
                            {totalQuantity} items
                        </Link>
                        )
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="/images/icons/checkout-lock-icon.png"/>
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions}
                                  loadCart={loadCart}   cart={cart}/>
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
                </div>
            </div>
        </>





    );
}