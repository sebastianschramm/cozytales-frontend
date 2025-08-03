import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Optional for dropdown icon
import usaFlag from "../assets/usa.png";
import costaRicaFlag from "../assets/costa_rica.png";

// Country data
const countries = [
  { name: "USA", flag: usaFlag, language: "en" },
  { name: "Costa Rica", flag: costaRicaFlag, language: "es" },
];

const FlagDropdown = ({ country, setCountry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = countries.find((c) => c.name === country.name) || countries[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCountry = (countryObj) => {
    setCountry(countryObj);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-16 ">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-full p-1.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:border-gray-400"
      >
        <img
          src={selected.flag}
          className="w-8 h-4 sm:h-6 rounded min-h-[30px]"
          alt={selected.name}
        />
        <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {countries.map((c) => (
            <div
              key={c.name}
              onClick={() => selectCountry(c)}
              className="flex justify-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={c.flag} alt={c.name} className="h-4 w-6 sm:h-5 sm:w-8 rounded-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagDropdown;
