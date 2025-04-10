import footer from "../assets/footer.gif";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-1 px-6 flex justify-between items-center w-full">
      <div>
        <p>Fet per: Grup 3 AWS 2024-2025</p>
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
