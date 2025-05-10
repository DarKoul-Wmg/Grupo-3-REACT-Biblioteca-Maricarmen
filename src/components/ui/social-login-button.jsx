export default function SocialLoginButton({ onClick, iconSrc, children, className = "" }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={
          "flex items-center justify-center w-full px-3 py-2 rounded border transition cursor-pointer " +
          "bg-white text-[#3C4043] border-gray-200 hover:bg-gray-50 hover:border-gray-200 " +
          className
        }
        style={{ minHeight: "40px", fontSize: "14px"}}
      >
        <img src={iconSrc} alt="icon" className="w-5 h-5 mr-3" />
        <span className="text-center w-full"
              style={{ fontFamily: "'Google Sans', Arial, sans-serif" }}
        >{children}</span>
      </button>
    );
}