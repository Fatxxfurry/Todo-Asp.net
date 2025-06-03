import { useAnalyticsStore } from "../stores/useAnalyticsStore";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import axios from "../lib/axios";
const DashboardPage = () => {
  const {
    users,
    todoCount,
    categoryCount,
    tagCount,
    fetchAnalytics,
    removeUserById,
  } = useAnalyticsStore();
  const { deleteUserById } = useUserStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      removeUserById(userId);
      console.log("User deleted", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const stats = [
    { title: "Users", count: users.length, color: "bg-blue-500" },
    { title: "Todos", count: todoCount, color: "bg-green-500" },
    { title: "Categories", count: categoryCount, color: "bg-yellow-500" },
    { title: "Tags", count: tagCount, color: "bg-pink-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-4 rounded-lg shadow ${stat.color} text-white`}
          >
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created</th>
                <th className="py-3 px-6 text-left">Todos</th>
                <th className="py-3 px-6 text-left">Categories</th>
                <th className="py-3 px-6 text-left">Tags</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{user.userName}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(user.createdAt)
                    )}
                  </td>
                  <td className="py-3 px-6">{user.amountTodo}</td>
                  <td className="py-3 px-6">{user.amountCategory}</td>
                  <td className="py-3 px-6">{user.amountTag}</td>
                  <td className="py-3 px-6">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
