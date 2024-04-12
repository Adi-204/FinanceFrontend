import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input
  } from "@material-tailwind/react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import DownloadButton from './DownloadButton';
import ReadAloud from './ReadAloud';
import Clipboard from '../components/Clipboard';

const Advisor = () => {
    const [formData,setFormData] = useState({
        goal : ""
    })
    const [goals,setGoals] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [output,setOutput] = useState([]);
    const api = useAxiosPrivate();

    const onChangeHandle = (e)=>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const submitGoal = () =>{
        goals.push(formData.goal);
        setFormData({
            goal : ""
        })
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const handleSubmit = () =>{
        const submitData = async()=>{
            try {
                setLoading(true);
                const response = await api.post(`${import.meta.env.VITE_URL}/api/advisor/`,goals);
                setOutput(response.data);
            } catch (error) {
                setError(error.response.data);
            }
            finally{
                setLoading(false);
                setFormData({
                    goal:""
                })
                setGoals([]);
            }
        }
        submitData();
    }

    const deleteGoal = (id) => {
        const updatedGoals = goals.filter((goal, index) => index !== id);
        setGoals(updatedGoals);
    }

    const renderGoals = goals.map((goal,ind)=>{
        return (
            <div 
                key={ind}
                className='flex items-center justify-between m-5'
            >
                <Typography
                    color='black'
                    className='font-normal text-base'
                >
                    {goal}
                </Typography>
                <Button ripple={true} size='sm' onClick={() => deleteGoal(ind)}>Delete</Button>
            </div>
        )
    })

    if(loading){
        return <Loading />
    }

    const renderOutput = output.map((ele, ind) => (
        <div key={ind}>
        {ele.slice(-1) === ':' ? <h4><br/>{ele}<br/></h4> :  <p>{ele}</p>}
        </div>
    ));

  return (
    <div className='flex items-center justify-center h-full'>
    {
        output.length>0 ? (
        <div>
            <div className='lg:h-[75vh] lg:w-[40vw] h-[80vh] w-[85vw] overflow-auto mt-10 p-3 border-2 border-black rounded-lg'>
            <div className='flex justify-end mr-4 lg:mb-0 mb-3'>
                <ReadAloud text={output} />
                <Clipboard data={output} />
            </div>
            {renderOutput}
            </div>
            <DownloadButton data={output} />
        </div>
        ) : (
            <div className='flex-col h-[70vh]'>
            <Card className="lg:w-96 w:80 mt-10">
                    <Typography
                        variant='lead'
                        color='black'
                        className='font-medium mt-4 ml-10'
                    >
                        Add your Financial Goals
                </Typography>
                <CardBody>
                    {renderGoals}
                </CardBody>
                <form onSubmit={handleSubmit}> 
                    <div className="flex w-72 flex-col gap-6 ml-10">
                        <Input 
                            className="text-gray-900"
                            variant="static" 
                            placeholder="Write your goal" 
                            name='goal'
                            value={formData.goal}
                            onChange={onChangeHandle}
                        />
                    </div>
                    <CardFooter className="pt-0">
                    <Button 
                        onClick={submitGoal}
                        className='mt-6 ml-3'
                        size='sm'
                        ripple={true}
                    >
                        Add Goal
                    </Button>
                    <div className='flex items-center justify-center mt-5'>
                    <Button 
                        onClick={handleSubmit}
                        ripple={true}
                        size='md'
                        >
                        Get Plan
                        </Button>
                    </div>
                    </CardFooter>
                </form>
              </Card>
            </div>
            )
        }
    </div>
  )
}

export default Advisor;
