import {Header} from '../../components/Header.jsx';
import {useEffect,useState} from "react";
import '../../components/header.css';
import {ProductGrid} from "./ProductGrid.jsx";

import axios from 'axios';
import './HomePage.css';


export function HomePage({cart}) {
    const[products,setProducts]=useState([]);
    const [error, setError] = useState(null);



    useEffect(()=>{
        axios.get('/api/products')
            .then((response)=>{
         setProducts(response.data);
        })
            .catch((err)=>{
                console.error("Backend Error:",err);
                setError(err.response?.data?.message || "Failed to fetch products. Please try again later.");

            })
    },[ ]);

    if (error) return <div className="error-message">{error}</div>;
    return (<>
    <title> HomePage</title>
    <Header cart={cart}/>
    <div className="home-page">
        <ProductGrid products={products}/>
    </div>

</>
);

}