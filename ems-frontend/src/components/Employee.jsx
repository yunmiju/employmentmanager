import { useState, useEffect } from 'react';
import {
    addEmployee,
    getEmployee,
    updateEmployee,
} from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const Employee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const { id } = useParams();

    const navigator = useNavigate();
    const pageTitle = () => {
        return (
            <h2 className='text-center'>
                {id ? 'Update Employee' : 'Add Employee'}
            </h2>
        );
    };

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            });
        }
    }, [id]);

    const validate = () => {
        let valid = true;
        const errorCopy = { ...error };

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            valid = false;
            errorCopy.firstName = 'First Name is required';
        }

        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            valid = false;
            errorCopy.lastName = 'Last Name is required';
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            valid = false;
            errorCopy.email = 'Email is required';
        }

        setError(errorCopy);
        return valid;
    };

    const addNewEmployee = (e) => {
        e.preventDefault();
        if (validate()) {
            const employee = { firstName, lastName, email };
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                });
            } else {
                addEmployee(employee).then((response) => {
                    console.log(response.data);
                });
            }
            navigator('/');
        }
    };

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br />
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Input First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${
                                        error.firstName ? 'is-invalid' : ''
                                    }`}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                ></input>
                                {error.firstName && (
                                    <div className='invalid-feedback'>
                                        {error.firstName}
                                    </div>
                                )}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Input Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${
                                        error.lastName ? 'is-invalid' : ''
                                    }`}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                ></input>
                                {error.lastName && (
                                    <div className='invalid-feedback'>
                                        {error.lastName}
                                    </div>
                                )}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input
                                    type='text'
                                    placeholder='Input Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${
                                        error.email ? 'is-invalid' : ''
                                    }`}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                ></input>
                                {error.email && (
                                    <div className='invalid-feedback'>
                                        {error.email}
                                    </div>
                                )}
                            </div>
                            <button
                                className='btn btn-success'
                                onClick={addNewEmployee}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
