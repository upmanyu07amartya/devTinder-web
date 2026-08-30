import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div>
      {connections?.data?.map((user) => (
        <p key={user._id}>{user.firstName}</p>
      ))}
    </div>
  );
};

export default Connections;
