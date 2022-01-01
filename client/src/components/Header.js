import * as React from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import auth from "./../auth.js";
import { IconButton } from "@mui/material";

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const jwt = auth.isAuthenticated();
  if(location.pathname === "/" ){
    return null
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {auth.isAuthenticated() && (
            <>
              <Button onClick={()=> history.push("/home")}  color="inherit">{jwt.user?.username}</Button>
              <IconButton
                onClick={() => {
                  auth.clearJWT(history.push("/"));
                }}
              >
                <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
