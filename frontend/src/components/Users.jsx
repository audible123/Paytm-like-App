import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://paytm-like-app-6cs3.onrender.com" + "/api/v1/user/bulk?filter=" + filter
      )
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="m-10">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="mt-4 mb-10">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="lg:w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl xs:text-xs">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full ">
          <div className="xs: text-xs">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={(e) => {
            navigate("/home/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
