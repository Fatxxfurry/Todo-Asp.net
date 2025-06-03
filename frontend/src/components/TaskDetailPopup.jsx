import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Tag,
  Calendar,
  Flag,
  FileText,
  List,
  CheckCircle,
} from "lucide-react";

const TaskDetailPopup = ({ task, isOpen, onClose }) => {
  // Danh sách danh mục giả lập (thay bằng API nếu cần)
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Project" },
    { id: 3, name: "Personal" },
  ];

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
      case "Completed":
        return "text-emerald-600 bg-emerald-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!task) return null;

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
              <h2 className="text-2xl font-bold text-gray-900">Task Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <FileText className="inline h-5 w-5 mr-2" />
                  Title
                </label>
                <p className="mt-1 text-gray-900">{task.name}</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <List className="inline h-5 w-5 mr-2" />
                  Description
                </label>
                <p className="mt-1 text-gray-900">
                  {task.description || "No description"}
                </p>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Flag className="inline h-5 w-5 mr-2" />
                  Priority
                </label>
                <span
                  className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityStyles(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <List className="inline h-5 w-5 mr-2" />
                  Category
                </label>
                <p className="mt-1 text-gray-900">{categoryName}</p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Tag className="inline h-5 w-5 mr-2" />
                  Tags
                </label>
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
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Due Date
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(task.dueDate).toLocaleString() || "No due date"}
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <CheckCircle className="inline h-5 w-5 mr-2" />
                  Status
                </label>
                <span
                  className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailPopup;
