import React from 'react'
import { IconButton, Typography } from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { FaCheck } from "react-icons/fa6";
import { IoIosCopy } from "react-icons/io";

const Clipboard = ( {data} ) => {
    const [value, copy] = useCopyToClipboard();
    const [copied, setCopied] = React.useState(false);
 
  return (
    <button
          onClick={() => {
            copy(data);
            setCopied(true);
          }}
          className='ml-3'
        >
          {copied ? (
            <FaCheck  size={25} />
          ) : (
            <IoIosCopy size={25} />
          )}
    </button>
  )
}

export default Clipboard

