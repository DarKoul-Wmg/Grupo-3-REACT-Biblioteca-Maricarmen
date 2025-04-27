export default function Link({ children, ...props }) {
  return (
    <a
      {...props}
      className="flex-none font-semibold text-xl text-black dark:text-white focus:outline-hidden focus:opacity-80 cursor-pointer"
    >
      {children}
    </a>
  );
}
