export type User = {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
};

export type UpdatedUser = {
  name: string;
  dob: string;
  gender: string;
  country: string;
  description: string;
};
