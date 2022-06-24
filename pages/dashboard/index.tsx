import DashboardLayout from "@/components/dashboard/Layout";
import DashboardTable from "@/components/dashboard/Table";
import { PlusIcon } from "@heroicons/react/outline";
import React from "react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="py-16 w-10/12">
        <div className="w-full flex justify-between">
          <p className="font-bold text-2xl">Tourist Spots</p>
          <button className="flex gap-2 bg-coldBlue-200 hover:bg-coldBlue-300 px-4 py-2 text-white rounded-lg">
            <PlusIcon className="w-6 h-6" />
            Add Tourist Spot
          </button>
        </div>

        <DashboardTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
