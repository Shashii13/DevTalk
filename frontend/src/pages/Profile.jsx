import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(userData?.name || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const res = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
    } catch (error) {
      console.log("profile update error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[400px]"
      >
        <h1 className="text-xl font-bold text-center">Edit Profile</h1>

        <img
          src={userData?.image || "https://via.placeholder.com/100"}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-green-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;