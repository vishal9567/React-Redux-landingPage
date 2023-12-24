export const validation = (Data) => {
  const key = Object.keys(Data);
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const genderRegex = /^(male|female)$/i;
  const error = {};

  for (let i = 0; i < key.length; i++) {
    if (Data[key[i]].trim() === "") error[key[i]] = `${key[i]} required`;
    else if (!emailRegex.test(Data.email)) error.email = "Email not valid";
    else if (!genderRegex.test(Data.gender)) error.gender = "Enter male/female";
  }
  return error;
};
