import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContect";
import { useNavigate } from "react-router-dom";
import type { UserProfileData } from "../../Types/userTypes";
import ProfileField from "./ProfileField";
import { fetchUserData } from "../../Utils/userUtils/userUtils";

function CompanyProfile() {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const [userProfileData, setUserProfileData] =
    useState<UserProfileData | null>(null);

  const userId = userData?.id;

  useEffect(() => {
    if (userId) {
      fetchUserData(userId, setUserProfileData);
    }
  }, [userId]);

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  if (!userProfileData) return <p>Loading...</p>;

  // Fields excluding description
  const companyFields = [
    { label: "Company Name", value: userProfileData.companyName },
    { label: "Company Type", value: userProfileData.companyType },
    { label: "Country", value: userProfileData.country },
    { label: "City", value: userProfileData.city },
    { label: "Website", value: userProfileData.website },
  ];

  const accountFields = [
    { label: "Email", value: userProfileData.email },
    { label: "Role", value: userProfileData.role },
    {
      label: "Created At",
      value: userProfileData.createdAt
        ? new Date(userProfileData.createdAt).toLocaleString()
        : "",
    },
    {
      label: "Updated At",
      value: userProfileData.updatedAt
        ? new Date(userProfileData.updatedAt).toLocaleString()
        : "",
    },
  ];
  console.log(userProfileData.companyImage);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-indigo-600 px-6 py-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">
                  {userProfileData.companyName || "Company Profile"}
                </h1>
                <p className="mt-1 text-indigo-100">{userProfileData.email}</p>
              </div>
              <button
                onClick={() => navigate("/profile/edit")}
                className="px-4 py-2 bg-white text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-50"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="px-6 py-8 divide-y divide-gray-200 space-y-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Company Information
                </h2>
                <div className="grid grid-cols-1 gap-4 ">
                  {companyFields.map((field, index) => (
                    <ProfileField
                      key={index}
                      label={field.label}
                      value={field.value}
                    />
                  ))}
                </div>
              </div>
              <div className="flex  items-center flex-col gap-3">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Company Image
                </h2>
                <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-300">
                  {userProfileData.companyImage ? (
                    <img
                      className="w-full h-full object-cover"
                      src={
                        userProfileData.companyImage
                          ? userProfileData.companyImage
                          : "https://via.placeholder.com/200?text=Company+Image"
                      }
                      alt="Company"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>No Image Provided</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Account Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {accountFields.map((field, index) => (
                  <ProfileField
                    key={index}
                    label={field.label}
                    value={field.value}
                  />
                ))}
              </div>
            </div>

            {userProfileData.description && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-900">{userProfileData.description}</p>
              </div>
            )}

            <div className="pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Account Settings
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/change-password")}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
