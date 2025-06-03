import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { json } from "react-router-dom";

export const useTodoStore = create((set, get) => ({
  todos: [],
  fetchUserTodos: async (userId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/user/${userId}/todos`);
      set({
        todos: response.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch todos");
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
  addTodo: async (payload) => {
    set({ loading: true });
    try {
      const todoDto = {
        title: payload.title,
        description: payload.description,
        category: payload.category,
        priority: payload.priority,
        dueDate: payload.dueDate, 
        userId: payload.userId,
        categoryId: payload.categoryId,
      };
      const response = await axios.post("/todo", payload);
      set((state) => ({
        todos: [...state.todos, response.data],
        loading: false,
      }));
      toast.success("Todo added successfully!");
    } catch (error) {
      toast.error("Failed to add todo");
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
