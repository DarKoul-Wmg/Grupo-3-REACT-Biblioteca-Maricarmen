export default function StateCountTag({ count, type }) {
    let colorClasses = "";

    if (type === "disponible") {
      colorClasses += "bg-green-100 text-green-700 border border-green-700";

    } else if (type === "nodisponible") {
      colorClasses += "bg-yellow-100 text-yellow-600 border border-yellow-600";

    } else if (type === "exclos") {
      colorClasses += "bg-red-100 text-red-600 border border-red-600";

    }
  
    return (
        <span className={`inline-flex items-center justify-center text-center gap-1 py-2 px-4 rounded-full text-xs font-bold ${colorClasses} mr-2 min-w-[48px]`}>
            {count}
        </span>
    );
  }