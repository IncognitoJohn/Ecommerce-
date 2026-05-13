import {Header} from '../../components/Header.jsx';
import {useEffect,useState} from "react";
import '../../components/header.css';
import {ProductGrid} from "./ProductGrid.jsx";

import axios from 'axios';
import './HomePage.css';


export function HomePage({cart, loadCart}) {
    const[products,setProducts]=useState([]);




    useEffect(()=>{

        const getHomeData = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data);

        };
        getHomeData();
    },[ ]);
    return (<>
    <title> HomePage</title>
    <Header cart={cart}/>
    <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
    </div>

</>
);

}