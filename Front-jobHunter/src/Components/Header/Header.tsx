import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/jobHunter-logo.png";
import { useAuth } from "../../Context/authContect";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const companyNameRef = useRef<HTMLDivElement>(null); // Add this ref for company name

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      const storedData = localStorage.getItem("userData");
      console.log(storedData);
      setCompanyName(storedData ? JSON.parse(storedData).companyName : null);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setProfileModalOpen(false);
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleDropDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Close dropdown if clicked outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }

      // Close profile modal if clicked outside
      if (
        profileRef.current &&
        !profileRef.current.contains(target) &&
        companyNameRef.current &&
        !companyNameRef.current.contains(target)
      ) {
        setProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDropDown);
    return () => {
      document.removeEventListener("mousedown", handleDropDown);
    };
  }, []);

  const navArray = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="relative">
      <div className="flex items-center justify-between bg-indigo p-4">
        <div>
          <a href="/">
            <img src={logo} alt="logo" className="w-32 h-12 object-cover" />
          </a>
        </div>

        <nav className="max-sm:hidden">
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
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div
              ref={companyNameRef} // Add ref here
              onClick={() => setProfileModalOpen(!profileModalOpen)}
              className="cursor-pointer"
            >
              <p className="text-white">{companyName}</p>
            </div>
          ) : (
            <div className="relative max-sm:hidden">
              <button
                onClick={() => setOpen(!open)}
                ref={buttonRef}
                className="cursor-pointer ml-6 px-4 py-2 text-white rounded hover:bg-indigo-700 transition"
              >
                For Employers
              </button>
            </div>
          )}

          <div className="hidden max-sm:flex">
            <button onClick={() => setIsMobile(true)}>
              <FontAwesomeIcon
                icon={faBars}
                size="xl"
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
        </div>
      </div>

      {profileModalOpen && (
        <div
          ref={profileRef}
          className="absolute right-5 top-16 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col gap-2"
        >
          <a href="/profile" className="hover:underline">
            Profile
          </a>
          <a href="/addVacancy" className="hover:underline">
            Add Vacancy
          </a>
          <button onClick={handleLogout} className="hover:underline text-left">
            LogOut
          </button>
        </div>
      )}

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-5 mt-2 w-48 bg-white border rounded shadow-lg"
        >
          <a
            href="/employer/login"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Company Login
          </a>
          <a
            href="/employer/register"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Register Company
          </a>
        </div>
      )}

      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          isMobile ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobile(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-indigo z-30 p-6 transform transition-transform duration-300 ${
          isMobile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-3 top-4"
          onClick={() => setIsMobile(false)}
        >
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#ffffff" }}
          />
        </button>

        <nav className="mt-10">
          <ul className="flex flex-col gap-6">
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
            <a
              href="/employer/register"
              className="block text-white font-semibold"
            >
              Register Company
            </a>
            <a
              href="/employer/login"
              className="block text-white font-semibold"
            >
              Company Login
            </a>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
