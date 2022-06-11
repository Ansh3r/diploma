import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../App.css';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Line_help from '../components/line_of_help';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

export default function Help({account, default_link_help}) 
{
        const [tickets, setTickets] = useState([])
        const [text_message, setHelpText]  = useState('')
        const [email, setEmail]  = useState('')
        const handleClose = () => {setOpen(false);};
        const [open, setOpen] = useState(false);

        useEffect(() => {getHelp()},[])
        const getHelp = async()=> 
        {const help = await axios.get(`${default_link_help}api/send-tech-help/`,{withCredentials: true}) 
          setTickets(help.data);
        }
        
        
          
        function sendTicket()
        {
          if(text_message && email != 0) 
            {
                axios.post(`${default_link_help}api/send-tech-help/`, 
                {
                  text_message, 
                  email, 
                  id:account?.id
                })
                alert("Выполнено");
            }
            else 
            {
              setOpen(true);
            }
        }
    return (
      <>
       {!account.isOwner &&
                <div className='help'>
                <div className='comment-main'>
                    <div className='comment-main-head'>
                        <p className='textComment'>Техническая поддержка</p>
                    </div>
                <div className='account-data'>
                    <img src={account?.user_info?.avatar} className="signIn_button"/>
                    <div className='textComment'>{account?.user_info?.personaname}</div>
                </div>
                <div className='comment__main'>
                    <textarea className='comment-input' placeholder='Опишите проблему' maxlength="255" onChange={(e)=>setHelpText(e.target.value)}></textarea>
                    <input type="text" className="email-help" placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)}/>
                    <div className='button-on-send'>
                        <Button variant="contained" color="success" onClick={sendTicket}>Отправить</Button>
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
              </div>}

              {account.isOwner && 
              <TableContainer sx={{
                width:'60%', 
                margin: 'auto',
                maxHeight: 700,
                background:'#2A2833',
                }} component={Paper}>
                <Table size='large' aria-label="collapsible table">
                  <TableHead>
                    <TableRow >
                      <TableCell/>
                      <TableCell id='table-items'><b>Тип</b></TableCell>
                      <TableCell id='table-items' align="left"><b>Дата и время</b></TableCell>
                      <TableCell id='table-items' align="left"><b>Email</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {tickets.map((_object)=>(<Line_help _object={_object} account={account}/>))}
                  </TableBody>
                </Table>
              </TableContainer>}
    </>
    );
  }