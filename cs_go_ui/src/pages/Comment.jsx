import React, { useEffect, useMemo, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import CommentMain from '../components/commentmain';
import AllComments from '../components/allcomments';
import axios from 'axios';

export default function Comment({account, default_link_comment, logged_in_comment}) 
{
  const [getCom, setCom] = useState([])
  const [page, setPage] = useState(1);
  const some_comment = useMemo(()=>getCom.filter((com, id)=> 
    Math.ceil((id+1)/4) == page)
  ,[page, getCom]);
  const changePage = (event, value) => {setPage(value);};
  useEffect(async() => {setCom((await axios.get(`${default_link_comment}api/comments/`, 
  {withCredentials:true})).data)}, [])
  
  return (
  <>
  
    <div className='comment'>
    {logged_in_comment &&<CommentMain account={account} default_link_comment={default_link_comment}/>}

      <div className='commentlist'>
          {
            some_comment.map(com=><AllComments com={com}/>)
          }
      </div>
    </div>
      <div className='pagination'>
      <Pagination count={Math.ceil(getCom.length/4) || 1} page={page} onChange={changePage} color='primary' renderItem={(com) => (<PaginationItem {...com}/>)}/>
    </div>
    
    </>
  );
} 