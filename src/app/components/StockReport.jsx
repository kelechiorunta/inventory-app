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
  const [loading, setLoading] = useState(true); 
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
        const cachedStockReports = localStorage.getItem('stockReports');

            if (cachedStockReports) {
            // Use cached data if available
            // setChartData(JSON.parse(cachedStockReports));
            setChartData({
                labels: JSON.parse(cachedStockReports).map(item => item.month),
                datasets: [
                {
                    label: 'Stock In',
                    data: JSON.parse(cachedStockReports).map(item => item.stockIn),
                    backgroundColor: '#00C49F',
                },
                {
                    label: 'Stock Out',
                    data: JSON.parse(cachedStockReports).map(item => item.stockOut),
                    backgroundColor: '#8884D8',
                },
                ],
            });

            setLoading(false);
            } else {

        const fetchData = async () => {
            
                try {
                const response = await axios.get('/api/get-stock', {withCredentials:true})//getStockData();//axios.get('/api/stock-data',{withCredentials: true});
                console.log(response.data); // Handle the fetched stock data here
                localStorage.setItem('stockReports', JSON.stringify(response.data.stocks)); // Cache the data
                setLoading(false)
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
            }
            fetchData()
        }
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
