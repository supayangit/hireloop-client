import React from 'react';
import {DashboardSidebar} from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar></DashboardSidebar>
            <div className="flex-1 bg-[#09090b]">{children}</div>
        </div>
    );
};

export default DashboardLayout;