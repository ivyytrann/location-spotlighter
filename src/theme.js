
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h5: {
        fontFamily: 'Poppins', 
        fontWeight: 600, 
        color: '#3F7652',
      },
    h6: {
        fontFamily: 'Poppins', 
        fontWeight: 200, 
      },
    body2: {
        fontFamily: 'Poppins', 
        fontWeight: 200, 
      },
    body: {
        fontFamily: 'Poppins', 
        fontWeight: 200, 
      },
  },
  palette: {
    primary:  {
        main: '#3F7652'
    },
  },
});

export default theme;
