import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setSelectedUser } from "../redux/userSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const { otherUsers, selectedUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${serverUrl}/api/user/others`,
          { withCredentials: true }
        );
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log("error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="w-[300px] h-screen bg-white border-r overflow-y-auto">
      <h2 className="p-4 font-bold text-lg border-b">Chats</h2>

      {loading ? (
        <p className="p-4 text-gray-500">Loading users...</p>
      ) : (
        <>
          {!otherUsers?.length && (
            <p className="p-4 text-gray-400">No users found</p>
          )}

          {otherUsers?.map((user) => (
            <div
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`p-4 cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition ${
                selectedUser?._id === user._id ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={user.image || "https://via.placeholder.com/40"}
                alt="user"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h3 className="font-semibold">
                  {user.name || user.userName}
                </h3>
                <p className="text-sm text-gray-500">
                  Start chatting
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Sidebar;