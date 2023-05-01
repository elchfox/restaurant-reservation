import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Reservation from "./pages/Reservation";
import ReservationDetails from "./pages/ReservationDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Reservation />} />
          <Route path="/reservation/:id" element={<ReservationDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
