import React, { useEffect, useState } from 'react'

import {list} from '../post.api'
import NewPost from '../components/NewPost'
import Posts from '../components/Posts'
import { Box, Stack } from '@mui/material'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    list().then((data)=> {
      if(data?.error){
        console.log(data.error)
      }else{
        setPosts(data)
      }
    })
  }, [])

  const removePost = (post) => {
    const updatedPost = [...posts];
    const index = updatedPost.indexOf(post);
    updatedPost.splice(index, 1);
    setPosts(updatedPost);
  };


  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      gap:3,
      textAlign: "center",

    }} spacing={1} >
      <NewPost  posts={posts} setPosts={setPosts} />
      <Posts posts={posts} removePost={removePost} />
    </Box>
  )
}

export default Home
