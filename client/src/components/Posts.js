import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SinglePost from "./SinglePost";

const Posts = ({ posts, removePost }) => {
  return (
    <Stack spacing={1} >
      <Typography align="center" variant="h4" gutterBottom>
        News
      </Typography>
      <Divider variant="middler" />
      <Grid container  >
        {posts?.length >= 1 &&
          posts?.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} >
              <SinglePost post={item} removePost={removePost} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default Posts;
