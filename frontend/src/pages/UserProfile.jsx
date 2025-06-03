import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
const UserProfile = () => {
  const { user, updateUser, updateImage, checkAuth } = useUserStore();
  const navigate = useNavigate();
  const [newAvatar, setNewAvatar] = useState(null);
  const [newUserName, setNewUserName] = useState(user?.userName || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const avatarUrl = user?.imgName ? `public/avatars/${user.imgName}` : null;
  const avatarInitial = user?.userName
    ? user.userName.charAt(0).toUpperCase()
    : "?";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      if (newPassword) {
        await updateUser({
          id: user.id,
          userName: newUserName,
          email: newEmail,
          password: newPassword,
        });
      } else {
        await updateUser({
          id: user.id,
          userName: newUserName,
          email: newEmail,
        });
      }
      if (newAvatar) {
        const formData = new FormData();
        formData.append("image", newAvatar);
        await updateImage(user.id, formData);
      }
      await checkAuth();
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")} // S a t   /home th nh /
          className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-emerald-600 text-white text-4xl font-medium flex items-center justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{avatarInitial}</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="ml-4"
            onChange={(e) => setNewAvatar(e.target.files[0])}
          />
        </div>

        {/* User Info */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
