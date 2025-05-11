import Cart from "@/components/Cart";
import Dashboard from "@/components/Dashboard";
import Notifications from "@/components/Notifications";
import Reports from "@/components/Reports";

export default function Home() {
  return (
    <main>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Cart />
        <Dashboard />
        <Notifications />
        <Reports />
      </div> */}
      <div className="flex flex-wrap gap-8">
        <div className="w-full md:w-[40%]">
          <Cart />
        </div>

        <div className="w-full md:w-[55%]">
          <Dashboard />
        </div>

        <div className="w-full md:w-[45%]">
          <Notifications />
        </div>

        <div className="w-full md:w-[50%]">
          <Reports />
        </div>
      </div>
    </main>
  );
}
