import React from "react";
import FormCard from "./components/FormCard";
import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import ButtonAppBar from "./components/AppBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import EstateList from "./components/EstatesList";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
// import MaterialLayout from "./components/Layout/MaterialLayout";

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
  return (
    <div>
      {/* <ButtonAppBar /> */}
      <ResponsiveAppBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
