import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import { useState } from 'react';
import Loading from "../components/Loading";
import { Input } from "@material-tailwind/react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const UpdateUser = (props) => {

    const { personDetail, setPersonDetail } = props;
    const api = useAxiosPrivate();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleOpen = () => setOpen(!open);

    const [formData, setFormData] = useState({
        firstname: personDetail.firstname,
        lastname: personDetail.lastname,
        email: personDetail.email,
        age: personDetail.userAge,
        country: personDetail.userCountry,
        profession: personDetail.userProfession
    })

    const updateDetails = () => {
        const updateUser = async () => {
            try {
                setLoading(true);
                const response = await api.post(`${import.meta.env.VITE_URL}/api/dashboard/personal`,formData);
                setPersonDetail(response.data);
            } catch (error) {
                setError(error.response.data);
            }
            finally{
                setOpen(!open);
                setLoading(false);
            }
        }
        updateUser();
    }

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
        <div>
            <Button onClick={handleOpen} >
                Update
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Update your details</DialogHeader>
                <DialogBody>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" >
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="w-72">
                            <Input
                                label='First Name'
                                size="lg"
                                placeholder="first name"
                                type="text"
                                required
                                name="firstname"
                                value={formData.firstname}
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
                                name="lastname"
                                value={formData.lastname}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className='w-72'>
                        <Input
                            label='Age'
                            size="lg"
                            placeholder="XX years"
                            type="text"
                            required
                            name="age"
                            value={formData.age}
                            onChange={onChangeHandler}
                        />
                        </div>
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
                        <div className="w-72 mt-3">
                        <Input
                            label='Profession'
                            size="lg"
                            placeholder="......."
                            type="text"
                            name="profession"
                            value={formData.profession}
                            onChange={onChangeHandler}
                        />
                        </div>
                        <div className='w-72'>
                        <Input
                            label='Country'
                            size="lg"
                            placeholder="XXXXX"
                            type="text"
                            required
                            name="country"
                            value={formData.country}
                            onChange={onChangeHandler}
                        />
                        </div>
                    </div>  
                 {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={updateDetails}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default UpdateUser;

