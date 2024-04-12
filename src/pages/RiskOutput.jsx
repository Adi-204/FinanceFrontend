import React, {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import DownloadButton from './DownloadButton';
import ReadAloud from './ReadAloud';
import Clipboard from '../components/Clipboard';

const RiskOutput = () => {
    const api = useAxiosPrivate();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState("finance");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const [healthOut,setHealthOut] = useState([]);
    const [legalOut,setLegalOut] = useState([]);
    const [futureOut,setFutureOut] = useState([]);
    
    const { data,financeOutput } =  location.state;

    const makeComponent = (arr) =>{
        const renderOutput = arr.map((ele, ind) => (
            <div key={ind}>
            {ele.slice(-1) === ':' ? <h4><br/>{ele}<br/></h4> :  <p>{ele}</p>}
            </div>
        ));
        return (
          <div>
            <div className='flex justify-end mr-4 lg:mb-0 mb-3'>
                <ReadAloud text={arr} />
                <Clipboard data={arr} />
            </div>
            {renderOutput}
            <DownloadButton data={arr} />
          </div>
        )
    }

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[]);

    const analysis = [
        {
          label: "Finance Impact",
          value: "finance",
          desc: makeComponent(financeOutput),
        },
        {
          label: "Health Impact",
          value: "health",
          desc: healthOut.length>0 ? makeComponent(healthOut) : <Loading />,
        },
        {
          label: "Legal Risk",
          value: "legal",
          desc: legalOut.length>0 ? makeComponent(legalOut) : <Loading />
        },
        {
          label: "Future Plans",
          value: "future",
          desc: futureOut.length>0 ? makeComponent(futureOut) : <Loading />
        }
      ];

      useEffect(() => {
        if (selectedTab === 'health' && healthOut.length === 0) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await api.post(`${import.meta.env.VITE_URL}/api/risk/health`, data);
                    setHealthOut(response.data);
                } catch (error) {
                    setError(error.response.data);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }

        if (selectedTab === 'legal' && legalOut.length === 0) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await api.post(`${import.meta.env.VITE_URL}/api/risk/legal`, data);
                    setLegalOut(response.data);
                } catch (error) {
                    setError(error.response.data);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
        
        if (selectedTab === 'future' && futureOut.length === 0) {
          const fetchData = async () => {
              try {
                  setLoading(true);
                  const response = await api.post(`${import.meta.env.VITE_URL}/api/risk/future`, data);
                  setFutureOut(response.data);
              } catch (error) {
                  setError(error.response.data);
              } finally {
                  setLoading(false);
              }
          }
          fetchData();
      }

    }, [selectedTab, healthOut, legalOut, futureOut]);


    const handleTabClick = (value) => {
        setSelectedTab(value);
    };

    return (
      <div className="flex justify-center h-screen mt-10 ">
        <Tabs value={selectedTab} className="lg:w-1/2 w-[90vw]">
          <TabsHeader>
            {analysis.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={() => handleTabClick(value)} >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {analysis.map(({ value, desc }) => (
              <TabPanel className='text-black' key={value} value={value} style={{ maxHeight: '70vh', overflowY: 'auto' }} >
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    )
}

export default RiskOutput

