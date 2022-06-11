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

export default function Line_help({_object}) 
{
    const [show_arr, setShow_arr] = React.useState(false);
    
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
          <TableCell id='table-items' component="th" scope="row">Помощь</TableCell>
          <TableCell id='table-items' align="left">
          {
          new Date(_object?.date).toLocaleDateString()
          + ' | ' +
          new Date(_object?.date).toLocaleTimeString()
          }
          </TableCell>
          <TableCell id='table-items' align="left">{_object.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={show_arr} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography id='table-items' variant="h6" gutterBottom component="div">Сообщение</Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                      <TableRow>
                        <TableCell id='table-items' component="th" scope="row">{_object.text_message}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }