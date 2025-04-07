import footer from "../assets/footer.gif";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center fixed bottom-0 w-full">
      <div>
        <p className="text-sm">© 2023 Your Company. All rights reserved.</p>
        <p className="text-sm">Contact us: contact@yourcompany.com</p>
      </div>
      <div>
        <a
          href="https://www.iesesteveterradas.cat"
          alt="Pagina Web de l' esteve terradas"
        >
          <img src={footer} alt="Custom Gif" className="w-fit h-fit" />
        </a>
      </div>
    </footer>
  );
}
