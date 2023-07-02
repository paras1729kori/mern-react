import { UpdatedUser } from "./types";

export const ageCalculator = (date: string) => {
  const arr = date.split("-").join("/");
  const dob = new Date(arr);

  const month = Date.now() - dob.getTime();
  const ageDate = new Date(month);
  const year = ageDate.getUTCFullYear();
  const age = Math.abs(year - 1970);

  return age;
};

export const genderCalculator = (gen: string) => {
  if (gen === "male") return "Male";
  else if (gen === "female") return "Female";
  else if (gen === "transgender") return "Transgender";
  else if (gen === "rather not say") return "Rather not say";
  else if (gen === "other") return "Other";
};

export const isEqual = (deats: UpdatedUser) => {
  const checker = [];
  let i: keyof typeof deats;
  for (i in deats) {
    if (!deats[i]) {
      checker.push(true);
    } else {
      checker.push(false);
    }
  }
  if (checker.includes(false)) {
    return false;
  }
  return true;
};
