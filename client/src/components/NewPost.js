import React, { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Card,
  CardActions,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth";
import { createPost } from "../post.api";
import FormError from "./../errorHandler/FormError";

export default function NewPost({ match,setPosts }) {
  const [values, setValues] = useState({
    title: "",
    text: "",
    error: "",
    redirectToHome: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    setProgress(true);
    let postData = {
      title: values.title || undefined,
      text: values.text || undefined,
    };

    createPost(
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
        setProgress(false);
      } else {
        setPosts((post) => [data,...post])
        console.log(data)
        setProgress(false);
      }
    });

    setValues({...values,title:"",text:""})
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <Paper
      elevation={8}
      sx={{
        margin: "auto",
        mt:2,
        maxWidth: 600,
        height: "100%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        align="center"
        gutterBottom
        variant="h6"
        sx={{
          p: 1,
          fontWeight: "bold",
          fontFamily: "Monospace",
          letterSpacing: 3,
        }}
      >
        NEW NEWS
      </Typography>
      <Divider variant="middle" />
      <Card sx={{ p: 1 }}>
        <TextField
          id="title"
          fullWidth
          variant="standard"
          label="Title"
          sx={{
            m: 2,
          }}
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          id="text"
          fullWidth
          required
          variant="standard"
          label="Text"
          multiline
          rows={2}
          sx={{
            m: 2,
          }}
          value={values.text}
          onChange={handleChange("text")}
        />
        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            {" "}
            Submit
          </Button>
        </CardActions>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}
