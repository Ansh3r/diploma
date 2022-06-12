import React, { useState } from 'react';


export default function AllComments({com}) 
{
        const strTime = new Date(com?.date_time).toLocaleTimeString();
        const [value, setValue] = useState(0);
        function editStar(event) {setValue(event.target.value);}
        const strDate = new Date(com?.date_time).toLocaleDateString();
    return (
        <>
            <div className='user__comment'>
                <div className='right-button'>
                    <button onClick={()=>window.open(com?.user?.profileurl)} className='on-profile'>Профиль Steam</button>
                </div>
                <div className='left-side'>
                <img className='img-comm' src={com?.user?.avatar}/>
                <span>{com?.user?.personaname}</span>
                <div className='date'>{strDate} {strTime}</div>
                </div>
                <div className='textiRate'>
                <p>{com?.comment_text}</p>
                <p>Оценка:"{com?.rating}"</p>
                </div>
            </div>
    </>
    );
  }