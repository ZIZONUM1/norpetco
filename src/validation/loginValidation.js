import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  role: Yup.string().required("Role is required"),
  nationalId: Yup.string().when('role', {
    is: 'employee',
    then: (schema) =>
      schema
        .required("National ID is required")
        .matches(/^\d{10}$/, "National ID must be exactly 10 digits"),
  }),
  username: Yup.string().when('role', {
    is: 'admin',
    then: (schema) =>
      schema
        .required("Username is required")
        .oneOf(['NorAdmin'], "Username must be 'NorAdmin'"),
  }),
  password: Yup.string().when('role', {
    is: 'admin',
    then: (schema) =>
      schema
        .required("Password is required")
        .oneOf(['N5759'], "Password must be 'N5759'"),
  }),
});
