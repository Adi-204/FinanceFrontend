import React, { useState,useEffect } from 'react';
import { 
    Button, 
    Card, 
    Input, 
    Typography 
} from "@material-tailwind/react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import { LuUpload } from "react-icons/lu";
import DownloadButton from './DownloadButton';
import ReadAloud from './ReadAloud';
import Clipboard from '../components/Clipboard';

const BillAnalysis = () => {

    const api = useAxiosPrivate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [output,setOutput] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif'];
    const maxFileSizeInBytes = 3 * 1024 * 1024; 

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (allowedMimeTypes.includes(file.type) && file.size <= maxFileSizeInBytes) {
            setSelectedFile(file);
        } else {
            alert('Please select a valid image file (PNG, JPEG, WEBP, HEIC, HEIF) with a maximum size of 3 MB.');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const getAnalysis = async()=>{
            const formData = new FormData();
            formData.append('image', selectedFile);
            try {  
                setLoading(true);
                const response = await api.post(`${import.meta.env.VITE_URL}/api/bill/analysis`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setOutput(response.data);
            } catch (error) {
                setError(error.response.data);
            }
            finally{
                setLoading(false);
            }
        }
        getAnalysis();
    };

    const renderOutput = output.map((ele, ind) => (
        <div key={ind}>
          {ele.slice(-1) === ':' ? <h4><br />{ele}<br /></h4> : <p>{ele}</p>}
        </div>
    ));

    if(loading){
        return <Loading />
    }

    return (
        <div className='flex flex-col lg:h-[75vh] h-[90vh] justify-between items-center'>
            {output.length>0 ? (
                <div>
                    <div className='lg:h-[75vh] lg:w-[40vw] h-[80vh] w-[85vw] overflow-auto mt-10 p-3 border-2 border-black rounded-lg'>
                    <div className='flex justify-end mr-4 mb-2'>
                        <ReadAloud text={output} />
                        <Clipboard data={output} />
                    </div>
                        {renderOutput}
                    </div>
                    <DownloadButton data={output} />
                </div>
            ) : (
                <div className='flex items-center justify-center h-[80vh]'>
                <Card className="w-[90vw] lg:w-[40vw] lg:h-[70vh] p-8">
                     <Typography color='black' variant="h3" className="mb-4">
                        Upload your Bill
                    </Typography>
                    <Typography className="mb-4">
                        Easily upload bill with just a few clicks and get analysis.
                    </Typography>
                    {selectedFile != null && (
                        <div className="flex flex-wrap">
                            <Typography color='black' className="truncate">Selected Photo - </Typography>
                            <div className="mb-4">
                            <Typography color='black' className="truncate ml-1">{ selectedFile.name} (Size = {Math.round((selectedFile.size)/1024)} KB)</Typography>
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="file-input">
                            <div 
                                className='h-[30vh] border-2 border-black border-dashed rounded-lg flex items-center justify-center cursor-pointer'
                            >   
                                <div className='flex flex-col items-center text-black'>
                                    <LuUpload size={35} color='black' className='mb-3'/>
                                    <div className='mt-1'>
                                        Select a photo (.png/.jpeg/.webp)
                                    </div>
                                </div>
                            </div>
                        </label>
                        <input className='hidden' id="file-input" type="file" onChange={handleFileInputChange} />
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            variant="filled" 
                            type="submit" 
                            onClick={handleFormSubmit}
                            className='mt-3'
                        >
                        SUBMIT
                        </Button>
                    </div>
                </Card>
                </div>
            )}
        </div>
    );

}

export default BillAnalysis;

