import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { PaymentStatus } from "./pages/PaymentStatus.jsx";
import Home from "./pages/Home.jsx";
import OtherUserList from "./pages/OtherUserList.jsx";
import {TransactionHistory} from "./pages/TransactionHistory.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/home/send" element={<SendMoney />} />
              <Route path="/home/userslist" element={<OtherUserList />} />
              <Route path="/home/transactions" element={<TransactionHistory />} />
          </Route>
          <Route path="/paymentstatus" element={<PaymentStatus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;