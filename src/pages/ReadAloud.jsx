import React, { useState,useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaPause } from "react-icons/fa6";

const ReadAloud = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [toggle,setToggle] = useState('play');

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };


  const handleChange = () =>{
      if(toggle === 'play'){
        handlePlay();
        setToggle('pause');
      }
      else{
        handlePause();
        setToggle('play');
      }
  }


  return (
    <div>
      {toggle === 'play' ? 
        <HiSpeakerWave onClick={handleChange} size={25} className='cursor-pointer' /> : 
        <FaPause onClick={handleChange} size={25} className='cursor-pointer' /> 
      }
    </div>
  );
};

export default ReadAloud;
