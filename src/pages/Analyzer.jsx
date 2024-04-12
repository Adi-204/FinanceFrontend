import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Loading from "../components/Loading";
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import DownloadButton from './DownloadButton';
import ReadAloud from './ReadAloud';
import Clipboard from '../components/Clipboard';

const Analyzer = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const api = useAxiosPrivate();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleAnalyze = () => {
    const getOutput = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${import.meta.env.VITE_URL}/api/chatbot/analyze`);
        setOutput(response.data);
      } catch (error) {
        setError(error.response.data);
      }
      finally {
        setLoading(false);
      }
    }
    getOutput();
  }

  const renderOutput = output.map((ele, ind) => (
    <div key={ind}>
      {ele.slice(-1) === ':' ? <h4><br />{ele}<br /></h4> : <p>{ele}</p>}
    </div>
  ));

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='flex flex-col lg:h-[75vh] h-[90vh] justify-between items-center'>
      {
        output.length > 0 ? (
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
          loading ? <Loading/> :
          <div className='h-[80vh]'>
            <h1 className='lg:mt-4 flex justify-center lg:text-xl font-mono mt-3'>
              Welcome to the Automated Financial Analyzer
            </h1>
            <div className='mt-3 flex justify-center font-mono' >
              <Button
                size="md"
                onClick={handleOpen}
                variant="filled"
              >
                How it works ?
              </Button>
            </div>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Step by Step Guidance</DialogHeader>
              <DialogBody>
                <p>1. Simply click the "Analyze" button to initiate the process.</p>
                <p>2. Sit back and relax while our advanced algorithms process your financial information.
                  This may take a few moments depending on the complexity of your data.
                </p>
                <p>3. Once the analysis is complete, you'll be presented with a comprehensive overview of your financial situation.</p>
                <p>4. Based on the insights provided, you can make informed decisions to optimize your financial health. </p>
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
                <Button variant="gradient" color="green" onClick={handleOpen}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
            <div className='mt-3 flex justify-center items-center font-mono h-[60vh]'>
              <div>
                <Button
                  size="md"
                  variant="filled"
                  onClick={handleAnalyze}
                >
                  Analyze
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Analyzer
