import React from 'react'
import { useState } from 'react';
import Result from './Result';
import './Gaming.css'

const secretNum = Math.floor(Math.random()*10)+1;

function Game() {
    const [term , setTerm] = useState("");


    const handleChange = (e) => {
       setTerm(e.target.value)
    }
    return (
      <>
       <div className="header-area">
        <div className='.second-header'>
          <label htmlFor='term'>
            Guess the number between 1 to 10
          </label>
        </div>
        <input
        id="term"
        type='text'
        name='term'
        onChange={handleChange}className='input-text'
        />
        <Result secretNum ={secretNum } term={term}/>
    </div>
  </>
    )   
}

export default Game;
