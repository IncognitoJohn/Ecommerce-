import './CheckoutPage.css';
import {formatMoney} from "../utils/money.jsx";
import './checkout-header.css';
import {Link} from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

export function CheckoutPage({cart = [],}) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    useEffect(() => {
        axios.get('/api/delivery-options?=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
            axios.get('/api/payment-summary')
                .then((response) => {
                    setPaymentSummary(response.data);
                })


        })

    }, []);
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
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map((carts) => {
                            const selectedDeliveryOption = deliveryOptions
                                .find((deliveryOption) => {
                                    return deliveryOption.id === carts.deliveryOptionId;


                                });


                            return (
                                <div key={carts.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery
                                        date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd,MMMM, YYYY')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                             src={carts.product.image}/>

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {carts.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(carts.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{carts.quantity}</span>
                  </span>
                                                <span className="update-quantity-link link-primary">
                    Update
                  </span>
                                                <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {
                                                deliveryOptions.map((deliveryoptions) => {
                                                    let priceString = 'FREE Shipping';
                                                    if (deliveryoptions.priceCents > 0) {
                                                        priceString =
                                                            `${formatMoney(deliveryoptions.priceCents)} -Shipping`;
                                                    }


                                                    return (
                                                        <div key={deliveryoptions.id} className="delivery-option">
                                                            <input type="radio"
                                                                   checked={deliveryoptions.id ===
                                                                       carts.deliveryOptionId}
                                                                   className="delivery-option-input"
                                                                   name={`delivery-option-${carts.productId}`}/>
                                                            <div>
                                                                <div className="delivery-option-date">
                                                                    {dayjs(deliveryoptions.estimatedDeliveryTimeMs)
                                                                        .format('dddd,MMMM, YYYY')}
                                                                </div>
                                                                <div className="delivery-option-price">
                                                                    {priceString}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );

                                                })
                                            }

                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>
                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        {paymentSummary && (
                            <>
                                <div className="payment-summary-row">
                                    <div>Items ({paymentSummary.totalItems}):</div>
                                    <div className="payment-summary-money">

                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div
                                        className="payment-summary-money">${formatMoney(paymentSummary.shippingCostCents)}</div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div
                                        className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div
                                        className="payment-summary-money"> {formatMoney(paymentSummary.totalCostCents)}</div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </>)}

                    </div>
                </div>
            </div>

        </>


    );
}