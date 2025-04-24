import React from "react";
import SidebarNavigation from "./navitem";

export default function Sidebar({ onSidebarClick }) {
  return (
    <div>
      <div className="flex flex-col flex-1 bg-white border-r border-gray-200 h-full">
        <div className="relative flex flex-col">
          <SidebarNavigation onSidebarClick={onSidebarClick} />
        </div>
      </div>
    </div>
  );
}
