import SuppliersList from "@/app/components/SuppliersList";
import DashBoardLayout from "../layout";

const Suppliers = () => {
  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
      <p>This is the Suppliers content.</p>
      <SuppliersList/>
    </div>
    
  );
};

export default Suppliers;
