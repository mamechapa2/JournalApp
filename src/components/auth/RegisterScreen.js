import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);
    
    const [formValues, handleInputChange] = useForm({
        name: 'Alfonso',
        email: 'alfonsoarroyoloaisa@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(formValues.email, formValues.password, formValues.name));
            //console.log('Form is valid');
        }
    }

    const isFormValid = () => {
        if(formValues.name.trim().length === 0){
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(formValues.email)){
            dispatch(setError('Email is required'));
            return false;
        }else if (formValues.password !== formValues.password2 || formValues.password.length < 6){
            dispatch(setError('Password should be at least 6 characters long or passwords not match'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister}>
                
                {
                    msgError &&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                }
                <input 
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={formValues.email}
                    onChange={handleInputChange}
                />  
                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={formValues.password}
                    onChange={handleInputChange}
                /> 
                <input 
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    className='auth__input'
                    value={formValues.password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                >
                    Register    
                </button> 

                <Link to='/auth/login' className='link'>
                    Already registered?
                </Link>
            </form>  
        </>
    )
}