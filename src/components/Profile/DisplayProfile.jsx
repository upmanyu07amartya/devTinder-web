import React from "react";

const DisplayProfile = ({ user }) => {
  return (
    <div className="flex gap-16 items-start">
      {/* Profile Image */}
      <div className="avatar">
        <div className="w-52 rounded-full">
          <img src={user?.profileImageUrl} alt="Profile" />
        </div>
      </div>

      {/* User Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-5">User Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">First Name</p>
            <p>{user?.firstName}</p>
          </div>

          <div>
            <p className="font-semibold">Last Name</p>
            <p>{user?.lastName}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p className="font-semibold">Age</p>
            <p>{user?.age}</p>
          </div>

          <div>
            <p className="font-semibold">Gender</p>
            <p>{user?.gender}</p>
          </div>

          <div>
            <p className="font-semibold">Skills</p>
            <div className="flex gap-2 flex-wrap mt-1">
              {user?.skills?.map((skill) => (
                <span key={skill} className="badge badge-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <p className="font-semibold">About</p>
          <p className="mt-1">{user?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
