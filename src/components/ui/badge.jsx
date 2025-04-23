import { ROLES } from "../../services/constants";
export default function Badge({ children, role, className = "" }) {
  // Obtener el color correspondiente al rol o usar un color por defecto
  const roleStyles = ROLES[role]?.colour || "bg-gray-200";
  const roleText = ROLES[role]?.customText || "";

  return (
    <div>
      <span
        className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${roleStyles} ${className}`}
      >
        {children}
        {`${roleText} ${role}`}
      </span>
    </div>
  );
}
