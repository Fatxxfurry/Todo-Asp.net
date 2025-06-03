import { motion } from "framer-motion";
import { Trash, CheckCircle } from "lucide-react";

const TaskList = ({
  tasks,
  section,
  toggleTaskCompletion,
  handleDeleteTask,
  onTaskClick,
}) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "Low":
        return { border: "border-emerald-600", bg: "bg-emerald-100" }; // Đậm hơn
      case "Medium":
        return { border: "border-yellow-500", bg: "bg-yellow-50" }; // Giữ nguyên
      case "High":
        return { border: "border-red-600", bg: "bg-red-100" }; // Đậm hơn
      default:
        return { border: "border-gray-300", bg: "bg-white" };
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow overflow-hidden rounded-lg"
      >
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {section}
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <li className="px-4 py-4 text-center text-gray-500">
              No tasks yet
            </li>
          ) : (
            tasks.map((task) => {
              const { border, bg } = getPriorityStyles(task.priority);
              return (
                <li
                  key={task.id}
                  className={`px-4 py-4 ${bg} border-l-4 ${border} cursor-pointer hover:bg-gray-100`}
                  onClick={() => onTaskClick(task)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id, section)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                      />
                      <span
                        className={`ml-3 text-sm ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {task.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id, section);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default TaskList;
