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
                <img className='signIn_button' src={com?.user?.avatar}/>
                <span className='comment-img'>{com?.user?.personaname}</span>
                <div>{strDate} {strTime}</div>
                <button onClick={()=>window.open(com?.user?.profileurl)} className="on-profile">Профиль</button>
                <p>{com?.comment_text}</p>
                <p>Оценка:"{com?.rating}"</p>
            </div>
    </>
    );
  }