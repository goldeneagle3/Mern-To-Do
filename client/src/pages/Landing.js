import React from "react";
import { Redirect } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";

import auth from "../auth";
import Back from "./../assets/back3.jpg";
import Button from "../components/Button";

const Landing = () => {

  if (auth.isAuthenticated()) {
    return <Redirect to="/home" />;
  }
  return (
    <Box
      sx={{
        backgroundImage: `url(${Back})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "cover",
        height: { xs: "100%", sm: "100vh" },
        justifyContent: "center",
        p: {xs:5,md:0},
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{ alignItems: "center", pt: {xs:0,md:25},pr:{xs:0,md:5},pl:{xs:0,md:5} }}
        spacing={2}
      >
        <Grid item xs={12} md={6} sx={{p:{xs:0,md:5}}}>
          <Typography
            align="center"
            variant="h3"
            gutterBottom
            color="whitesmoke"
          >
            TEST NEWS API
          </Typography>
          <Typography color="whitesmoke" variant="h6">
            A CRUD application with authentication and authorization in help of
            the JSON. Node Express React MUI are the technologies which used in
            this application.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            margin: "auto",
            justifyContent: "center",
            borderRadius:'10px',
            // p: {xs:0,md:5},
            maxWidth:'100%',
            mt:{xs:1,md:0}
          }}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              // bgcolor: "#34495E",
              borderRadius:'10px',
            }}
            spacing={2}
          >
            <Button text="Sign Up" link="/signup" />
            <Button text="Sign In" link="/signin" />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
