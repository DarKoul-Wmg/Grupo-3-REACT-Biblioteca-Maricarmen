export default function TableTag({ disponible, exclosPrestec }) {
    let colorClasses = "";
    let text = "";
  
    if (exclosPrestec) {
      colorClasses = "bg-red-100 text-red-600 border border-red-600";
      text = "Exclòs de préstec";
    } else if (disponible) {
      colorClasses = "bg-green-100 text-green-700 border border-green-700";
      text = "Disponible";
    } else {
      colorClasses = "bg-yellow-100 text-yellow-600 border border-orange-500";
      text = "No disponible";
    }
  
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
        {text}
      </span>
    );
  }