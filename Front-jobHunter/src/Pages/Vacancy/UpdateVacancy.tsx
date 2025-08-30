import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getVacancyById,
  updateVacancy,
} from "../../Utils/vacanciesUtils/VacansiesUtils";
import type { VacancyDetailedType } from "../../Types/userTypes";
import { toast } from "react-toastify";

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Other",
] as const;
const COMMON_CATEGORIES = [
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
] as const;

type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];
type CommonCategory = (typeof COMMON_CATEGORIES)[number];

interface FormData {
  title: string;
  description: string;
  location: string;
  employmentType: EmploymentType | "";
  jobCategory: CommonCategory | "";
  salary: string;
  requirements: string;
  applicationDeadline: string;
  customCategory: string;
}

function UpdateVacancy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<VacancyDetailedType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    jobCategory: "",
    salary: "",
    requirements: "",
    applicationDeadline: "",
    customCategory: "",
  });
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    if (id) {
      getVacancyById(id).then((data) => {
        setVacancy(data);
        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          employmentType: data.employmentType as EmploymentType,
          jobCategory: COMMON_CATEGORIES.includes(
            data.jobCategory as CommonCategory
          )
            ? (data.jobCategory as CommonCategory)
            : "Other",
          salary: data.salary?.toString() || "",
          requirements: data.requirements,
          applicationDeadline: data.applicationDeadline.split("T")[0],
          customCategory: COMMON_CATEGORIES.includes(
            data.jobCategory as CommonCategory
          )
            ? ""
            : data.jobCategory,
        });
        setShowCustomCategory(
          !COMMON_CATEGORIES.includes(data.jobCategory as CommonCategory)
        );
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const category = showCustomCategory
      ? formData.customCategory
      : formData.jobCategory;

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !category
    ) {
      toast.error("Please fill in all required fields ❌");
      return;
    }

    const payload = {
      ...formData,
      jobCategory: category,
      salary: Number(formData.salary),
    };
    if (id) {
      await updateVacancy(id, payload);
      toast.success("Vacancy updated successfully ✅");
      navigate(-1);
    }
  };

  if (!vacancy) return <p className="p-4">Loading vacancy details...</p>;

  return (
    <div className="p-6 mt-14 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Update Vacancy
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Grid: Title, Location, Employment Type, Job Category, Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={20}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength={15}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
              required
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Employment Type
            </label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
              required
            >
              <option value="">Select employment type</option>
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Job Category */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Job Category
            </label>
            {!showCustomCategory ? (
              <select
                name="jobCategory"
                value={formData.jobCategory}
                onChange={(e) => {
                  if (e.target.value === "Other") setShowCustomCategory(true);
                  handleChange(e);
                }}
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
                required
              >
                <option value="">Select job category</option>
                {COMMON_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                type="text"
                name="customCategory"
                value={formData.customCategory}
                onChange={handleChange}
                placeholder="Enter custom category"
                required
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
              />
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Salary ($)
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              maxLength={50}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition"
              required
            />
          </div>
        </div>

        {/* Bottom Full Width: Description & Requirements */}
        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition resize-none"
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              maxLength={1000}
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-2 outline-none transition resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            Update Vacancy
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-5 py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateVacancy;
