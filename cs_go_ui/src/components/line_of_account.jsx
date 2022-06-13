import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import Button from '@mui/material/Button';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


export default function Line_account({_object, account, default_link}) 
{
    const [show_arr, setShow_arr] = React.useState(false);

    function ticketState(_object)
    {
        if(!_object.is_ok && !_object.is_cancel) return <HourglassBottomIcon color="success"/>
          else if(_object.is_ok) return <CheckCircleOutlineOutlinedIcon color="success"/>
        else return <HighlightOffIcon color="error"/>
    }
    const cancel = async() => {const result = axios.put(`${default_link}api/history/`, {id:_object.id})}
    const approve = async() => {const result = axios.patch(`${default_link}api/history/`, {id:_object.id})}
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setShow_arr(!show_arr)}>
              {show_arr ? <KeyboardArrowUpIcon id='arrow' /> : <KeyboardArrowDownIcon id='arrow'/>}
            </IconButton>
          </TableCell>
          <TableCell id='table-items' component="th" scope="row">Продажа</TableCell>
          <TableCell id='table-items' align="left">
          {
          new Date(_object?.date_time).toLocaleDateString()
          + ' | ' +
          new Date(_object?.date_time).toLocaleTimeString()
          }
          </TableCell>
          <TableCell id='table-items' align="right">{_object.total_price} ₽</TableCell>
          <TableCell id='table-items' align="right">{_object.wallet}</TableCell>
          <TableCell id='table-items' align="right">{ticketState(_object)}</TableCell>
          {account.isOwner && <TableCell id='table-items' align="right"><Button variant="contained" color="success" size="small" onClick={approve}>Подтвердить</Button> 
          <span> </span>
          <Button variant="contained" color="error" size="small" onClick={cancel} >Отменить</Button></TableCell>}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={show_arr} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
              <Typography id='table-items' variant="h6" gutterBottom component="div"> Ссылка на обмен: <a href={_object.trade_url}>{_object.trade_url}</a> </Typography>
                <Typography id='table-items' variant="h6" gutterBottom component="div">Наименование объекта</Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {_object.object_name.map((skin) => (
                      <TableRow some_id={skin}>
                        <TableCell id='table-items' component="th" scope="row">{skin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableBody>
                      
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }