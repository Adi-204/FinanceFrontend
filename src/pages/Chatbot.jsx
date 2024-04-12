import React, { useState,useEffect } from 'react';
import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import CustomChat from "./CustomChat";
import Analyzer from './Analyzer';

const Chatbot = () => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
 

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className='h-[80vh]'>
    <div className="flex justify-center mt-5">
    <Card className="lg:w-1/2 w-80">
      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="inbuilt"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
               name="type" 
               id='inbuilt'
               value='inbuilt'
               onChange={() => handleOptionChange('inbuilt')}
               checked={selectedOption === 'inbuilt'}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              className="font-medium"
            >
              Automated Financial Analysis
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="custom"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                 name="type" 
                 id='custom'
                 value='custom'
                 onChange={() => handleOptionChange('custom')}
                 checked={selectedOption === 'custom'}
                className="hover:before:opacity-0"
                containerProps={{
                      className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              className="font-medium"
            >
              Custom Prompt
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
    </div>
    {selectedOption === 'inbuilt' && <Analyzer />}
    {selectedOption === 'custom' && <CustomChat />} 
    </div>
  );
};

export default Chatbot;

