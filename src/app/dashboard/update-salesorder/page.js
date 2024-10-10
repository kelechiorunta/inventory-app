'use client'
import SalesOrderForm from '@/app/components/SalesOrderForm'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function page() {
    const [products, setProducts] = useState(null)

    useEffect(()=>{
        const fetchProducts = async() => {
            try{
                const response = await axios.get('/api/get-products')
                setProducts(response.data.products)
                console.log(response.data)
            }
            catch(err){
                console.error("Unable to fetch products", err.message)
            }
        }
        fetchProducts()
       
    },[])
    //Create a server action that fetches the product lists of the current session user
    // const products = ''//result from the fetch
  return (
    <div>
        <SalesOrderForm ListProducts={products}/>
    </div>
  )
}
