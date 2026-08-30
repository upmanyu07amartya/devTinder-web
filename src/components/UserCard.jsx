import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, description, profileImageUrl } =
    user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
