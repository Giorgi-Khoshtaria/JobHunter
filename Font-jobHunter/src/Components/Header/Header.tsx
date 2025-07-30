import React, { useState } from "react";
import logo from "../../assets/jobHunter-logo.png";

function Header() {
  const [open, setOpen] = useState(false);
  const navArray = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <div className="flex items-center justify-between bg-indigo p-4 ">
      <div>
        <a href="/">
          <img src={logo} alt="logo" className="w-32 h-12 object-cover" />
        </a>
      </div>
      <nav>
        <ul className="flex gap-6">
          {navArray.map((item) => (
            <li key={item.name} className="text-white font-semibold">
              <a
                href={item.path}
                className="hover:underline text-white font-bold"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className=" cursor-pointer ml-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          For Employers
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <a
              href="/employer/register"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Register Company
            </a>
            <a
              href="/employer/login"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Company Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
