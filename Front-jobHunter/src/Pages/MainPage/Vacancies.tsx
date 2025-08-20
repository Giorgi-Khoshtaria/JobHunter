import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContect";
import { getAllVacancies } from "../../Utils/vacanciesUtils/VacansiesUtils";

interface Vacancy {
  _id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  createdAt: string;
  applicationDeadline: string;
}

const Vacancies: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getAllVacancies(setVacancies);
    }
  }, [isAuthenticated]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Available Vacancies
      </h1>

      {vacancies.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">
          No vacancies available right now.
        </p>
      ) : (
        <div className="space-y-4">
          {vacancies.map((vacancy) => {
            const createdDate = new Date(
              vacancy.createdAt
            ).toLocaleDateString();
            const deadlineDate = new Date(
              vacancy.applicationDeadline
            ).toLocaleDateString();

            return (
              <div
                key={vacancy._id}
                className="flex items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 border border-gray-200"
              >
                {vacancy.companyLogo && (
                  <div className="flex-shrink-0">
                    <img
                      src={`/uploads/${vacancy.companyLogo}`}
                      alt={vacancy.companyName}
                      className="w-16 h-16 object-cover rounded-full border"
                    />
                  </div>
                )}

                {/* Vacancy Info */}
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {vacancy.title}
                  </h2>
                  <p className="text-gray-600">{vacancy.companyName}</p>
                  <div className="flex space-x-4 text-gray-500 text-sm mt-1">
                    <p>
                      <span className="font-semibold">Posted:</span>{" "}
                      {createdDate}
                    </p>
                    <p>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {deadlineDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Vacancies;
