import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  todos: [],
  fetchUserTodos: async (userId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/todo/user/${userId}`);
      set({ todos: response, loading: false });
    } catch (error) {
      toast.error("Failed to fetch todos");
      set({ loading: false });
    }
  },
  deleteTodo: async (todoId) => {
    set({ loading: true });
    try {
      await axios.delete(`/todo/${todoId}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId),
        loading: false,
      }));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo");
      set({ loading: false });
    }
  },
  updateTodo: async (todoId, payload) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/todo/${todoId}`, payload);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === todoId ? { ...todo, ...response } : todo
        ),
        loading: false,
      }));
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error("Failed to update todo");
      set({ loading: false });
    }
  },
  getTodosByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/todo/category/${category}`);
      set({ todos: response, loading: false });
    } catch (error) {
      toast.error("Failed to fetch todos by category");
      set({ loading: false });
    }
  },
}));
