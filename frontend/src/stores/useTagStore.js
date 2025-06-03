import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useTagStore = create((set, get) => ({
  tags: [],
  loading: false,
  fetchTagsByUserId: async (userId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/${userId}/tags`);
      set({ tags: response.data, loading: false });
    } catch (error) {
      toast.error("Failed to fetch tags");
      set({ loading: false });
    }
  },
  addTag: async (name) => {
    set({ loading: true });
    try {
      const response = await axios.post("/tag", { name });
      set({ tags: [...get().tags, response.data], loading: false });
      toast.success("Tag added successfully!");
    } catch (error) {
      toast.error("Failed to add tag");
      set({ loading: false });
    }
  },
  deleteTag: async (tagId) => {
    set({ loading: true });
    try {
      await axios.delete(`/tag/${tagId}`);
      set({ tags: get().tags.filter((tag) => tag.id !== tagId), loading: false });
      toast.success("Tag deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete tag");
      set({ loading: false });
    }
  },
}));
