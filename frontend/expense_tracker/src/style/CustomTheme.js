// // import { createTheme } from '@mui/material/styles';

// // const theme = createTheme({
// //   palette: {
// //     green1: "#8e9b96",
// //     green2: "#e1e8d7",
// //     green3: "#cbdcc6",
// //     green4: "#f2e8cf",
// //     green5: "#b4d7b9",
// //   },
// // });



import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#cbdcc6",
      light: "#e1e8d7",
      // dark: "#8e9b96",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

export default theme;