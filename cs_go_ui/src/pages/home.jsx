import '../App.css';
import React, { useEffect, useState } from 'react';

export default function Home({logged_in}) 
{ 
  return (
    <>
      {!logged_in && 
     <div className='first-view-logged'>
     <div className='back-first-view'>
     <span className='first-view-text'>Необходимо авторизоваться</span> 
   </div>
   </div>
      }
      {logged_in && 
      <div className='first-view-logged'>
        <div className='back-first-view'>
        <span className='first-view-text'>Можно начать работу с сайтом</span> 
      </div>
      </div>
      }

    </>
  );
}