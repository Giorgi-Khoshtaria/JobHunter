import React, { useState } from "react";
import { applyForVacancy } from "../../Utils/vacanciesUtils/VacansiesUtils";
import { useParams } from "react-router-dom";

function VacancyApply() {
  const { title, id } = useParams<{ id: string; title: string }>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null as File | null,
    vacancyTitle: title,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cv: "",
    coverLetter: "",
  });

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when typing
  };

  // Handle CV upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          cv: "Only PDF, DOC, or DOCX files are allowed",
        });
        setFormData({ ...formData, cv: null });
        return;
      }

      setFormData({ ...formData, cv: file });
      setErrors({ ...errors, cv: "" });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName)) {
      newErrors.firstName = "Enter a valid first name (min 2 letters)";
      isValid = false;
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName)) {
      newErrors.lastName = "Enter a valid last name (min 2 letters)";
      isValid = false;
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Phone Number
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+?\d{9,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
      isValid = false;
    }

    // CV Upload
    if (!formData.cv) {
      newErrors.cv = "Please upload your CV";
      isValid = false;
    }

    // Cover Letter
    if (formData.coverLetter.length > 1000) {
      newErrors.coverLetter = "Cover letter cannot exceed 1000 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    if (!validateForm()) return;
    const result = await applyForVacancy(id, formData);
    if (result) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        coverLetter: "",
        cv: null,
        vacancyTitle: title,
      });

      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        cv: "",
        coverLetter: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Apply for Vacancy
        </h1>
        <p className="text-gray-600 mb-6">
          Fill out the form below to submit your application.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="FirstName"
                className={`w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="LastName"
                className={`w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className={`w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+123 456 789"
              className={`w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Upload CV
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className={`w-full border rounded-xl px-4 py-2 cursor-pointer focus:ring-2 ${
                errors.cv
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
            {errors.cv && (
              <p className="text-red-500 text-xs mt-1">{errors.cv}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us why you're a good fit for this role..."
              className={`w-full border rounded-xl px-4 py-2 h-28 outline-none focus:ring-2 ${
                errors.coverLetter
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            ></textarea>
            {errors.coverLetter && (
              <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VacancyApply;
