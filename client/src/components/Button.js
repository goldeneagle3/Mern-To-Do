import { Box, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

export default function Button({ text, link }) {
  const history = useHistory();
  return (
    <Box
      onClick={() => history.push(link)}
      sx={{
        p: { xs: 1, md: 4 },
        borderRadius: "15px",
        width: { xs: 100, md: 200 },
        bgcolor: "#E94407",
        cursor: "pointer",
        ":hover":{
          bgcolor: '#9F2E03'
        }
      }}
    >
      <Typography variant="h6" sx={{ color: "#EEDCD5" }}>
        {text}
      </Typography>
    </Box>
  );
}
