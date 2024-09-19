import React, { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is Required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is Required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim()) {
      if (!emailRegex.test(email)) {
        errorsCopy.email = "Invalid Email Format";
        valid = false;
      } else {
        errorsCopy.email = "";
      }
    } else {
      errorsCopy.email = "Email is Required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      if (id) {
        updateEmployee(id, employee)
          .then(() => {
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        addEmployee(employee)
          .then(() => {
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <div className="card mt-5 w-50">
            <h2 className="text-center">
              {`${id ? "Update Employee" : "Add Employee"}`}
            </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter Employee First Name"
                    name="firstName"
                    value={firstName}
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Employee Last Name"
                    name="lastName"
                    value={lastName}
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                  <label className="form-label">Email Id</label>
                  <input
                    type="text"
                    placeholder="Enter Employee Employee Id"
                    name="email"
                    value={email}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="mt-3 btn btn-success"
                      onClick={saveOrUpdateEmployee}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
