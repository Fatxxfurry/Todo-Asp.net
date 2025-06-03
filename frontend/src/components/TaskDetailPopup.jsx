import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Tag,
  Calendar,
  Flag,
  FileText,
  List,
  CheckCircle,
  Edit,
  Save,
  XCircle,
} from "lucide-react";

const TaskDetailPopup = ({ task, isOpen, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  // Danh sách danh mục giả lập
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Project" },
    { id: 3, name: "Personal" },
  ];

  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "InProgress", "Completed"];

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

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "InProgress":
        return "text-blue-600 bg-blue-100";
      case "Completed":
        return "text-emerald-600 bg-emerald-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!task) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setEditedTask((prev) => ({
      ...prev,
      tagNames: tags,
    }));
  };

  const handleDueDateChange = (e) => {
    setEditedTask((prev) => ({
      ...prev,
      dueDate: e.target.value,
    }));
  };

  const categoryName =
    categories.find((cat) => cat.id === task.categoryId)?.name || "Unknown";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Task" : "Task Details"}
              </h2>
              <div className="flex items-center space-x-2">
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit Task"
                  >
                    <Edit className="h-6 w-6" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                  title="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FileText className="inline h-5 w-5 mr-2" />
                  Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedTask.name || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{task.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <List className="inline h-5 w-5 mr-2" />
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedTask.description || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows="4"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">
                    {task.description || "No description"}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Flag className="inline h-5 w-5 mr-2" />
                  Priority
                </label>
                {isEditing ? (
                  <select
                    name="priority"
                    value={editedTask.priority || "Low"}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityStyles(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <List className="inline h-5 w-5 mr-2" />
                  Category
                </label>
                {isEditing ? (
                  <select
                    name="categoryId"
                    value={editedTask.categoryId || 1}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{categoryName}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Tag className="inline h-5 w-5 mr-2" />
                  Tags
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTask.tagNames?.join(", ") || ""}
                    onChange={handleTagsChange}
                    placeholder="Enter tags, separated by commas"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {task.tagNames && task.tagNames.length > 0 ? (
                      task.tagNames.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md text-sm"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No tags</p>
                    )}
                  </div>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Due Date
                </label>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={
                      editedTask.dueDate
                        ? new Date(editedTask.dueDate)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={handleDueDateChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleString()
                      : "No due date"}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <CheckCircle className="inline h-5 w-5 mr-2" />
                  Status
                </label>
                {isEditing ? (
                  <select
                    name="status"
                    value={editedTask.status || "Pending"}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                )}
              </div>

              {/* Edit Mode Buttons */}
              {isEditing && (
                <div className="flex space-x-2 mt-6">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailPopup;
