import React from "react";
import SidebarNavigation from "./navitem";

export default function Sidebar({ onSidebarClick }) {
  return (
    <div>
      <div className="flex flex-col flex-1 bg-white dark:bg-[#141414] border-r border-gray-200 dark:border-[#141414] h-full">
        <div className="relative flex flex-col bg-white dark:bg-[#141414]">
          <SidebarNavigation onSidebarClick={onSidebarClick} />
        </div>
      </div>
    </div>
  );
}
