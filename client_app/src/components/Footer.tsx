import React, { ReactElement } from "react";

function Footer(): ReactElement {
  return (
    <footer className="bg-gray-300 p-4 text-center sticky bottom-0 w-full">
      <div className="text-sm text-gray-600 font-semibold py-1 pointer-events-none">
        Copyright &copy; 2024 Opiti Inc - GeoLabs |{" "}
        <a
          href="https://www.creative-tim.com"
          className="text-gray-600 hover:text-gray-900"
        >
          Creative Tim
        </a>
        .
      </div>
    </footer>
  );
}

export default Footer;
