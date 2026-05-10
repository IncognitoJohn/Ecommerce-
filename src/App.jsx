import './App.css'
import {Routes,Route} from "react-router";
import {HomePage} from "./Pages/HomePage.jsx";
import './index.css';
import {CheckoutPage} from "./Pages/CheckoutPage.jsx";
import {OrdersPage} from "./Pages/OrdersPage.jsx";
import {TrackingPage} from "./Pages/TrackingPage.jsx";
function App() {
  return (
      <Routes>

      <Route index element={<HomePage/>}/>
      <Route path="checkout" element={<CheckoutPage/>}/>
          <Route path="orders" element={<OrdersPage/>}/>
          <Route path="tracking  " element={<TrackingPage/>}/>
      </Routes>

  );
}
export default App;
