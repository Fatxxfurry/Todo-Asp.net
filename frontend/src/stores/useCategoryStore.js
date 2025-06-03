import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,

  fetchUserCategories: async (userId) => {
    const categories = [];
    set({ loading: true });
    try {
      const response = await axios.get(`/user/${userId}/categories`);
      set({ categories: response.data, loading: false });
    } catch (error) {
      toast.error("Failed to fetch categories");
      set({ loading: false });
    }
  },

  addCategory: async (categoryName) => {
    set({ loading: true });
    try {
      const response = await axios.post("/category", { name: categoryName });
      set((state) => ({
        categories: [...state.categories, response.data],
        loading: false,
      }));
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Failed to add category");
      set({ loading: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await axios.delete(`/category/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter(
          (category) => category.id !== categoryId
        ),
        loading: false,
      }));
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category");
      set({ loading: false });
    }
  },

  updateCategory: async (categoryId, categoryName) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/category/${categoryId}`, {
        name: categoryName,
      });
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === categoryId ? response.data : category
        ),
        loading: false,
      }));
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Failed to update category");
      set({ loading: false });
    }
  },
}));

