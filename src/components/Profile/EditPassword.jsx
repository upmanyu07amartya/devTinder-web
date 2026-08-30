import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

const EditPassword = ({ setIsEditingPassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsMatch =
    confirmPassword === "" || newPassword === confirmPassword;

  const handleUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/editPassword",
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        { withCredentials: true },
      );
      toast.success(res?.data?.message)
      setIsEditingPassword(false)
    } catch (err) {
      console.error(err?.response?.data);
      toast.error(err?.response?.data)
    }

    // Update password logic will go here later
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-8">Update Password</h2>

      <div className="space-y-5">
        {/* Current Password */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Current Password</legend>

          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input input-bordered w-full pr-12"
              placeholder="Enter current password"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showCurrentPassword ? "Hide" : "Show"}
            </button>
          </div>
        </fieldset>

        {/* New Password */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">New Password</legend>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full pr-12"
              placeholder="Enter new password"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
        </fieldset>

        {/* Confirm New Password */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Confirm New Password</legend>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`input input-bordered w-full pr-12 ${
                !passwordsMatch ? "input-error" : ""
              }`}
              placeholder="Confirm new password"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {!passwordsMatch && (
            <p className="text-error text-sm mt-1">
              New passwords do not match.
            </p>
          )}
        </fieldset>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          className="btn btn-primary"
          onClick={handleUpdate}
          disabled={
            !currentPassword ||
            !newPassword ||
            !confirmPassword ||
            !passwordsMatch
          }
        >
          Update Password
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => setIsEditingPassword(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPassword;
