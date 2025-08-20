import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/authContect";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCompanyImageName } from "../../Utils/userUtils/userUtils";

const FRONT_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Employment type options
const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Other",
] as const;

// Common vacancy categories
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
type Category = (typeof COMMON_CATEGORIES)[number];

function AddVacancy() {
  const { isAuthenticated, userData } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    applicationDeadline: "",
    employmentType: "" as EmploymentType | "",
    jobCategory: "" as Category | "",
    customCategory: "",
  });

  const [showCustomCategory, setShowCustomCategory] = useState(false);
  // const [companyImage, setCompanyImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "jobCategory") {
      if (value === "Other") {
        setShowCustomCategory(true);
        setFormData({
          ...formData,
          jobCategory: "Other" as Category,
          customCategory: "",
        });
      } else {
        setShowCustomCategory(false);
        setFormData({
          ...formData,
          jobCategory: value as Category,
          customCategory: "",
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFieldReset = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      salary: "",
      requirements: "",
      applicationDeadline: "",
      employmentType: "",
      jobCategory: "",
      customCategory: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !formData.jobCategory
    ) {
      toast.error("Please fill in all required fields ❌");
      return;
    }

    // Title validations
    if (formData.title.length < 3) {
      toast.error("Title must be at least 3 characters ❌");
      return;
    }
    if (formData.title.length > 35) {
      toast.error("Title must be less than 100 characters ❌");
      return;
    }
    if (!/^[a-zA-Z0-9\s\-&.,!()]+$/.test(formData.title)) {
      toast.error("Title contains invalid characters ❌");
      return;
    }

    // Description validations
    if (formData.description.length < 10) {
      toast.error("Description must be at least 10 characters ❌");
      return;
    }
    if (formData.description.length > 2000) {
      toast.error("Description must be less than 2000 characters ❌");
      return;
    }

    // Location validations
    if (formData.location.length < 2) {
      toast.error("Location must be at least 2 characters ❌");
      return;
    }
    if (formData.location.length > 100) {
      toast.error("Location must be less than 100 characters ❌");
      return;
    }

    // Category validations
    if (showCustomCategory && formData.customCategory) {
      if (formData.customCategory.length < 2) {
        toast.error("Custom category must be at least 2 characters ❌");
        return;
      }
      if (formData.customCategory.length > 50) {
        toast.error("Custom category must be less than 50 characters ❌");
        return;
      }
    } else if (!formData.jobCategory) {
      toast.error("Please select a job category ❌");
      return;
    }

    // Salary validation (if provided)
    if (formData.salary) {
      if (!/^[\d\s,\-–$€£¥₽₴₸₩]+$/.test(formData.salary)) {
        toast.error("Salary contains invalid characters ❌");
        return;
      }
      if (formData.salary.length > 50) {
        toast.error("Salary must be less than 50 characters ❌");
        return;
      }
    }

    // Requirements validation (if provided)
    if (formData.requirements && formData.requirements.length > 1000) {
      toast.error("Requirements must be less than 1000 characters ❌");
      return;
    }
    if (!formData.applicationDeadline) {
      toast.error("Please select an application deadline ❌");
    }
    // Deadline validation (if provided)
    if (formData.applicationDeadline) {
      const selectedDate = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

      if (selectedDate < today) {
        toast.error("Deadline cannot be in the past ❌");
        return;
      }

      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1); // 1 year from now
      if (selectedDate > maxDate) {
        toast.error("Deadline cannot be more than 1 year in the future ❌");
        return;
      }
    }

    // Employment type validation (if provided)
    if (
      formData.employmentType &&
      !EMPLOYMENT_TYPES.includes(formData.employmentType as EmploymentType)
    ) {
      toast.error("Please select a valid employment type ❌");
      return;
    }

    const submissionData = {
      ...formData,
      jobCategory:
        showCustomCategory && formData.customCategory
          ? formData.customCategory.trim()
          : formData.jobCategory,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      requirements: formData.requirements?.trim() || "",
      salary: formData.salary?.trim() || "",
      applicationDeadline: formData.applicationDeadline || "",
    };
    console.log(submissionData);
    try {
      const imageName = await getCompanyImageName(userData?.id || "");
      await axios.post(
        `${FRONT_URL}/api/vacancies`,
        {
          ...submissionData,
          companyId: userData?.id,
          companyName: userData?.companyName,
          companyLogo: imageName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Vacancy posted successfully 🎉");

      handleFieldReset();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to post vacancy";
        toast.error(`${errorMessage} ❌`);
      } else {
        toast.error("An unexpected error occurred ❌");
      }
      console.error("Submission error:", err);
    }
  };

  if (!isAuthenticated) {
    navigate("/employer/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Post a Job Opportunity
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Fill in the details to attract the best candidates
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Job Title */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="jobCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Category *
                  </label>
                  <select
                    id="jobCategory"
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {COMMON_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Category Input (shown when "Other" is selected) */}
                {showCustomCategory && (
                  <div>
                    <label
                      htmlFor="customCategory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Specify Category *
                    </label>
                    <input
                      type="text"
                      id="customCategory"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter custom category"
                      required={showCustomCategory}
                    />
                  </div>
                )}

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Employment Type */}
                <div>
                  <label
                    htmlFor="employmentType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employment Type
                  </label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select employment type</option>
                    {EMPLOYMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monthly Salary */}
                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Monthly Salary
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. 3000 - 5000"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">/month</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter monthly salary range (e.g., 3000 - 5000)
                  </p>
                </div>

                {/* Deadline */}
                <div>
                  <label
                    htmlFor="applicationDeadline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Requirements */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Requirements & Qualifications
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="List key requirements (one per line or as bullet points)"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Post Job Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVacancy;
