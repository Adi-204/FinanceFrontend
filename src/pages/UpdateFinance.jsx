import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Radio,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    Checkbox
} from "@material-tailwind/react";
import { useState } from 'react';
import Loading from "../components/Loading";
import useAxiosPrivate from '../hooks/useAxiosPrivate';


const UpdateFinance = (props) => {

    const { financeDetail, setFinanceDetail } = props;
    const api = useAxiosPrivate();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleOpen = () => setOpen(!open);

    const [formData, setFormData] = useState({
        emply_status : financeDetail.emply_status,
        monthly_inc : financeDetail.monthly_inc,
        monthly_exp : financeDetail.monthly_exp,
        monthly_sav : financeDetail.monthly_sav,
        debt : financeDetail.debt,
        stocks : financeDetail.investment_pref.includes('stocks'),
        real_estate : financeDetail.investment_pref.includes('real_estate'),
        mutual_funds : financeDetail.investment_pref.includes('mutual_funds'),
        crypto : financeDetail.investment_pref.includes('crypto'),
    })

    const updateDetails = () => {
        const updateUser = async () => {
            try {
                setLoading(true);
                const response = await api.post(`${import.meta.env.VITE_URL}/api/dashboard/finance`, formData);
                setFinanceDetail(response.data);
                console.log(response.data);
            } catch (error) {
                setError(error.response.data);
            }
            finally {
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

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <Button onClick={handleOpen} >
                Update
            </Button>
            <Dialog open={open} handler={handleOpen} style={{ maxHeight: '90vh', overflowY: 'auto' }} >
                <DialogHeader>Update your details</DialogHeader>
                <DialogBody >
                    <form className="w-80 max-w-screen-lg sm:w-96" >
                        <div className="mb-1 flex flex-col gap-6">
                        <List>
                        <label>Employment Status</label>
                        <ListItem className="p-0">
                            <label
                            htmlFor="Employed"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                name="emply_status"
                                id="Employed"
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                                value="Employed"
                                onChange={onChangeHandler}
                                required
                                checked={formData.emply_status === "Employed"}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                Employed
                            </Typography>
                            </label>
                        </ListItem>
                        <ListItem className="p-0">
                            <label
                            htmlFor="Self-Employed"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                name="emply_status"
                                id="Self-Employed"
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                                value="Self-Employed"
                                onChange={onChangeHandler}
                                required
                                checked={formData.emply_status === "Self-Employed"}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                Self-Employed
                            </Typography>
                            </label>
                        </ListItem>
                        <ListItem className="p-0">
                            <label
                            htmlFor="Unemployed"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                name="emply_status"
                                id="Unemployed"
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                                value="Unemployed"
                                onChange={onChangeHandler}
                                required
                                checked={formData.emply_status === "Unemployed"}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                Unemployed
                            </Typography>
                            </label>
                        </ListItem>
                        </List>
                        <div className="w-72">
                            <Input
                                label='Monthly Income'
                                size="lg"
                                placeholder="$XXXXXX"
                                type="text"
                                required
                                name="monthly_inc"
                                value={formData.monthly_inc}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="w-72">
                            <Input
                                label='Monthly Expenses'
                                size="lg"
                                placeholder="$XXXXXX"
                                type="text"
                                required
                                name="monthly_exp"
                                value={formData.monthly_exp}
                                onChange={onChangeHandler}
                            />
                            </div>
                            <div className='w-72'>
                                <Input
                                    label='Monthly Svaings'
                                    size="lg"
                                    placeholder="$XXXXXX"
                                    type="text"
                                    required
                                    name="monthly_sav"
                                    value={formData.monthly_sav}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <List>
                            <label>Investment Preference (If any)</label>
                            <ListItem className="p-0">
                            <label
                                htmlFor="stocks"
                                className="flex w-full cursor-pointer items-center"
                            >
                                <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id="stocks"
                                    className="hover:before:opacity-0"
                                    name="stocks"
                                    checked={formData.stocks}
                                    onChange={onChangeHandler}
                                />
                                </ListItemPrefix>
                                <Typography className="font-medium">
                                Stocks
                                </Typography>
                            </label>
                            </ListItem>
                            <ListItem className="p-0">
                            <label
                                htmlFor="real_estate"
                                className="flex w-full cursor-pointer items-center"
                            >
                                <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id="real_estate"
                                    className="hover:before:opacity-0"
                                    name="real_estate"
                                    checked={formData.real_estate}
                                    onChange={onChangeHandler}
                                />
                                </ListItemPrefix>
                                <Typography className="font-medium">
                                Real Estate
                                </Typography>
                            </label>
                            </ListItem>
                            <ListItem className="p-0">
                            <label
                                htmlFor="crypto"
                                className="flex w-full cursor-pointer items-center"
                            >
                                <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id="crypto"
                                    className="hover:before:opacity-0"
                                    name="crypto"
                                    checked={formData.crypto}
                                    onChange={onChangeHandler}
                                />
                                </ListItemPrefix>
                                <Typography  className="font-medium">
                                Cryptocurrencies
                                </Typography>
                            </label>
                            </ListItem>
                            <ListItem className="p-0">
                            <label
                                htmlFor="mutual_funds"
                                className="flex w-full cursor-pointer items-center"
                            >
                                <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id="mutual_funds"
                                    className="hover:before:opacity-0"
                                    name='mutual_funds'
                                    checked={formData.mutual_funds}
                                    value="mutual_funds"
                                    onChange={onChangeHandler}
                                />
                                </ListItemPrefix>
                                <Typography className="font-medium">
                                Mutual Funds
                                </Typography>
                            </label>
                            </ListItem>
                        </List>
                            <div className='w-72'>
                            <Input
                                label='Debt Amount'
                                size="lg"
                                placeholder="$XXXXXX"
                                type="text"
                                name="debt"
                                value={formData.debt}
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

export default UpdateFinance