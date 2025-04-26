import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";

export function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3333 16V14.6667C15.3333 13.9594 15.0524 13.2811 14.5523 12.781C14.0522 12.281 13.3739 12 12.6667 12H7.33333C6.62609 12 5.94781 12.281 5.44772 12.781C4.94762 13.2811 4.66667 13.9594 4.66667 14.6667V16M12.6667 6.66667C12.6667 8.13943 11.4728 9.33333 10 9.33333C8.52724 9.33333 7.33333 8.13943 7.33333 6.66667C7.33333 5.19391 8.52724 4 10 4C11.4728 4 12.6667 5.19391 12.6667 6.66667Z"
        stroke="black"
      />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6667 3.33337H6C5.64638 3.33337 5.30724 3.47385 5.05719 3.7239C4.80714 3.97395 4.66667 4.31309 4.66667 4.66671V15.3334C4.66667 15.687 4.80714 16.0261 5.05719 16.2762C5.30724 16.5262 5.64638 16.6667 6 16.6667H14C14.3536 16.6667 14.6928 16.5262 14.9428 16.2762C15.1929 16.0261 15.3333 15.687 15.3333 15.3334V8.00004M10.6667 3.33337L15.3333 8.00004M10.6667 3.33337V8.00004H15.3333"
        stroke="black"
      />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 16.5V5.5A2 2 0 0 1 5.5 3.5H10V16.5H5.5A2 2 0 0 1 3.5 16.5Z" />
      <path d="M16.5 16.5V5.5A2 2 0 0 0 14.5 3.5H10V16.5H14.5A2 2 0 0 0 16.5 16.5Z" />
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
      icon: <FileIcon />,
      label: "Importar CSV",
      component: "FileUpload",
      roles: ["Bibliotecari", "Administrador"],
    },
    {
      icon: <BookIcon />,
      label: "Els meus préstecs",
      component: "LoanHistoryTable",
      roles: ["Usuari", "Bibliotecari", "Administrador"],
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
        <ul className="space-y-1">
          {visibleItems.map(({ icon, label, component }, index) => (
            <li key={index} className="p-3">
              <button
                onClick={() => {
                  onSidebarClick(component);
                }}
                className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 cursor-pointer"
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
