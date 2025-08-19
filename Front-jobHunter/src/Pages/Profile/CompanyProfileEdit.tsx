import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContect";
import { useNavigate } from "react-router-dom";
import type { UserProfileData } from "../../Types/userTypes";
import {
  fetchUserData,
  updateUserProfile,
} from "../../Utils/userUtils/userUtils";

interface FormField {
  name: keyof UserProfileData;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "file";
  options?: string[]; // only for select
  rows?: number; // only for textarea
}

function CompanyProfileEdit() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserProfileData>({
    companyName: "",
    companyType: "",
    country: "",
    city: "",
    website: "",
    description: "",
    email: "",
    companyImage: "",
  });

  const userId = userData?.id;

  useEffect(() => {
    if (userId) {
      fetchUserData(userId, (data) => {
        if (data) {
          setFormData(data);
          if (data.companyImage) {
            setPreviewUrl(data.companyImage);
          }
        }
      });
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const data = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "companyImage" && value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    });

    // Append the file if selected
    if (selectedFile) {
      data.append("companyImage", selectedFile);
    }

    try {
      await updateUserProfile(userId, data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const fields: FormField[] = [
    { name: "companyName", label: "Company Name", type: "text" },
    {
      name: "companyType",
      label: "Company Type",
      type: "select",
      options: [
        "IT",
        "Bank",
        "Finance",
        "Education",
        "Healthcare",
        "Manufacturing",
        "Retail",
        "Other",
      ],
    },
    { name: "country", label: "Country", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "website", label: "Website", type: "text" },
    { name: "description", label: "Description", type: "textarea", rows: 4 },
    { name: "email", label: "Email", type: "email" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Company Profile</h1>

        {/* Company Image Preview and Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Image
          </label>
          {previewUrl && (
            <div className="mb-4 flex justify-center">
              <img
                src={previewUrl}
                alt="Company Preview"
                className="h-32 w-32 object-cover rounded-full border border-gray-300"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload a company logo or image (max 5MB)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={field.rows || 3}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyProfileEdit;
