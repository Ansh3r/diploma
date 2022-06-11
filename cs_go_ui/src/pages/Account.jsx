import '../App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Line_account from '../components/line_of_account';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

export default function Account({default_link_lk, logged_in_lk, account}) 
{ 
  const [object_state, setObject_state] = useState([])
  const [trade_url, setTrade_url] = useState([])
  useEffect(() => {getObject_state()},[])
  const getObject_state = async()=> 
  {
    const object_state = await axios.get(`${default_link_lk}api/history/`, {withCredentials: true}) 
    setObject_state(object_state.data);
  }


  return (
    <>
    {!logged_in_lk && <Navigate replace to={'/'}/>}
      <h1>ИСТОРИЯ СДЕЛОК</h1>
    <TableContainer sx={{
      width:'85%', 
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
            <TableCell id='table-items' align="right"><b>Стоимость</b></TableCell>
            <TableCell id='table-items' align="right"><b>Кошелек</b></TableCell>
            <TableCell id='table-items' align="right"><b>Состояние</b></TableCell>
            {account.isOwner && <TableCell id='table-items' align="right"><b>Действие</b></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {object_state.map((_object)=>(<Line_account some_id={_object.id} _object={_object} account={account} default_link={default_link_lk}/>))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}