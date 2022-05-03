import React from "react";
import FormCard from "./components/FormCard";
import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import ButtonAppBar from "./components/AppBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import EstateList from "./components/EstatesList";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import MaterialLayout from "./components/Layout/MaterialLayout";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { theme, useStyle } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EstateList />} />
          <Route path="chci-nabidku" element={<FormCard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  const classes = useStyle();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "#e3f2fd" }}>
          <ResponsiveAppBar />
          <CssBaseline />
          <Container
            sx={{
              display: "flex",
              minHeight: "100vh",
              flexDirection: "column",
            }}
          >
            <Box my={3} className={classes.root}>
              <Outlet />
            </Box>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
