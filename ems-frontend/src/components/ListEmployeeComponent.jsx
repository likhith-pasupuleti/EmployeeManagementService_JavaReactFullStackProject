import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employeesData, setEmployeesData] = useState([]);

  const navigate = useNavigate();

  const addNewEmployee = () => {
    navigate("/addEmployee");
  };

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployeesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const updateEmployee = (id) => {
    navigate(`/editEmployee/${id}`);
  };

  const deleteAEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div className="container p-5">
      <button className="btn btn-primary mb-3" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
