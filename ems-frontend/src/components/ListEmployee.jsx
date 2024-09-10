import { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        listEmployees()
            .then((response) => setEmployees(response.data))
            .catch((error) => console.log(error));
    };

    return (
        <div className='container'>
            <br />
            <h2 className='text-center'>List Of Employees</h2>
            <button
                className='btn btn-dark'
                onClick={() => {
                    navigator('/add-employee');
                }}
            >
                Add Employee
            </button>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Eamil</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((e) => {
                        return (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.firstName}</td>
                                <td>{e.lastName}</td>
                                <td>{e.email}</td>
                                <td>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => {
                                            navigator(`/edit-employee/${e.id}`);
                                        }}
                                    >
                                        update
                                    </button>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => {
                                            deleteEmployee(e.id)
                                                .then(() => {
                                                    getAllEmployees();
                                                })
                                                .catch((error) =>
                                                    console.log(error)
                                                );
                                        }}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployee;
