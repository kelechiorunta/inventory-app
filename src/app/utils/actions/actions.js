'use server'
import { cache } from 'react'
import Stock from '../models/Stock'
import InventoryProduct from '../models/InventoryProduct'
 
export const getStockData = cache(async () => {
  const stockdata = await Stock.find()
  return stockdata 
})

export const getInventoryProducts = cache(async () => {
  const inventoryProd = await InventoryProduct.find()
  return inventoryProd
})