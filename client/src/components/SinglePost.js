import React from "react";
import { useHistory } from "react-router";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";

import DeletePost from "./DeletePost";
import auth from "./../auth.js";

const SinglePost = ({ post, removePost }) => {
  const jwt = auth.isAuthenticated();
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: "100%", m: 1, position: "relative" }}>
      {post.top && (
        <StarIcon
          color="secondary"
          sx={{ position: "absolute", top: 0, right: 0 }}
        />
      )}

      <CardHeader title={post.title} />
      <CardContent>
        <Typography variant="body2">{post.text} </Typography>
      </CardContent>
      {jwt.user?._id === post?.createdBy && (
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton onClick={() => history.push("/posts/" + post._id)}>
            <EditIcon sx={{color:'#1BBEBF'}} />
          </IconButton>
          <IconButton>
            <DeletePost post={post} onRemove={removePost} />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default SinglePost;
