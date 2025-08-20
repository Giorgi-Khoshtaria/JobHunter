interface ProfileFieldProps {
  label: string;
  value?: string | null;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>

    {label === "Website" ? (
      <a
        href={value || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline hover:text-indigo"
      >
        {value}
      </a>
    ) : (
      <p className="mt-1 text-gray-900">{value || "Not provided"}</p>
    )}
  </div>
);
export default ProfileField;
