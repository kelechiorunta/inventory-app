
import StockReport from "@/app/components/StockReport";
import DashBoardLayout from "../layout";
import Link from "next/link";

const MainPage = () => {
  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>This is the dashboard content.</p>
      <Link href={'/dashboard/stock-form'}>Enter Stocks</Link>
      <StockReport/>
    </div>
    
  );
};

export default MainPage;