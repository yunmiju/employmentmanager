package net.employeemanagement.ems_backend.service;

import java.util.List;
import java.util.Optional;
import net.employeemanagement.ems_backend.dto.EmployeeDto;

public interface EmployeeService {

	EmployeeDto createEmployee(EmployeeDto employeeDto);

	EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long id);

	List<EmployeeDto> getAllEmployees();

	void deleteEmployee(Long id);
}
