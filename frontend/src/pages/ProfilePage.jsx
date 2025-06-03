import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash, CheckCircle, Menu } from "lucide-react"; // Thêm Menu vào đây
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  // State for new task input
  const [newTask, setNewTask] = useState("");
  const [activeSection, setActiveSection] = useState("Today");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [tasks, setTasks] = useState({
    Today: [
      { id: 1, name: "Add New Task", completed: false },
      { id: 2, name: "Research content ideas", completed: false },
      { id: 3, name: "Create a database of guest authors", completed: false },
      { id: 4, name: "Renew driver's license", completed: false },
    ],
    Tomorrow: [
      { id: 5, name: "Add New Task", completed: false },
      {
        id: 6,
        name: "Create job posting for SEO specialist",
        completed: false,
      },
      {
        id: 7,
        name: "Request design assets for landing page",
        completed: false,
      },
    ],
    "This Week": [
      { id: 8, name: "Add New Task", completed: false },
      { id: 9, name: "Research content ideas", completed: false },
      { id: 10, name: "Create a database of guest authors", completed: false },
      { id: 11, name: "Renew driver's license", completed: false },
      { id: 12, name: "Consult accountant", completed: false },
      { id: 13, name: "Print business card", completed: false },
    ],
  });

  const { user } = useUserStore();

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast.error("Please enter a task!");
      return;
    }
    const task = {
      id: Date.now(),
      name: newTask,
      completed: false,
    };
    setTasks({
      ...tasks,
      [activeSection]: [...tasks[activeSection], task],
    });
    setNewTask("");
    toast.success("Task added successfully!");
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (taskId, section) => {
    setTasks({
      ...tasks,
      [section]: tasks[section].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId, section) => {
    setTasks({
      ...tasks,
      [section]: tasks[section].filter((task) => task.id !== taskId),
    });
    toast.success("Task deleted!");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="bg-white shadow sm:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Upcoming</h1>
            <div className="w-6"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Desktop Header */}
        <div className="bg-white shadow hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Upcoming</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Section Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            {Object.keys(tasks).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  activeSection === section
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Add Task Form */}
          <div className="mb-8">
            <form onSubmit={handleAddTask} className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="Add New Task"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Add
              </button>
            </form>
          </div>

          {/* Tasks List */}
          <div className="space-y-8">
            {Object.entries(tasks).map(([section, sectionTasks]) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white shadow overflow-hidden rounded-lg ${
                  activeSection !== section ? "hidden" : ""
                }`}
              >
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {section}
                  </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {sectionTasks.length === 0 ? (
                    <li className="px-4 py-4 text-center text-gray-500">
                      No tasks yet
                    </li>
                  ) : (
                    sectionTasks.map((task) => (
                      <li key={task.id} className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() =>
                                toggleTaskCompletion(task.id, section)
                              }
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
                            onClick={() => handleDeleteTask(task.id, section)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
