import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { storeRequests } from "../utils/requestsSlice";
import toast from "react-hot-toast";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const [noRequests, setNoRequests] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      if (res?.data?.data?.length === 0) setNoRequests(true);

      dispatch(storeRequests(res?.data));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (status, request) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + request._id,
        {},
        { withCredentials: true },
      );
      toast.success(res?.data?.message);
      await fetchRequests();
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.error(err?.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-8 pt-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Connection Requests</h1>
        {!noRequests ? (
          <div className="space-y-5">
            {requests?.data?.map((request) => {
              const user = request.fromUserId;

              return (
                <div
                  key={request._id}
                  className="card card-side bg-base-100 shadow-xl"
                >
                  {/* Profile Image */}
                  <figure className="p-5">
                    <img
                      src={user?.profileImageUrl}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      className="w-40 h-40 object-cover rounded-xl"
                    />
                  </figure>

                  {/* User Information */}
                  <div className="card-body">
                    <h2 className="card-title text-2xl">
                      {user?.firstName} {user?.lastName}
                    </h2>

                    <p className="text-base-content/70">
                      {user?.age} years old • {user?.gender}
                    </p>

                    <p className="mt-2">{user?.description}</p>

                    {/* Skills */}
                    <div className="flex gap-2 flex-wrap mt-2">
                      {user?.skills?.map((skill) => (
                        <span key={skill} className="badge badge-primary">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-success"
                        onClick={() => handleRequest("accepted", request)}
                      >
                        Accept
                      </button>

                      <button
                        className="btn btn-error"
                        onClick={() => handleRequest("rejected", request)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card card-side bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">No new Requests!!</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
