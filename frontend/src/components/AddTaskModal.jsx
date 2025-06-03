import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { X, Tag, Calendar, Flag, FileText, List } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useTagStore } from "../stores/useTagStore";
import { useTodoStore } from "../stores/useTodoStore";

const AddTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const { user } = useUserStore();
  const { categories, fetchUserCategories } = useCategoryStore();
  const { tags, fetchTagsByUserId } = useTagStore();
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
    fetchUserCategories(user.id);
  }, []);

  const handleAddTag = () => {
    if (newTag.trim()) {
      const currentTags = watch("tagNames") || [];
      setValue("tagNames", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index) => {
    const currentTags = watch("tagNames") || [];
    setValue(
      "tagNames",
      currentTags.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data) => {
    try {
      const todoData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        categoryId: data.categoryId,
        userId: user.id
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FileText className="inline h-5 w-5 mr-2" />
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Task title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <List className="inline h-5 w-5 mr-2" />
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Task description"
                  rows="4"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Flag className="inline h-5 w-5 mr-2" />
                  Priority
                </label>
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  )}
                />
                {errors.priority && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.priority.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <List className="inline h-5 w-5 mr-2" />
                  Category
                </label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Tag className="inline h-5 w-5 mr-2" />
                  Tags
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {watch("tagNames")?.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
