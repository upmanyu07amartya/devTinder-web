import { useSelector } from "react-redux";
import DisplayProfile from "./DisplayProfile";
import { useState } from "react";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const user = userData?.data;
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-base-200 flex justify-center items-center py-8">
      <div className="card w-full max-w-6xl bg-base-100 shadow-2xl mb-8">
        <div className="card-body">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">Welcome {user?.firstName}</h1>

            <div className="flex gap-3">
              {!isEditing && !isEditingPassword && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditingPassword(true)}
                  >
                    Update Password
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="divider"></div>

          {isEditing ? (
            <EditProfile user={user} setIsEditing={setIsEditing} />
          ) : isEditingPassword ? (
            <EditPassword
              user={user}
              setIsEditingPassword={setIsEditingPassword}
            />
          ) : (
            <DisplayProfile user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
