import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    } else {
      // Fetch transaction history if token exists
      axios
        .get("https://paytm-like-app-6cs3.onrender.com/api/v1/account/transactions", {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          setTransactions(response.data.transactions);
        })
        .catch((error) => {
          console.error("Error fetching transaction history:", error.message);
          navigate("/signin");
        });
    }
  }, []); // Removed navigate from the dependency array

  return (
    <div className="flex flex-col py-10 px-16 h-screen overflow-y-auto w-full">
      <div className="flex space-x-8 py-6 justify-center ">
        <div className="flex flex-col rounded-md border lg:w-[900px] p-8 justify-center shadow-lg">
          <div className="font-bold lg:text-xl mb-4 md:text-xl xs:text-xl">Transaction History</div>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index} className="mb-4 lg:text-sm md:text-xl xs:text-xs">
                <div>{transaction.transactionType === 'sent' ? 'Sent' : 'Received'}</div>
                <div>Amount: {transaction.amount}</div>
                <div>Date: {new Date(transaction.date).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
