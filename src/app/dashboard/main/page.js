'use client'
import StockReport from "@/app/components/StockReport";
import DashBoardLayout from "../layout";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MainPage = () => {
  const { data: session, status } = useSession();
  return (
    
    <div className='max-w-full container flex flex-col gap-2'>
      <h1 className="text-2xl font-bold mb-0">Dashboard</h1>
      <p>Welcome, {session?.user?.name || session?.user?.email}.</p>
      <Link className='rounded-md shadow-md px-4 py-2 w-max bg-blue-500 text-white' 
      href={'/dashboard/stock-form'}>Enter Stocks</Link>
      <StockReport/>
    </div>
    
  );
};

export default MainPage;