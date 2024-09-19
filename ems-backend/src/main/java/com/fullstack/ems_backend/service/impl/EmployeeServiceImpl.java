package com.fullstack.ems_backend.service.impl;

import com.fullstack.ems_backend.dto.EmployeeDto;
import com.fullstack.ems_backend.entity.Employee;
import com.fullstack.ems_backend.exception.ResourceNotFoundException;
import com.fullstack.ems_backend.mapper.EmployeeMapper;
import com.fullstack.ems_backend.repository.EmployeeRepository;
import com.fullstack.ems_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService
{
    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository)
    {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto addEmployee(EmployeeDto employeeDto)
    {
        Employee employee=EmployeeMapper.mapToEmployee(employeeDto);  //mapping from dto to entity
        Employee savedEmployee=employeeRepository.save(employee);     //saving employee in db
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);        //mapping from entity to dto
    }

    @Override
    public EmployeeDto getEmployeeById(long employeeId)
    {
        Employee savedEmployee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exist with the given Id:"+employeeId));
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> savedEmployees=employeeRepository.findAll();
        return savedEmployees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployeeById(long employeeId, EmployeeDto employeeDto)
    {
        Employee employeeFromDb = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with the given Id: " + employeeId));

        employeeFromDb.setFirstName(employeeDto.getFirstName());
        employeeFromDb.setLastName(employeeDto.getLastName());
        employeeFromDb.setEmail(employeeDto.getEmail());

        Employee updatedEmployee = employeeRepository.save(employeeFromDb);

        // Return the updated employee as a DTO
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }


    public void deleteEmployeeById(long employeeId)
    {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee not found with the Id in DB:"+employeeId));
        employeeRepository.delete(employee);
    }
}
