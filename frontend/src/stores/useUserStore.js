import { create } from "zustand";
import { toast } from "react-hot-toast";

const MOCK_USER = {
  id: "123",
  name: "Demo User",
  email: "demo@example.com",
  password: "demo123", // Lưu mật khẩu giả lập
  token: "mock-jwt-token",
  isAdmin: false,
};

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      set({ loading: false });
      return toast.error("Invalid email format");
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      set({ loading: false });
      return toast.error("Password must be at least 6 characters");
    }

    // Giả lập delay API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Kiểm tra xem email đã tồn tại chưa
    if (users.some((u) => u.email === email)) {
      set({ loading: false });
      return toast.error("Email already exists");
    }

    // Tạo user mới
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Lưu mật khẩu giả lập (không làm điều này trong thực tế)
      token: "mock-jwt-token-" + Date.now(),
      isAdmin: false,
    };

    // Thêm user vào danh sách
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));

    set({ user: newUser, loading: false });
    toast.success("Account created successfully!");
  },

  login: async (email, password) => {
    set({ loading: true });

    // Giả lập delay API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Thêm MOCK_USER vào danh sách nếu chưa có
    if (!users.some((u) => u.email === MOCK_USER.email)) {
      users.push(MOCK_USER);
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Tìm người dùng
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      set({ user: foundUser, loading: false });
      toast.success("Logged in successfully!");
    } else {
      set({ loading: false });
      toast.error("Invalid email or password");
    }
  },

  logout: async () => {
    localStorage.removeItem("user");
    set({ user: null });
    toast.success("Logged out successfully!");
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const storedUser = localStorage.getItem("user");
    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      checkingAuth: false,
    });
  },
}));
