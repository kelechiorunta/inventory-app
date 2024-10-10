import SalesOrderList from "@/app/components/SalesOrderList";
import DashBoardLayout from "../layout";
import Link from "next/link";

const SalesOrder = () => {
  return (
   
    <div className='max-w-full container flex flex-col gap-2'>
      <h1 className="text-2xl font-bold mb-4">Sales Order</h1>
      <p>This is the Sales content.</p>
      <Link className='mt-4 rounded-md shadow-md px-4 py-2 w-max bg-blue-500 text-white' 
      href={'/dashboard/update-salesorder'}>Update Sales Order</Link>
      <SalesOrderList/>
    </div>
    
  );
};

export default SalesOrder;
