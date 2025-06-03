import { AnimatePresence, motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useTagStore } from "../stores/useTagStore";
import { useTodoStore } from "../stores/useTodoStore";

const AddTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const { user } = useUserStore();
  const { categories, fetchUserCategories } = useCategoryStore();
  const { addTodo } = useTodoStore();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "Low",
      categoryId: "",
      tagNames: [],
      dueDate: "",
    },
  });
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (isOpen) fetchUserCategories(user.id);
  }, [isOpen, user.id]);

  const onSubmit = async (data) => {
    try {
      alert(JSON.stringify(data));
      const todoData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        categoryId: data.categoryId,
        userId: user.id,
      };
      const response = await addTodo(todoData);
      toast.success("Task created successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const priorities = ["Low", "Medium", "High"];
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "Low":
        return "text-emerald-600 bg-emerald-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "High":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 overflow-y-auto"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Add Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                {...register("title")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                {...register("priority")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("categoryId")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                {...register("tagNames")}
                placeholder="Enter tags, separated by commas"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="datetime-local"
                {...register("dueDate")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Create Task
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default AddTaskModal;