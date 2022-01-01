import React, {  useState } from "react";
import {  Link } from "react-router-dom";
import {
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";

import { create  } from "../user-api";
import FormError from "../errorHandler/FormError.js";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    open: false,
    error: "",
    message:""
  });



  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  const clickSubmit = () => {
    const user = {
      username: values.username || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true,message:"Success"});
      }
    });
  };


  return (
    <div>
      <Paper
        elevation={12}
        sx={{
          margin: "auto",
          mt: 11,
          p: 0.5,
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
            p: 3,
            fontWeight: "bold",
            fontFamily: "Monospace",
            letterSpacing: 3,
          }}
        >
          Sign Up
        </Typography>
        <Divider variant="middle" />
        <Card>
          <TextField
            id="username"
            label="Username"
            fullWidth
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.username}
            onChange={handleChange("username")}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            fullWidth
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.password}
            onChange={handleChange("password")}
          />
          {values.error && <FormError text={values.error} />}
          <CardActions
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={clickSubmit} >Submit</Button>
          </CardActions>
        </Card>
      </Paper>
      <Dialog open={values.open} >
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {values.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin" >Sign In Now!</Link>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Signup;
