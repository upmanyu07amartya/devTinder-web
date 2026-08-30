import axios from "axios";
import React from "react";
import { BASE_URL } from "./../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    description,
    profileImageUrl,
    _id,
  } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      if(status === "ignored") toast.success("Profile Ignored")
      else toast.success(res?.data?.message);
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      toast.error("Some error in sending request");
      console.error(err?.response?.data);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm h-135">
      <figure>
        <img src={profileImageUrl} alt="Profile Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{gender + ", " + age}</p>}
        <p>{description}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored")}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
