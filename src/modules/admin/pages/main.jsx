import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import TotalActiveUsersIcon from "../../../assets/icons/TotalActiveUsersIcon.svg"
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import TotalProjectIcon from "../../../assets/icons/TotalProjectsIcon.svg"
import LargeInfoCard from "../../../components/Cards/LargeInfoCard";
export default function main(){
    return (
      <>
        <div className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
        <span className="mb-4">
        <AdminDashboardHeader variant="home" />
      </span>
      <div className="flex justify-center items-center flex-1 space-x-16">
          <LargeInfoCard message="Total Active Users" count="4" icon={TotalActiveUsersIcon} />
          <LargeInfoCard message="Total Projects" count="4" icon={TotalProjectIcon} />
        </div>
        </div>
          </>
          );
}