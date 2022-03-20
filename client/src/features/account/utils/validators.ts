export const validateUsername = (email: string) => {
  const value = email.trim();
  if (value.length === 0) return "Enter username";
  if (value.length > 20) return "Username must be maximum 20 characters";
  return "";
};

export const validatePassword = (password: string) => {
  var passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])");
  const value = password.trim();
  if (value.length === 0) return "Enter password";
  if (value.length < 8) return "Password must be minimum 8 characters";
  if (value.length > 20) return "Password must be maximum 20 characters";
  if (!passwordRegex.test(value))
    return "Pssword must containd one special character and one digit";

  return "";
};
