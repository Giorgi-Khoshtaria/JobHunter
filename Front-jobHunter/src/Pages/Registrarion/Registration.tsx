import React, { useState } from "react";

function Registration() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    website: "",
    description: "",
    companyType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Company Registration Data:", formData);
    // TODO: submit data to backend
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo">
          Company Registration
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Type
            </label>
            <select
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              required
            >
              <option value="" disabled>
                Select company type
              </option>
              <option value="IT">IT</option>
              <option value="Bank">Bank</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Company Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-semiIndigo"
              placeholder="Brief description about your company..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
