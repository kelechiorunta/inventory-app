'use server'
import { cache } from 'react'
import Stock from '../models/Stock'
 
export const getStockData = cache(async () => {
  const stockdata = await Stock.find()
  return stockdata 
})