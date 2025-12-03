import axios from 'axios';
import { createContext, useState } from 'react';
import { useEffect } from "react"
import { toast } from 'react-toastify';


export const GlobalContext = createContext(null);

function GlobalProvider({ children }) {

    const [loading,setLoading] = useState(true)
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allCategories, setAllCategories] = useState([]);
    const [filter, setFilter] = useState({
        category: [],
        minPrice: "",
        maxPrice: ""
    })
    const [cart , setCart] = useState([])

    async function fetchProducts(page, filter) {
        try {

            let url = `http://localhost:5000/products?page=${page}&limit=8`;
            if (filter.category && filter.category.length > 0) {
                filter.category.forEach((cat) => {
                    url += `&category=${cat}`;
                });
            }
            if (filter.minPrice !== "") {
                url += `&minPrice=${filter.minPrice}`;
            }
            if (filter.maxPrice !== "") {
                url += `&maxPrice=${filter.maxPrice}`;
            }

            const res = await axios.get(url, { withCredentials: true });
            setProductList(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    useEffect(() => {
        fetchProducts(page, filter);
    }, [page, filter]);

    async function fetchCategory() {
        try {
            const res = await axios.get("http://localhost:5000/products/category", { withCredentials: true });
            const data = res.data.categories;
            
            setAllCategories(data);
            
        } catch (err) {
            toast.error(err.res.data.message);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    async function addToCart(product_id) {
        try {
            const res = await axios.post("http://localhost:5000/cart/addtocart", { productId: product_id }, { withCredentials: true });
            
            if(res.data.success){
                toast.success("Product added to cart!")
            }     
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    async function getCart() {
        try {
            const res = await axios.get("http://localhost:5000/cart", { withCredentials: true });            
            setCart(res.data.cartItems);
        } catch (err) {
            toast.error(err.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <GlobalContext.Provider value={{  productList, setPage, page, totalPages, allCategories, filter, setFilter, addToCart ,cart,setCart,loading,setLoading,getCart }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;

