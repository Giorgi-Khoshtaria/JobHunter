import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContect";
import { getAllVacancies } from "../../Utils/vacanciesUtils/VacansiesUtils";
import VacancyCard from "./VacancyCard";
import type { Vacancy } from "../../Types/userTypes";

const Vacancies: React.FC = () => {
  const categories = [
    "IT & Software",
    "Security",
    "Food & Hospitality",
    "PR & Marketing",
    "Healthcare",
    "Education",
    "Finance",
    "Sales",
    "Customer Service",
    "Construction",
    "Manufacturing",
    "Transportation",
    "Retail",
    "Design & Creative",
    "Engineering",
    "Human Resources",
    "Legal",
    "Other",
  ];

  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Other",
  ];

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [vacansyName, setVacansyName] = useState("");
  const { isAuthenticated } = useAuth();

  // Fetch vacancies
  useEffect(() => {
    if (isAuthenticated) {
      getAllVacancies((data) => {
        setVacancies(data);
        setFilteredVacancies(data);
      });
    }
  }, [isAuthenticated]);

  // Filter by category & employmentType
  useEffect(() => {
    setFilteredVacancies(
      vacancies.filter((vacancy) => {
        const matchCategory = category
          ? vacancy.jobCategory === category
          : true;
        const matchEmployment = employmentType
          ? vacancy.employmentType === employmentType
          : true;
        return matchCategory && matchEmployment;
      })
    );
  }, [category, employmentType, vacancies]);

  // Search by title
  const handleSearch = () => {
    const filtered = vacancies.filter((vacancy) =>
      vacancy.title.toLowerCase().includes(vacansyName.toLowerCase())
    );
    setFilteredVacancies(filtered);
  };

  // Reset all filters
  const handleReset = () => {
    setVacansyName("");
    setCategory("");
    setEmploymentType("");
    setFilteredVacancies(vacancies);
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 pl-7">
        Available Vacancies
      </h1>

      <div className="flex flex-wrap items-center gap-2 mb-6 ">
        <input
          type="text"
          placeholder="Search..."
          value={vacansyName}
          onChange={(e) => setVacansyName(e.target.value)}
          className="max-[400px]:w-[200px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select employment type</option>
          {employmentTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Vacancies List */}
      {filteredVacancies.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">
          No vacancies available right now.
        </p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table Header for larger screens */}
          <div className="max-lg:hidden grid grid-cols-4 bg-indigo-600 text-white text-left py-3 px-4 font-semibold text-base">
            <p>Vacancy Name</p>
            <p>Company</p>
            <p>Created At</p>
            <p>Application Deadline</p>
          </div>

          {/* Vacancy Cards */}
          {filteredVacancies.map((vacancy) => {
            const createdDate = new Date(
              vacancy.createdAt
            ).toLocaleDateString();
            const deadlineDate = new Date(
              vacancy.applicationDeadline
            ).toLocaleDateString();

            return (
              <VacancyCard
                key={vacancy._id}
                title={vacancy.title}
                companyName={vacancy.companyName}
                createdAt={createdDate}
                applicationDeadline={deadlineDate}
                companyLogo={vacancy.companyLogo}
                _id={vacancy._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Vacancies;
