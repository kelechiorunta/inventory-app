import ProductList from "@/app/components/ProductList";
import DashBoardLayout from "../layout";
import Link from "next/link";

const Inventory = () => {
  return (
    
    <div className='max-w-full container gap-y-2 flex flex-col'>
      <h1 className="text-2xl font-bold">Inventory</h1>
      <Link className='mt-4 rounded-md shadow-md px-4 py-2 w-max bg-blue-500 text-white' 
      href={'/dashboard/create-product'}>Product Form</Link>
      <ProductList/>
    </div>
   
  );
};

export default Inventory;
