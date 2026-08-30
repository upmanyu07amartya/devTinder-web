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
    <div className="min-h-[calc(100vh-140px)] bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Connections</h1>

        <div className="space-y-5">
          {connections?.data?.map((user) => (
            <div
              key={user._id}
              className="card card-side bg-base-100 shadow-xl"
            >
              {/* Profile Image */}
              <figure className="p-5">
                <img
                  src={user.profileImageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-40 h-40 object-cover rounded-xl"
                />
              </figure>

              {/* User Information */}
              <div className="card-body">
                {/* Name */}
                <h2 className="card-title text-2xl">
                  {user.firstName} {user.lastName}
                </h2>

                {/* Age + Gender */}
                <p className="text-base-content/70">
                  {user.age} years old • {user.gender}
                </p>

                {/* Description */}
                <p className="mt-2">{user.description}</p>

                {/* Skills */}
                <div className="flex gap-2 flex-wrap mt-2">
                  {user.skills?.map((skill) => (
                    <span key={skill} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
