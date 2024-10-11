import SalesOrderChart from "@/app/components/SalesOrderChart";
import DashBoardLayout from "../layout";

const Reports = () => {
  return (
    
  <div className='max-w-full container flex flex-col gap-2'>
    <h1 className="text-2xl font-bold mb-4">Reports</h1>
    <p>This is the Reports content.</p>
    {/* <Link className='mt-4 rounded-md shadow-md px-4 py-2 w-max bg-blue-500 text-white' 
    href={'/dashboard/update-salesorder'}>Update Sales Order</Link> */}
    {/* <SalesOrderList/> */}
    <SalesOrderChart/>
  </div>
    
  );
};

export default Reports;
