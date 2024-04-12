import React from 'react';
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className='flex flex-row'>
        <Spinner size={200} />
        <p className="text-lg font-bold mb-4 ml-3">Loading..</p>
      </div>
    </div>
  );
};

export default Loading;
