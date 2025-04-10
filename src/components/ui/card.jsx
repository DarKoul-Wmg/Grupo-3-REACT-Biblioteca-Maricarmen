export default function Card({ children, className, ...props }) {
  return (
    <div
      className={`flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 ${className}`}
    >
      {children}
    </div>
  );
}
