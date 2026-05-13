import './App.css'
import {Routes,Route} from "react-router";
import {HomePage} from "./Pages/home/HomePage.jsx";
import './index.css';
import {CheckoutPage} from "./Pages/checkout/CheckoutPage.jsx";
import {OrdersPage} from "./Pages/orders/OrdersPage.jsx";
import {TrackingPage} from "./Pages/tracking/TrackingPage.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const[cart,setCart]=useState([]);
    useEffect(()=>{
        axios.get('/api/cart-items?expand=product')
            .then((response)=>{
                setCart(response.data);

            })

    },[ ]);

            return (

      <Routes>

      <Route index element={<HomePage cart={cart}/>}/>
      <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
      <Route path="orders" element={<OrdersPage cart={cart}/>}/>
      <Route path="tracking" element={<TrackingPage cart={cart}/>}/>

      </Routes>

  );
}
export default App;
