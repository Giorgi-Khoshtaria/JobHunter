import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteVacancy,
  myVacancies,
} from "../../Utils/vacanciesUtils/VacansiesUtils";
import type { VacancyDetailedType } from "../../Types/userTypes";

function MyVacancies() {
  const { companyId } = useParams<{ companyId: string }>();
  const [vacancies, setVacancies] = useState<VacancyDetailedType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!companyId) return;

    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const data = await myVacancies(companyId);
        setVacancies(data || []);
      } catch (err) {
        console.error(err);
        setVacancies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [companyId]);

  const handleDelete = async (id: string) => {
    try {
      await deleteVacancy(id);
      setVacancies((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (id: string) => navigate(`/vacancy/update/${id}`);

  const handleView = (vacancy: VacancyDetailedType) => {
    const titleSlug = vacancy.title.replace(/\s+/g, "-");
    navigate(`/vacancy/${titleSlug}/${vacancy._id}`);
  };

  if (loading) return <p className="p-4 text-center">Loading vacancies...</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">My Vacancies</h2>

      {vacancies.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No vacancies found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden max-[700px]:hidden min-[701px]:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Created At</th>
                  <th className="p-2 text-left">Deadline</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vacancies.map((v) => (
                  <tr key={v._id} className="border-b">
                    <td className="p-2">{v.title}</td>
                    <td className="p-2">
                      {new Date(v.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {new Date(v.applicationDeadline).toLocaleDateString()}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleView(v)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleUpdate(v._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(v._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 max-[700px]:block min-[701px]:hidden">
            {vacancies.map((v) => (
              <div key={v._id} className="border rounded p-4 shadow-sm">
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(v.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(v.applicationDeadline).toLocaleDateString()}
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleView(v)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdate(v._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyVacancies;
