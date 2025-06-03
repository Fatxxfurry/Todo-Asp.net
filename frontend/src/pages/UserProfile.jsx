import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { ArrowLeft } from "lucide-react";

const UserProfile = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  // Tạo URL hình ảnh hoặc fallback
  const avatarUrl = user?.imgName
    ? `http://127.0.0.1:5000/images/${user.imgName}`
    : null;
  const avatarInitial = user?.userName
    ? user.userName.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")} // Sửa từ /home thành /
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
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <p className="mt-1 text-lg text-gray-900">
              {user?.userName || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-lg text-gray-900">{user?.email || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <p className="mt-1 text-lg text-gray-900">{user?.role || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <p className="mt-1 text-lg text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Updated At
            </label>
            <p className="mt-1 text-lg text-gray-900">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
