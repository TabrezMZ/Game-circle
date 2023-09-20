import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserRegistrationForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    difficultyLevel: "Easy"
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    difficultyLevel: Yup.string().required("Difficulty level is required")
  });

  const onSubmit = (values) => {
    // Handle form submission, e.g., sending data to a server
    if (values) {
      localStorage.removeItem("userData");
      localStorage.setItem("userData", JSON.stringify(values));
      navigate("/game");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <div className="contain">
      <header className="header">
        <div className="logo">Squid Game</div>
      </header>
      <div className="form-container">
        <h1 className="form-title">User Registration</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="form-error">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="form-error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="form-label" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              className="form-input"
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobileNumber}
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <div className="form-error">{formik.errors.mobileNumber}</div>
            ) : null}
          </div>

          <div>
            <label className="form-label" htmlFor="difficultyLevel">
              Difficulty Level
            </label>
            <select
              className="form-select"
              id="difficultyLevel"
              name="difficultyLevel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.difficultyLevel}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {formik.touched.difficultyLevel && formik.errors.difficultyLevel ? (
              <div className="form-error">{formik.errors.difficultyLevel}</div>
            ) : null}
          </div>

          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
