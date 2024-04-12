import React, { useEffect, useState } from 'react';
import axios, { isCancel } from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import Loading from "../components/Loading";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        isCheck : false
    });

    const { setAccessToken } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

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
            localStorage.setItem("persist",formData.isCheck);
            const response = await axios.post(`${import.meta.env.VITE_URL}/api/user/login`, formData,{
                withCredentials: true
            });
            const accessToken = response.data.accessToken;
            setAccessToken(accessToken);
            navigate(from,{replace : true});
        } catch (error) {
            setError(error.response.data);
        } finally {
            setFormData({
                email: '',
                password: ''
            });
            setLoading(false);
        }
    };


    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if(loading){
        return <Loading/>
    }

    return (
        <div className="flex justify-center items-center h-[85vh]">
        <Card shadow={true} className='p-8 sm:p-4' >
        <Typography variant="h4" color="blue-gray">
            Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
        </Typography>
        <form 
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" 
            onSubmit={handleSubmit}
        >
            <div className="mb-1 flex flex-col gap-6">
            <div className="w-72">
                <Input
                    label='Email'
                    size="lg"
                    placeholder="name@mail.com"
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="w-72 relative">
                <Input
                    label='Password'
                    size="lg"
                    placeholder="********"
                    required
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    type={showPassword ? 'text' : 'password'}
                />
                 <button
                    type="button"
                    className="absolute top-3 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <VscEyeClosed  className="h-5 w-5" /> : <VscEye  className="h-5 w-5" />}
                </button>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="persist"
                    name="isCheck"
                    onChange={onChangeHandler}
                    checked={formData.isCheck}
                    className="cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="persist" className="ml-2 text-sm text-gray-700">Stay Logged In</label>
            </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button className="mt-6" type='submit'> 
             Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
            Account doesn't exist?{" "}
            <a href="/signup" className="font-medium text-gray-900">
                Sign Up
            </a>
            </Typography>
        </form>
        </Card>
        </div>
    );
};
