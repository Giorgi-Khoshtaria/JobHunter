import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVacancyById } from "../../Utils/userUtils/userUtils";
import type { VacancyDetailed } from "../../Types/userTypes";

function VacancyDetailed() {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<VacancyDetailed>();

  const fetchVacancy = async (): Promise<void> => {
    if (id) {
      const vacancyData = await getVacancyById(id);
      setVacancy(vacancyData);
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, [id]);

  if (!vacancy) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading vacancy details...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10 px-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Company Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Company Logo */}
          <div className="w-28 h-28 rounded-xl bg-gray-100 flex justify-center items-center shadow-md">
            {vacancy.companyLogo ? (
              <img
                src={`/uploads/${vacancy.companyLogo}`}
                alt="Company Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Logo</span>
            )}
          </div>

          {/* Title & Company */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {vacancy.title}
            </h1>
            <p className="text-lg text-gray-700 mt-2">{vacancy.companyName}</p>
            <p className="text-sm text-gray-500 mt-1">
              Posted on {new Date(vacancy.createdAt).toLocaleDateString()} •{" "}
              <span className="text-green-600 font-medium">
                {vacancy.isActive ? "Active" : "Closed"}
              </span>
            </p>
          </div>
        </div>

        {/* Job Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm">Job Category</p>
            <p className="text-gray-900 font-semibold">{vacancy.jobCategory}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm">Employment Type</p>
            <p className="text-gray-900 font-semibold">
              {vacancy.employmentType}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm">Location</p>
            <p className="text-gray-900 font-semibold">{vacancy.location}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm"> Salary</p>
            <p className="text-gray-900 font-semibold">
              ${vacancy.salary}/Monthly
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm">Application Deadline</p>
            <p className="text-gray-900 font-semibold">
              {new Date(vacancy.applicationDeadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Job Description
          </h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            {vacancy.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            {vacancy.requirements}
          </p>
        </div>

        {/* Apply Button */}
        <div className="mt-10 flex justify-center md:justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default VacancyDetailed;
