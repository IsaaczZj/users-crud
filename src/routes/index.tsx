import { BrowserRouter, Route, Routes } from "react-router";
import CreateUser from "../pages/CreateUser";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}
