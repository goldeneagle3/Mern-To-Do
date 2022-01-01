import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Card,
  CardActions,
  Switch,
  Stack,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth";
import { read, update } from "../post.api";
import FormError from "./../errorHandler/FormError";

export default function EditPost({ match }) {
  const [values, setValues] = useState({
    title: "",
    text: "",
    top: false,
    error: "",
    redirectToHome: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  // Load Post Data

  useEffect(() => {
    // GETTING INFORMATION ABOUT PROFIL
    read({ postId: match.params.postId }, { t: jwt.token }).then((data) => {
      if (data?.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        setValues({
          ...values,
          title: data.title,
          text: data.text,
          top: data.top,
        });
        // console.log(data);
      }
    });
  }, [match.params.postId]);

  const clickSubmit = () => {
    setProgress(true);
    const postData = {
      title: values.title || undefined,
      text: values.text || undefined,
      top: values.top || undefined,
    };

    update(
      {
        postId: match.params.postId,
      },
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setProgress(false);
      } else {
        setValues({ ...values, redirectToHome: true });
        setProgress(false);
      }
    });
  };

  const handleChangeTop = (event) => {
    setValues({ ...values, top: event.target.checked });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  if (values.redirectToHome) {
    return <Redirect to="/" />;
  }

  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        mt: 11,
        maxWidth: 600,
        height: "100%",
        textAlign: "center",
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
        EDIT NEWS
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
          rows={3}
          sx={{
            m: 2,
          }}
          value={values.text}
          onChange={handleChange("text")}
        />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          textAlign="center"
          justifyContent="center"
        >
          <Typography>Ordinary</Typography>
          <Switch
            checked={values.top}
            onChange={handleChangeTop}
            inputProps={{ "aria-label": "controlled" }}
            color="secondary"
          />
          <Typography>Top</Typography>
        </Stack>

        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={clickSubmit} color="primary" variant="contained" >Submit</Button>
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
