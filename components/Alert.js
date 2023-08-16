'use client';
import {
    Paper,
    Grid,
    Stack,
    Alert,AlertTitle
} from '@mui/material'
import BaseCard from '../app/dashboard/(DashboardLayout)/components/shared/BaseCard';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body1,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     height: 60,
//     lineHeight: '60px',
//   }));
  


const Alerts = ({severity, message, showAlert}) => {
    return (
              <Alert severity={severity} sx={{display: showAlert? 'flex': 'none', marginBlock: 2}}>
                {message}
              </Alert>
    );
  };
  
  export default Alerts;