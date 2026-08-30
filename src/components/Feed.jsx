import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log("API RESPONSE:", res.data);
    } catch (err) {
      console.error(err.response);
    }
  };
  console.log("FEED FROM REDUX:", feed);
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="mt-2 flex justify-center mb-10">
      {/* {feed?.data?.map((user) => {
        return <UserCard key={user._id} user={user} />;
      })} */}
      {feed?.data && <UserCard user = {feed.data[0]}/>}
    </div>
  );
};

export default Feed;
