import React,{useState,useEffect} from 'react'
import homeImg from '../assets/robot.png';
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import moneyImg from "../assets/money.png";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import StarIcon from './StarIcon';
import testImg1 from "../assets/test1.avif" 
import testImg2 from "../assets/test2.avif"
import testImg3 from "../assets/test3.avif"
import FAQ from '../components/FAQ';

const Home = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const { persist, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleStart = () =>{
      if(accessToken || persist){
          navigate('/service');
      }
      else{
        navigate('/signup');
      }
  } 


  return (
    <div>
      <div>
        <div 
          className={`lg:h-[40vh] flex flex-col justify-center items-center transition-all p-8 duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        >
            <Typography variant="h2" 
              className='text-[#424242] font-growth-sans'>
                Unlock Your Financial Potential, 
            </Typography>
            <Typography variant="h2" className='text-[#424242] font-growth-sans'>Embrace AI for Smarter Solutions.</Typography>
            <Typography className='lg:text-lg mt-4 text-base ml-4 text-gray-700 font-mono'>
              Discover the Future of Finance
            </Typography>
            <Button className='mt-4' onClick={handleStart} >Get Started</Button>
          </div>  
        <img 
          src={homeImg} 
          onLoad={() => setIsLoaded(true)} 
          className={`lg:m-auto ${isLoaded ? 'block' : 'hidden'}`}
        />
      </div>
      <div className='lg:h-[40vh] lg:flex lg:justify-center lg:items-center lg:gap-20 mt-40' >
          <img src={moneyImg} className='lg:m-0 m-auto' />
          <div className='mt-6 lg:w-[50vw] w-[85vw] ml-4' >
            <Typography variant="h3" className='text-[#424242] font-growth-sans ml-3'>Empower Your Financial Journey</Typography>
            <Typography className='lg:text-lg mt-4 text-base ml-4 text-gray-700 font-mono'>
                Unlock the full potential of your finances with our comprehensive suite of services. From personalized financial planning to AI-driven bill analysis and risk assessment, we have everything you need to take control of your financial future. 
            </Typography>
            <div className="flex flex-col items-start mt-4">
              <NavLink
              to="/service/chatbot" 
                className="border border-gray-200 rounded-lg p-3 m-2 lg:w-[40vw] w-[75vw] flex justify-between items-center hover:bg-gray-100"
              >
                <Typography className='lg:text-lg text-base ml-4 text-gray-700 font-mono'>
                  Automated Chatbot
                </Typography>
                <LiaLongArrowAltRightSolid size={20} />
              </NavLink>
              <NavLink
              to="/service/advisor" 
                className="border border-gray-200 rounded-lg p-3 m-2 lg:w-[40vw] w-[75vw] flex justify-between items-center hover:bg-gray-100"
              >
                <Typography className='lg:text-lg text-base ml-4 text-gray-700 font-mono'>
                  Financial Goal   
                </Typography>
                <LiaLongArrowAltRightSolid size={20} />
              </NavLink>
              <NavLink
              to="/service/risk" 
                className="border border-gray-200 rounded-lg p-3 m-2 lg:w-[40vw] w-[75vw] flex justify-between items-center hover:bg-gray-100"
              >
                <Typography className='lg:text-lg text-base ml-4 text-gray-700 font-mono'>
                  Risk Assessment
                </Typography>
                <LiaLongArrowAltRightSolid size={20} />
              </NavLink>
              <NavLink
              to="/service/bill" 
                className="border border-gray-200 rounded-lg p-3 m-2 lg:w-[40vw] w-[75vw] flex justify-between items-center hover:bg-gray-100"
              >
                <Typography className='lg:text-lg text-base ml-4 text-gray-700 font-mono'>
                  Bill Analyzer
                </Typography>
                <LiaLongArrowAltRightSolid size={20} />
              </NavLink>
            </div>
          </div>
      </div>
      <div className='mt-40'>
        <Typography variant="h3" 
              className='text-[#424242] font-growth-sans lg:ml-20 m-10 mb-6'>
                Users Loves FinanceFriend
        </Typography>
      <div className='lg:flex lg:flex-row lg:justify-evenly flex-col'>
          <Card color="transparent" className="lg:w-full lg:max-w-[26rem] lg:m-0 w-[80vw] m-auto p-3">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={testImg1}
              alt="Emily Thompson"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className='text-[#424242] font-growth-sans'>
                  John Doe
                </Typography>
                <div className="5 flex items-center gap-0">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <Typography className='text-base text-gray-700 font-mono'>Marketing Specialist</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography color='black' className='font-mono'>
            &quot;I'm amazed by the power of FinanceFriend! As a marketing specialist, I often find myself juggling multiple projects and deadlines. FinanceFriend's bill analysis feature has helped me identify areas where I can save money, allowing me to focus more on growing my business. Highly recommended!&quot;
            </Typography>
          </CardBody>
          </Card>
          <Card color="transparent" className="lg:w-full lg:max-w-[26rem] lg:m-0 w-[80vw] m-auto p-3">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={testImg2}
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className='text-[#424242] font-growth-sans'>
                  Emily Thompson
                </Typography>
                <div className="5 flex items-center gap-0">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <Typography className='text-base text-gray-700 font-mono'>Product Manager</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography color='black' className='font-mono'>
            &quot;I've always been cautious about managing my finances, but FinanceFriend has made it so much easier. As a busy professional and a mom, I need tools that are efficient and intuitive. FinanceFriend's AI-driven features have helped me stay on top of my budget, plan for my family's future, and make smarter financial decisions without the stress. &quot;
            </Typography>
          </CardBody>
          </Card>
          <Card color="transparent" className="lg:w-full lg:max-w-[26rem] lg:m-0 w-[80vw] m-auto p-3">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={testImg3}
              alt="Emily Thompson"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className='text-[#424242] font-growth-sans'>
                Sarah Smith
                </Typography>
                <div className="5 flex items-center gap-0">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <Typography className='text-base text-gray-700 font-mono'>Software Engineer</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography color='black' className='font-mono'>
            &quot;FinanceFriend has been an absolute lifesaver for me! As a busy software engineer, managing my finances was always a challenge. But with FinanceFriend's intuitive interface and AI-driven insights, I now have a clear picture of my financial health and can make smarter decisions with ease.&quot;
            </Typography>
          </CardBody>
          </Card>
        </div>
      </div>
      <div>
        <FAQ />
      </div>
    </div>
    
  )
}


export default Home
