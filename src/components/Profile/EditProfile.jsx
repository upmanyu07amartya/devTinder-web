import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user, setIsEditing }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [skills, setSkills] = useState(user?.skills?.join(", "));
  const [description, setDescription] = useState(user?.description);

  const handleUpdateProfile = async () => {
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          email,
          age,
          gender,
          description,
          skills: skillsArray,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-4">
      <h2 className="text-2xl font-semibold mb-8">Edit Profile</h2>

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-6">
        {/* First Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>

          <input
            type="text"
            value={firstName}
            className="input input-bordered w-full"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        {/* Last Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>

          <input
            type="text"
            value={lastName}
            className="input input-bordered w-full"
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>

          <input
            type="email"
            value={email}
            className="input input-bordered w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        {/* Age */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>

          <input
            type="number"
            value={age}
            className="input input-bordered w-full"
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>

        {/* Gender */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>

          <select
            value={gender}
            className="select select-bordered w-full"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled value="">
              Select gender
            </option>

            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </fieldset>

        {/* Skills */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>

          <input
            type="text"
            value={skills}
            className="input input-bordered w-full"
            placeholder="e.g. cricket, travel, business"
            onChange={(e) => setSkills(e.target.value)}
          />

          <p className="label">Separate skills with commas</p>
        </fieldset>
      </div>

      {/* Description */}
      <fieldset className="fieldset mt-6">
        <legend className="fieldset-legend">About</legend>

        <textarea
          className="textarea textarea-bordered w-full h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button className="btn btn-primary" onClick={handleUpdateProfile}>
          Update Profile
        </button>

        <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
