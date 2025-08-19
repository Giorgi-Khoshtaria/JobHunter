interface ProfileFieldProps {
  label: string;
  value?: string | null;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-gray-900">{value || "Not provided"}</p>
  </div>
);
export default ProfileField;
