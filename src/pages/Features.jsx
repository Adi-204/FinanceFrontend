import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";
import {
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import chatbotImg from "../assets/chatbot.png"
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import plannerImg from "../assets/planner.png"
import riskImg from "../assets/risk.png";
import billImg from "../assets/bill.png";

const Features = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  return (
    <div className='flex flex-col items-center justify-center'>

      <div className='h-[40vh] flex flex-col justify-center items-center'>
        <Typography variant="h1" className='text-[#424242] font-growth-sans'>Technology</Typography>
        <Typography className='lg:text-lg mt-4 text-base ml-4 text-gray-700 font-mono'>
          Transforming financial advisory services with the power of AI-driven insights.
        </Typography>
      </div>  

      <div>
        <div className='mt-8 lg:h-[40vh] lg:flex lg:justify-center lg:items-center lg:gap-20' >
          <img src={chatbotImg} />
          <Card className="mt-6 lg:w-[50vw] w-[85vw]  bg-[#F5F7F9]">
            <CardBody>
              <Typography variant="h5" className='text-[#424242] font-growth-sans mb-2'>
                Smart Financial Assistant
              </Typography>
              <Typography className='text-[#424242] font-mono' >
                Experience the future of financial management with FinanceFriend's powerful features, Automated Analysis and Prompt Chatbot. With Automated Analysis, leverage advanced AI and machine learning algorithms to instantly gain comprehensive insights into your finances. Prompt Chatbot provides round-the-clock personalized financial assistance through natural and interactive conversations. 
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex">
              <NavLink
                to='/service/chatbot'
                className="text-blue-600 hover:text-gray-600 transition-colors duration-300"
              >
                Try Demo
              </NavLink>
              <LiaLongArrowAltRightSolid size={20} className='ml-2 mt-0.5' />
            </CardFooter>
          </Card>
        </div>
        <div className='mt-8 lg:h-[40vh] lg:flex lg:justify-center lg:items-center lg:gap-20' >
          <img src={plannerImg} />
          <Card className="mt-6 lg:w-[50vw] w-[85vw] bg-[#F5F7F9] ">
            <CardBody>
              <Typography variant="h5" className='text-[#424242] font-growth-sans mb-2'>
                Personalized Financial Planner
              </Typography>
              <Typography className='text-[#424242] font-mono' >
                Our Financial Planner feature is your roadmap to achieving your financial goals with clarity and confidence. Simply input your financial aspirations, whether it's buying a home, saving for retirement, or paying off debt, and let FinanceFriend create a personalized plan tailored to your objectives. Our intuitive platform analyzes your current financial situation, identifies actionable steps, and provides a clear roadmap to help you reach your goals.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex">
              <NavLink
                to='/service/advisor'
                className="text-blue-600 hover:text-gray-600 transition-colors duration-300"
              >
                Try Demo
              </NavLink>
              <LiaLongArrowAltRightSolid size={20} className='ml-2 mt-0.5' />
            </CardFooter>
          </Card>
        </div>
        <div className='mt-8 lg:h-[40vh] lg:flex lg:justify-center lg:items-center gap-20' >
          <img src={riskImg} />
          <Card className="mt-6 lg:w-[50vw] w-[80vw] bg-[#F5F7F9] ">
            <CardBody>
              <Typography variant="h5" className='text-[#424242] font-growth-sans mb-2'>
                Comprehensive Risk Management
              </Typography>
              <Typography className='text-[#424242] font-mono' >
                Navigate the complexities of risk management with confidence using FinanceFriend's comprehensive Risk Assessment feature. Our platform offers a detailed analysis of various risk factors, including Financial Impact, Health Impact, Legal Impact, and Future Impact, providing you with invaluable insights to guide your decision-making process. With FinanceFriend by your side, uncertainty becomes an opportunity for strategic planning and proactive risk management.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex">
              <NavLink
                to='/service/risk'
                className="text-blue-600 hover:text-gray-600 transition-colors duration-300"
              >
                Try Demo
              </NavLink>
              <LiaLongArrowAltRightSolid size={20} className='ml-2 mt-0.5' />
            </CardFooter>
          </Card>
        </div>
        <div className='mt-8 lg:h-[40vh] lg:flex lg:justify-center lg:items-center gap-20' >
          <img src={billImg} />
          <Card className="mt-6 lg:w-[50vw] w-[80vw] bg-[#F5F7F9] ">
            <CardBody>
              <Typography variant="h5" className='text-[#424242] font-growth-sans mb-2'>
                Efficient Bill Analysis
              </Typography>
              <Typography className='text-[#424242] font-mono' >
                  Introducing our Bill Analyzer feature on FinanceFriend: Your ultimate tool for understanding and optimizing your expenses effortlessly. With our advanced AI-powered technology, simply snap a photo of your bill, and let FinanceFriend do the rest.Gain valuable insights into your spending patterns, identify areas for cost reduction, and receive actionable tips on how to minimize your bills effectively.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex">
              <NavLink
                to='/service/bill'
                className="text-blue-600 hover:text-gray-600 transition-colors duration-300"
              >
                Try Demo
              </NavLink>
              <LiaLongArrowAltRightSolid size={20} className='ml-2 mt-0.5' />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Features
