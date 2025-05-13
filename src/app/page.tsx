import Cart from "@/components/Cart";
import Dashboard from "@/components/Dashboard";
import Notifications from "@/components/Notifications";
import Reports from "@/components/Reports";

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap gap-8">
        <div className="w-full lg:w-[40%] h-full">
          <Cart />
        </div>

        <div className="w-full lg:w-[55%] h-full">
          <Dashboard />
        </div>

        <div className="w-full lg:w-[45%] h-full">
          <Notifications />
        </div>

        <div className="w-full lg:w-[50%] h-full">
          <Reports />
        </div>
      </div>
    </main>
  );
}
