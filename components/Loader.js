'use client'

// Importing material ui stuff
import {CircularProgress, Box, Typography} from "@mui/material";

export default function Loader({isLoading, height, message}) {
  return (
    <Box
      sx={{
        display: isLoading? "flex": "none",
        justifyContent: "center",
        alignItems: "center",
        marginBlock: '10px'
        // width: "100vw",
        // height: height||"100vh",
        // position: 'absolute',
        // top: 0,
        // left: 0,
        
      }}
    >
      <CircularProgress />
      <Typography sx={{paddingInlineStart: 5}}>
        {message||'Loding....'}
      </Typography>
    </Box>
  );
};
