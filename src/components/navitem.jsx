import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";
import Button from "../components/ui/button";

export function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white stroke-black dark:fill-black dark:stroke-white"
    >
      <path
        d="M15.3333 16V14.6667C15.3333 13.9594 15.0524 13.2811 14.5523 12.781C14.0522 12.281 13.3739 12 12.6667 12H7.33333C6.62609 12 5.94781 12.281 5.44772 12.781C4.94762 13.2811 4.66667 13.9594 4.66667 14.6667V16M12.6667 6.66667C12.6667 8.13943 11.4728 9.33333 10 9.33333C8.52724 9.33333 7.33333 8.13943 7.33333 6.66667C7.33333 5.19391 8.52724 4 10 4C11.4728 4 12.6667 5.19391 12.6667 6.66667Z"
      />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white stroke-black dark:fill-black dark:stroke-white"
    >
      <path
        d="M10.6667 3.33337H6C5.64638 3.33337 5.30724 3.47385 5.05719 3.7239C4.80714 3.97395 4.66667 4.31309 4.66667 4.66671V15.3334C4.66667 15.687 4.80714 16.0261 5.05719 16.2762C5.30724 16.5262 5.64638 16.6667 6 16.6667H14C14.3536 16.6667 14.6928 16.5262 14.9428 16.2762C15.1929 16.0261 15.3333 15.687 15.3333 15.3334V8.00004M10.6667 3.33337L15.3333 8.00004M10.6667 3.33337V8.00004H15.3333"
      />
    </svg>
  );
}

export function ImportIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 640 512"
      strokeWidth="32"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white stroke-black dark:fill-black dark:stroke-white"
    >
      <path
        d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
      />
    </svg>
  );
}

export default function SidebarNavigation({ onSidebarClick }) {
  const { user } = useContext(AuthContext);

  // Definir los elementos del menú
  const items = [
    {
      icon: <UserIcon />,
      label: "Editar Usuari",
      component: "UserDetails",
      roles: ["Bibliotecari", "Administrador"],
    },
    {
      icon: <ImportIcon />,
      label: "Importar usuaris",
      component: "FileUpload",
      roles: ["Bibliotecari", "Administrador"],
    },
    {
      icon: <FileIcon />,
      label: "Els meus préstecs",
      component: "LoanHistoryTable",
      roles: ["Usuari", "Bibliotecari", "Administrador"],
    },
    {
      icon: <BookIcon />,
      label: "Veure Tots els Exemplars",
      component: "ExemplarsTable",
      roles: ["Bibliotecari", "Administrador"],
    },
  ];

  // Filtrar los elementos según los roles del usuario
  const visibleItems = items.filter(
    (item) =>
      !item.roles || // Si no hay roles definidos, es visible para todos
      item.roles.some((role) => user?.groups?.includes(role))
  );

  return (
    <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
      <div className="pb-0 px-2 w-full flex flex-col flex-wrap">
        <ul className="space-y-1 h-full">
          {visibleItems.map(({ icon, label, component }, index) => (
            <li key={index} className="p-3">
              <button
                onClick={() => {
                  onSidebarClick(component);
                }}
                className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 cursor-pointer dark:fill-white dark:hover:bg-[#3c3c3c] dark:focus:bg-[#3c3c3c]"
              >
                {icon}
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
