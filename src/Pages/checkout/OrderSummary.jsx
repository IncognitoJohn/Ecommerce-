import {formatMoney} from "../../utils/money.jsx";
import dayjs from "dayjs";
import {DeliveryOptions} from "./DeliveryOptions.jsx";

export const OrderSummary = ({deliveryOptions, cart,loadCart}) => {
    return (
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

                            <DeliveryOptions deliveryOptions={deliveryOptions} loadCart={loadCart} carts={carts}/>

                        </div>
                    </div>


                )
            })}
        </div>


    );

}