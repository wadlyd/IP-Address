import React, { useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SearchComponent = () => {


  return (
      <form >
      <span></span>
      {/* <label htmlFor="input">IP address</label> */}

        <input 
            type="text"
            // value={userInput}
            placeholder="Search for any IP address or domain"
            // onChange={onChange}
            // onFocus={onFocus}
            id='input'
            required
            // ref={inputRef}
            // className={errMsg? 'err':null}
            autoFocus
        />
        <button>
            <ArrowForwardIosIcon
                sx={{
                    color: '#FFFFFF',
                    fontSize: '30px',
                }}  
            />
        </button>
      </form>
    
  )
}

export default SearchComponent;