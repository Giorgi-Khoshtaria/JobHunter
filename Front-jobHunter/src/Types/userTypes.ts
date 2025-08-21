export type UserProfileData = {
  companyImage: string;
  companyName?: string;
  companyType?: string;
  country?: string;
  city?: string;
  website?: string;
  description?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};
export interface Vacancy {
  _id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  createdAt: string;
  applicationDeadline: string;
  employmentType?: string;
  jobCategory?: string;
}
