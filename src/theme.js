import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: red[50],
      main: red[500],
      dark: red[900],
    }
  },
  typography: {
    "fontFamily": `"Times New Roman", Times, serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "h1":{
      "fontFamily": `"Times New Roman", Times, serif`,
      "fontWeight": 600,
    },
    "h4":{
      "fontFamily": `"Times New Roman", Times, serif`,
      "fontWeight": 500,
    }
   }
});

export default theme;
