import React from "react";
import SidebarNavigation from "./navitem";

export default function Sidebar({ onSidebarClick }) {
  return (
    <div
      className="relative h-full w-64 bg-white border-r border-gray-200"
      role="dialog"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full">
        <SidebarNavigation onSidebarClick={onSidebarClick} />
      </div>
    </div>
  );
}
