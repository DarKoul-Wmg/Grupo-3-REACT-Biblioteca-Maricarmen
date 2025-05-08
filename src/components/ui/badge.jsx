import { ROLES, ITEMTYPES } from "../../services/constants";

export default function Badge({ children, type, value, className = "" }) {
  const dataSource = type === "role" ? ROLES : ITEMTYPES;
  const styles = dataSource[value]?.colour || "bg-gray-200";
  const label = dataSource[value]?.customText || dataSource[value]?.label || "";

  return (
    <div className=" flex justify-center">
      <span
        className={` gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${styles} ${className}`}
      >
        {`${label}`}

        {children}
      </span>
    </div>
  );
}
