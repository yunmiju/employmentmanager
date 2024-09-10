package net.employeemanagement.ems_backend.controller;

import static java.lang.String.format;

import java.util.List;
import lombok.AllArgsConstructor;
import net.employeemanagement.ems_backend.dto.EmployeeDto;
import net.employeemanagement.ems_backend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	private final EmployeeService employeeService;

	@PostMapping
	public ResponseEntity<EmployeeDto> create(
			@RequestBody EmployeeDto employeeDto) {
		EmployeeDto employee = employeeService.createEmployee(employeeDto);
		return new ResponseEntity<>(employee, HttpStatus.CREATED);
	}

	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployee(
			@PathVariable("id") long id) {
		return ResponseEntity.ok(employeeService.getEmployeeById(id));
	}

	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
		return ResponseEntity.ok(employeeService.getAllEmployees());
	}

	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> update(@PathVariable("id") Long id, @RequestBody EmployeeDto employeeDto) {
		EmployeeDto employee = employeeService.updateEmployee(id, employeeDto);
		return ResponseEntity.ok(employee);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<String> delete(@PathVariable("id") long id) {
		employeeService.deleteEmployee(id);
		return ResponseEntity.ok(format("Employee with id %d deleted", id));
	}
}
