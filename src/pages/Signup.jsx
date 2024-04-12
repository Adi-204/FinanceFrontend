import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

export const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const { setAccessToken } = useAuth();

    const navigate = useNavigate();
    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_URL}/api/user/register`, formData,{
                withCredentials: true
            });
            const accessToken = response.data.accessToken;
            setAccessToken(accessToken);
            navigate("/user-detail",{replace : true});
        } catch (error) {
            setError(error.response.data);
        } finally {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            })
            setLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-center h-[85vh] .sm:h-full">
        <Card shadow={true} className='p-8 sm:p-4' >
        <Typography variant="h4" color="blue-gray">
            Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Welcome to FinanceFriend
        </Typography>
        <form 
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" 
            onSubmit={handleSubmit}
        >
            <div className="mb-1 flex flex-col gap-6">
            <div className="w-72">
                <Input
                    label='First Name'
                    size="lg"
                    placeholder="first name"
                    type='text'
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="w-72">
                <Input
                    label='Last Name'
                    size="lg"
                    placeholder="last name"
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="w-72">
                <Input
                    label='Email'
                    size="lg"
                    placeholder="name@mail.com"
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="w-72 relative">
                <Input
                    label='Password'
                    size="lg"
                    placeholder="******"
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                />
                <button
                    type="button"
                    className="absolute top-3 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <VscEyeClosed  className="h-5 w-5" /> : <VscEye  className="h-5 w-5" />}
                </button>
            </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button className="mt-6" type='submit'> 
             SignUp
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
            Account already exist?{" "}
            <a href="/login" className="font-medium text-gray-900">
                Login
            </a>
            </Typography>
        </form>
        </Card>
        </div>
    );
};
