import {formatMoney} from "../../utils/money.jsx";
import dayjs from "dayjs";

export const DeliveryOptions = ({deliveryOptions,carts}) => {
return (
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



);

}