import { useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [bal, setBal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    } else {
      // Fetch balance if token exists
      axios
        .get("https://paytm-like-app-6cs3.onrender.com" + "/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          setBal(response.data.balance);
        })
        .catch((error) => {
          navigate("/signin");
        });
    }
  }, [navigate]);

  return (
    <div>
      <div className="flex flex-col py-10 px-16 h-screen overflow-y-auto w-full">
        <div className="flex space-x-8 py-6 justify-center ">
          <div className="flex flex-col rounded-md border lg:w-[600px] lg:h-[350px] p-8 justify-center shadow-lg">
            <div className="font-bold lg:text-6xl">Your balance</div>
            <p className="text-[#f36b6b] lg:text-4xl m-3 font-bold">Rs {bal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// <div className="m-8">
//         <Balance value={bal} />
//       </div>