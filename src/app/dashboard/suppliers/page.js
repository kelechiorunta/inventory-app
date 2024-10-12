import SuppliersList from "@/app/components/SuppliersList";
import DashBoardLayout from "../layout";
import Link from "next/link";

const Suppliers = () => {
  return (
    
    <div>
      <div className='max-w-full container flex flex-col gap-2'>
      <h1 className="text-2xl font-bold mb-4">Supplier</h1>
      <p>This is the Supplier content.</p>
      <Link className='mt-4 rounded-md shadow-md px-4 py-2 w-max bg-blue-500 text-white' 
      href={'/dashboard/create-supplier'}>Create Supplier</Link>
      <SuppliersList/>
      {/* <SalesOrderChart/> */}
    </div>
      
    </div>
    
  );
};

export default Suppliers;
