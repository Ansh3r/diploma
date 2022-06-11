import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';



export default function CommentMain({account, default_link_comment}) 
{
        const [open, setOpen] = useState(false);
        const handleClose = () => {setOpen(false);};
        const [score, setScore] = useState(0);
        const [comment_text, setComment_text]  = useState('')
        function editStar(event) {setScore(event.target.value);}
        function sendComment()
        {
            if(comment_text && score != 0) 
            {
                axios.post(`${default_link_comment}api/comments/`, 
                {
                  comment_text:comment_text, 
                  rating:score, 
                  id:account?.id
                })
                alert('Выполнено');
            } 
            else 
            {
                setOpen(true);
            }
        }
    return (
        <>
                <div className='comment-main'>
                    <div className='comment-main-head'>
                        <p className='textComment'>Комментарий</p>
                    </div>
                <div className='account-data'>
                    <img src={account?.user_info?.avatar} className="signIn_button"/>
                    <div className='textComment'>{account?.user_info?.personaname}</div>
                </div>
                <div className='comment__main'>
                    <textarea className='comment-input' placeholder='Отзыв' maxlength="255" onChange={(e)=>setComment_text(e.target.value)}></textarea>
                    <div className='textComment'>Рейтинг</div>
                    <div className="main-value">
                        <input type="radio" id="value5" name="rating" value="5" onChange={editStar}/>
                        <label for="value5" title="Рейтинг «5»"></label>	
                        <input type="radio" id="value4" name="rating" value="4" onChange={editStar}/>
                        <label for="value4" title="Рейтинг «4»"></label>    
                        <input type="radio" id="value3" name="rating" value="3" onChange={editStar}/>
                        <label for="value3" title="Рейтинг «3»"></label>  
                        <input type="radio" id="value2" name="rating" value="2" onChange={editStar}/>
                        <label for="value2" title="Рейтинг «2»"></label>    
                        <input type="radio" id="value" name="rating" value="1" onChange={editStar}/>
                        <label for="value" title="Рейтинг «1»"></label>
                    </div>
                    <div className='button-on-send'>
                        <Button variant="contained" color="success" onClick={sendComment}>Отправить</Button>
                    </div>
                    </div>
                </div>
                <div>
               {open && <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Ошибка ввода"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Заполните пожалуйста все поля
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      ОК
                    </Button>
                  </DialogActions>
                </Dialog>}
              </div>
    </>
    );
  }