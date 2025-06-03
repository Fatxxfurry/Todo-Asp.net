import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAnalyistStore = create((set, get) => ({
  users: [],
  todoCount: 0,
  categoryCount: 0,
  tagCount: 0,
  loading: false,
  error: null,

  fetchAnalytics: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/analytics");
      set({
        users: response.data.users,
        todoCount: response.data.todoCount,
        categoryCount: response.data.categoryCount,
        tagCount: response.data.tagCount,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch analytics");
    }
  },
}));
