import React from 'react'
import { useState, useEffect } from 'react'
import {
  Input,
  CardHeader,
  CardBody,
  Card,
  Radio,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  CardFooter,
  Button,
  Checkbox
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';

const UserDetail = () => {

  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const [formData, setFormData] = useState({
    profession : "",
    age: "",
    employement_status: "",
    country : "",
    monthly_inc: "",
    monthly_exp: "",
    monthly_savings: "",
    debt_amount: "",
    stocks: false,
    real_estate: false,
    crypto: false,
    mutual_funds: false
  })

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendDetails = async () => {
      try {
        setLoading(true);
        const response = await api.post(`/api/user/getDetails`, formData);
        navigate('/');
      } catch (error) {
        setError(error.response.data);
      }
      finally {
        setFormData({
          age : "",
          employement_status: "",
          country : "",
          monthly_inc: "",
          monthly_exp: "",
          monthly_savings: "",
          debt_amount: "",
          stocks: false,
          real_estate: false,
          crypto: false,
          mutual_funds: false
        })
        setLoading(false);
      }
    }
    sendDetails();
  }

  if(loading){
    return <Loading />
  }

  return (
    <div className="my-20 mx-20 flex justify-center items-center">
      <Card className='lg:w-full w-96'>
        <div
          className="lg:mb-4 mb-10 grid h-20 place-items-center p-4"
        >
          <Typography variant="h4" className='text-[#424242] font-growth-sans'>
            Welcome to Your Financial Blueprint
          </Typography>
          <Typography variant='h5' className='text-[#424242] font-growth-sans mt-2 italic'>
            Your input will assist us in tailoring financial recommendations specifically for you.
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
          <label className='text-lg text-[#424242] font-growth-sans lg:pt-0 pt-20'>What is your Age?</label>
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
            <label className='text-lg text-[#424242] font-growth-sans'>
              What country do you live in ?
            </label>
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
            <List>
              <label className='text-lg text-[#424242] font-growth-sans'>
                What is your employment status ? 
              </label>
              <ListItem className="p-0">
                <label
                  htmlFor="Employed"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="employement_status"
                      id="Employed"
                      className="hover:before:opacity-0 border-solid border 2 border-black"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Employed"
                      onChange={onChangeHandler}
                      required
                      checked={formData.employement_status === "Employed"}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-gray-700 font-mono"
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
                      name="employement_status"
                      id="Self-Employed"
                      className="hover:before:opacity-0 border-solid border 2 border-black"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Self-Employed"
                      onChange={onChangeHandler}
                      required
                      checked={formData.employement_status === "Self-Employed"}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-gray-700 font-mono"
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
                      name="employement_status"
                      id="Unemployed"
                      className="hover:before:opacity-0 border-solid border 2 border-black"
                      containerProps={{
                        className: "p-0",
                      }}
                      value="Unemployed"
                      onChange={onChangeHandler}
                      required
                      checked={formData.employement_status === "Unemployed"}
                    />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="font-medium text-gray-700 font-mono"
                  >
                    Unemployed
                  </Typography>
                </label>
              </ListItem>
            </List>
            {
              formData.employement_status !== 'Unemployed' && 
              <div>
              <label className='text-lg text-[#424242] font-growth-sans'>What is your Profession?</label>
                <div className="w-72 mt-3">
                  <Input
                    label='Profession'
                    size="lg"
                    placeholder="......."
                    type="text"
                    required
                    name="profession"
                    value={formData.profession}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            }
            <label className='text-lg text-[#424242] font-growth-sans'>
              What is your Monthly Income? (in $)
            </label>
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
            <label className='text-lg text-[#424242] font-growth-sans'>
              What is your Monthly Expenses? (in $)
            </label> 
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
            <label className='text-lg text-[#424242] font-growth-sans'>
              What is your Monthly Svaings? (in $)
            </label>
            <div className='w-72'>
              <Input
                label='Monthly Svaings'
                size="lg"
                placeholder="$XXXXXX"
                type="text"
                required
                name="monthly_savings"
                value={formData.monthly_savings}
                onChange={onChangeHandler}
              />
              </div>
              <List>
                <label className='text-lg text-[#424242] font-growth-sans'>What is your Investment Preference ? (If any)</label>
                <ListItem className="p-0">
                  <label
                    htmlFor="stocks"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="stocks"
                        className="hover:before:opacity-0 border-solid border 2 border-black"
                        name="stocks"
                        checked={formData.stocks}
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography className="font-medium text-gray-700 font-mono">
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
                        className="hover:before:opacity-0 border-solid border 2 border-black "
                        name="real_estate"
                        checked={formData.real_estate}
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography className="font-medium text-gray-700 font-mono">
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
                        className="hover:before:opacity-0 border-solid border 2 border-black" 
                        name="crypto"
                        checked={formData.crypto}
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography  className="font-medium text-gray-700 font-mono">
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
                        className="hover:before:opacity-0 border-solid border 2 border-black" 
                        name='mutual_funds'
                        checked={formData.mutual_funds}
                        value="mutual_funds"
                        onChange={onChangeHandler}
                      />
                    </ListItemPrefix>
                    <Typography className="font-medium text-gray-700 font-mono">
                      Mutual Funds
                    </Typography>
                  </label>
                </ListItem>
              </List>
            <label className='text-lg text-[#424242] font-growth-sans'>What is your debt amount? (If any)</label>
            <div className='w-72'>
              <Input
                label='Debt Amount'
                size="lg"
                placeholder="$XXXXXX"
                type="text"
                name="debt_amount"
                value={formData.debt_amount}
                onChange={onChangeHandler}
              />
            </div>
            {error && <p>{error}</p>}
          </CardBody>
          <CardFooter>
            <Button className="mt-3" type='submit'>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default UserDetail
