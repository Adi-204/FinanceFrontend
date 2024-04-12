import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";


function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
}

const FAQ = () => {
    const [open, setOpen] = React.useState(0);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
   
    return (
      <div className="mt-20">
        <Typography variant="h3" 
          className='text-[#424242] font-growth-sans lg:ml-20 m-10 mb-6'
        >
          Frequently Asked Questions (FAQs)   
        </Typography>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />} 
            className="lg:w-[70vw] lg:ml-20 w-[90vw] m-auto" >
          <AccordionHeader 
            onClick={() => handleOpen(1)} 
            className='text-[#424242] font-growth-sans'
          >
            How can FinanceFriend help me?
          </AccordionHeader>
          <AccordionBody className='text-base text-gray-700 font-mono'>
          FinanceFriend is a comprehensive financial management platform that leverages AI technology to provide users with personalized financial planning, bill analysis, risk assessment, and automated chat support. Our goal is to empower individuals to take control of their finances and achieve their financial goals with confidence.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />} 
            className="lg:w-[70vw] lg:ml-20 w-[90vw] m-auto" >
          <AccordionHeader 
            onClick={() => handleOpen(2)} 
            className='text-[#424242] font-growth-sans'
          >
            How do I get started with FinanceFriend?
          </AccordionHeader>
          <AccordionBody className='text-base text-gray-700 font-mono'>
              Getting started with FinanceFriend is easy! Simply sign up for an account on our website and follow the prompts to set up your profile. Once you're logged in, you can start exploring our features and customizing your financial experience to meet your specific needs and goals.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />} 
            className="lg:w-[70vw] lg:ml-20 w-[90vw] m-auto" >
          <AccordionHeader 
            onClick={() => handleOpen(3)} 
            className='text-[#424242] font-growth-sans'
          >
            How does FinanceFriend protect my privacy and data security?
          </AccordionHeader>
          <AccordionBody className='text-base text-gray-700 font-mono'>
              At FinanceFriend, we take your privacy and data security seriously. We employ robust encryption and security measures to protect your personal and financial information from unauthorized access, disclosure, or misuse. Additionally, we adhere to strict data privacy regulations and industry best practices to ensure the confidentiality and integrity of your data at all times.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />} 
            className="lg:w-[70vw] lg:ml-20 w-[90vw] m-auto" >
          <AccordionHeader 
            onClick={() => handleOpen(4)} 
            className='text-[#424242] font-growth-sans'
          >
            How much does FinanceFriend cost?
          </AccordionHeader>
          <AccordionBody className='text-base text-gray-700 font-mono'>
              Yes, FinanceFriend offers a comprehensive set of features that are completely FREE to use for all users. Whether you're looking to create a personalized financial plan, analyze your bills, assess financial risks, or get support from our AI-driven chatbot, you can access all these features and more without any cost. We believe in providing access to powerful financial tools to empower individuals to take control of their finances, regardless of their budget or financial situation.
          </AccordionBody>
        </Accordion>
      </div>
    );
}

export default FAQ