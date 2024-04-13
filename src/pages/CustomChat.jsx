import React from 'react'
import Loading from "../components/Loading";
import { HiUpload } from "react-icons/hi";
import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ReadAloud from './ReadAloud';
import Clipboard from '../components/Clipboard';

const CustomChat = () => {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [customForm,setCustomForm] = useState({
    chat : "",
  })
  const [output, setOutput] = useState([]);
  const api = useAxiosPrivate();
  const [isoutput,setIsOutput] = useState(true);

  const onChangeCustomHandler = (e)=>{
    const {name,value} = e.target;
    setCustomForm((prevData)=>{
      return {
        ...prevData,
        [name] : value
      }
    })
  }

  const handleCustomSubmit = (e) =>{
    e.preventDefault();
    const formData = customForm;
    setCustomForm({
      chat : ""
    })
    const sendPrompt = async()=>{
        try {
          setLoading(true);
          setIsOutput(false);
          const response = await api.post(`/api/chatbot/custom`,formData);
          setOutput(response.data);
          setIsOutput(true);
        } catch (error) {
            setError(error.response.data);
        }
        finally{
          setLoading(false);
        }
    }
    sendPrompt();
  }

  const renderOutput = output.map((ele, ind) => (
    <div key={ind}>
    {ele.slice(-1) === ':' ? <h4><br/>{ele}<br/></h4> :  <p>{ele}</p>}
    </div>
  ));
  
  return (
    <div className='flex flex-col lg:h-[75vh] h-[70vh] justify-between items-center'>
      {loading && <Loading/> }
      {
        isoutput &&
        <div className='lg:h-[60vh] lg:w-[40vw] h-[50vh] w-[85vw] overflow-auto mt-10'>
          {
            output.length>0 && 
            <div className='p-3 border-2 border-black rounded-lg'>
              <div className='flex justify-end mr-4 lg:mb-0 mb-3'>
                <ReadAloud text={output} />
                <Clipboard data={output} />
              </div>
            {renderOutput}
            </div>
          }
        </div>
      }
      {error && <p>{error}</p>}
       <form onSubmit={handleCustomSubmit} className="flex items-center justify-center mt-8">
        <div className='flex items-center'>
          <input
            type="text"
            placeholder='Ask Me Anything...'
            id="chat"
            name="chat"
            value={customForm.chat}
            onChange={onChangeCustomHandler}
            className="lg:w-[35vw] w-[70vw] p-2 border-2 border-black  rounded-3xl"  
          />
          <button type="submit" className="text-black px-2 py-2">
            <HiUpload size={25} />
          </button>
        </div>
      </form>
    </div>
  )
}



export default CustomChat