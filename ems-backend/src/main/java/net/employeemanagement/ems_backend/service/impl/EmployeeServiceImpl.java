package net.employeemanagement.ems_backend.service.impl;

import java.util.List;
import lombok.AllArgsConstructor;
import net.employeemanagement.ems_backend.dto.EmployeeDto;
import net.employeemanagement.ems_backend.entity.Employee;
import net.employeemanagement.ems_backend.exception.ResourceNotFoundException;
import net.employeemanagement.ems_backend.mapper.EmployeeMapper;
import net.employeemanagement.ems_backend.repository.EmployeeRepository;
import net.employeemanagement.ems_backend.service.EmployeeService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Not Found"));
		employee.setFirstName(employeeDto.getFirstName());
		employee.setLastName(employeeDto.getLastName());
		employee.setEmail(employeeDto.getEmail());
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee employee = (employeeRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException(
						"Employee not found wight given id : " + id)));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		return employeeRepository.findAll().stream()
				.map(EmployeeMapper::mapToEmployeeDto)
				.toList();
	}

	@Override
	public void deleteEmployee(Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Not Found"));
		employeeRepository.delete(employee);
	}
}