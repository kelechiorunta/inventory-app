'use client'
import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { getStockData } from "../utils/actions/actions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockReport = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
        
            try {
              const response = await axios.get('/api/get-stock', {withCredentials:true})//getStockData();//axios.get('/api/stock-data',{withCredentials: true});
              console.log(response.data); // Handle the fetched stock data here

              setChartData({
                labels: response.data.stocks.map(item => item.month),
                datasets: [
                  {
                    label: 'Stock In',
                    data: response.data.stocks.map(item => item.stockIn),
                    backgroundColor: '#00C49F',
                  },
                  {
                    label: 'Stock Out',
                    data: response.data.stocks.map(item => item.stockOut),
                    backgroundColor: '#8884D8',
                  },
                ],
              });

            } catch (error) {
              console.error('Error fetching stock data:', error);
            }
    
          
        //   fetchData();
        }
        fetchData()
    
  }, []);

  return (
    <div className='max-w-full container bg-green'>
      <Bar 
        className='max-w-full container bg-green w-full'
        data={chartData} 
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Stock Report',
            },
          },
        }} 
      />
    </div>
  );
};

export default StockReport;
