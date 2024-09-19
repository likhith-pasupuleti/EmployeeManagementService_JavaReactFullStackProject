package com.fullstack.ems_backend.service;

import com.fullstack.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService
{
    public EmployeeDto addEmployee(EmployeeDto employeeDto);

    public EmployeeDto getEmployeeById(long employeeId);

    public List<EmployeeDto> getAllEmployees();

    public EmployeeDto updateEmployeeById(long employeeId,EmployeeDto employeeDto);

    public void deleteEmployeeById(long employeeId);
}
