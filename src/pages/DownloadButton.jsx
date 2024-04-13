import React , { useState } from 'react'
import { Button } from "@material-tailwind/react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const DownloadButton = ( {data} ) => {

    const [error,setError] = useState('');

    const [downloading, setDownloading] = useState(false);

    const api = useAxiosPrivate();
    
    const handleSubmit = () =>{

        let pdfData = "";

        for(let i=0;i<data.length;i++){
            if(data[i].slice(-1) === ':'){
                pdfData += data[i] + "\n";
            }
            else{
                pdfData += data[i] + "\n";
            }
        }

        const pdfContent = { 
            pdfData
        };

        const getPdf = async() =>{
            try {
                setDownloading(true);
                const response = await api.post(`/api/advisor/pdf`,pdfContent,{
                    responseType: 'blob'
                });
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Analysis.pdf';
                document.body.appendChild(link);
                link.click();
    
                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } catch (error) {
                setError(response?.error?.data);
            }
            finally {
                setDownloading(false);
            }
        }
        getPdf();
    }

  return (
    <div className='flex justify-center mt-3'>
        <Button onClick={handleSubmit}  >
            {downloading ? 'Downloading...' : 'Download PDF'}
        </Button>
    </div>
  )
}

export default DownloadButton