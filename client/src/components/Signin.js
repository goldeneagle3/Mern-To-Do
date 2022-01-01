import React, { useState } from "react";
import {  Redirect } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import DoorBackIcon from "@mui/icons-material/DoorBack";

import auth from "./../auth";
import { login } from "../user-api";
import FormError from "./../errorHandler/FormError";

export default function Signin(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });


  const clickSubmit = () => {
    if(!values.username || !values.password){
      return setValues({...values,error: "Please , provide valid username and password!"})
    }
    const user = {
      username: values.username || undefined,
      password: values.password || undefined,
    };

    login(user).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: "Email or password wrong ! Please try again.",
        });
      } else {
        auth.authenticate( data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  if (auth.isAuthenticated()) {
    return <Redirect to="/home" />;
  }

  return (
    <Card
      sx={{
        margin: "auto",
        mt: 11,
        p: 0.5,
        maxWidth: 600,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Open Door</Typography>
        <DoorBackIcon />
      </Box>
      <CardContent>
        <TextField
          id="username"
          type="username"
          label="Email"
          fullWidth
          required
          variant="standard"
          sx={{
            m: 1,
          }}
          value={values.username}
          onChange={handleChange("username")}
        />
        <TextField
          id="password"
          type="password"
          required
          label="Password"
          fullWidth
          variant="standard"
          sx={{
            m: 1,
          }}
          value={values.password}
          onChange={handleChange("password")}
        />
        <br />
        {values.error && <FormError text={values.error} />}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
