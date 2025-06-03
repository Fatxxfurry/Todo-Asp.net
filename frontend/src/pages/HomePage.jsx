import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Plus, Filter } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import FilterTasksModal from "../components/FilterTasksModal";
import TaskList from "../components/TaskList";
import TaskDetailPopup from "../components/TaskDetailPopup";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("Today");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    todoStatus: "",
    priorityStatus: "",
    dueDate: "",
    createdAt: "",
    updatedAt: "",
    tagNames: [],
  });

  const [tasks, setTasks] = useState({
    Today: [
      {
        id: 1,
        name: "Add New Task",
        completed: false,
        priority: "Low",
        description: "Create a new task for today",
        categoryId: 1,
        tagNames: ["work"],
        dueDate: "2025-06-04T10:00",
        status: "Pending",
        createdAt: "2025-06-01T10:00:00Z",
        updatedAt: "2025-06-01T10:00:00Z",
      },
      {
        id: 2,
        name: "Research content ideas",
        completed: false,
        priority: "Medium",
        description: "Find new topics for blog",
        categoryId: 2,
        tagNames: ["research", "content"],
        dueDate: "2025-06-04T15:00",
        status: "InProgress",
        createdAt: "2025-06-01T12:00:00Z",
        updatedAt: "2025-06-01T12:00:00Z",
      },
      {
        id: 3,
        name: "Create a database of guest authors",
        completed: false,
        priority: "High",
        description: "Compile list of potential authors",
        categoryId: 1,
        tagNames: ["database", "authors"],
        dueDate: "2025-06-05T12:00",
        status: "Pending",
        createdAt: "2025-06-02T09:00:00Z",
        updatedAt: "2025-06-02T09:00:00Z",
      },
      {
        id: 4,
        name: "Renew driver's license",
        completed: false,
        priority: "Low",
        description: "Visit DMV to renew license",
        categoryId: 3,
        tagNames: ["personal"],
        dueDate: "2025-06-06T09:00",
        status: "Completed",
        createdAt: "2025-06-03T08:00:00Z",
        updatedAt: "2025-06-03T08:00:00Z",
      },
    ],
    Tomorrow: [
      {
        id: 5,
        name: "Add New Task",
        completed: false,
        priority: "Low",
        description: "Create a new task for tomorrow",
        categoryId: 1,
        tagNames: [],
        dueDate: "2025-06-05T10:00",
        status: "Pending",
        createdAt: "2025-06-01T10:00:00Z",
        updatedAt: "2025-06-01T10:00:00Z",
      },
      {
        id: 6,
        name: "Create job posting for SEO specialist",
        completed: false,
        priority: "Medium",
        description: "Write job description for SEO role",
        categoryId: 2,
        tagNames: ["hiring", "seo"],
        dueDate: "2025-06-05T14:00",
        status: "InProgress",
        createdAt: "2025-06-01T12:00:00Z",
        updatedAt: "2025-06-01T12:00:00Z",
      },
      {
        id: 7,
        name: "Request design assets for landing page",
        completed: false,
        priority: "High",
        description: "Coordinate with design team",
        categoryId: 1,
        tagNames: ["design", "landing"],
        dueDate: "2025-06-05T16:00",
        status: "Pending",
        createdAt: "2025-06-02T09:00:00Z",
        updatedAt: "2025-06-02T09:00:00Z",
      },
    ],
    "This Week": [
      {
        id: 8,
        name: "Add New Task",
        completed: false,
        priority: "Low",
        description: "Create a new task for this week",
        categoryId: "1",
        tagNames: ["work"],
        dueDate: "2025-06-07T10:00",
        status: "Pending",
        createdAt: "2025-06-01T10:00:00Z",
        updatedAt: "2025-06-01T10:00:00Z",
      },
      {
        id: 9,
        name: "Research content ideas",
        completed: false,
        priority: "Medium",
        description: "Explore new content strategies",
        categoryId: "2",
        tagNames: ["research", "content"],
        dueDate: "2025-06-08T15:00",
        status: "InProgress",
        createdAt: "2025-06-01T12:00:00Z",
        updatedAt: "2025-06-01T12:00:00Z",
      },
      {
        id: 10,
        name: "Create a database of guest authors",
        completed: false,
        priority: "High",
        description: "Update author database",
        categoryId: "1",
        tagNames: ["database", "authors"],
        dueDate: "2025-06-09T12:00",
        status: "Pending",
        createdAt: "2025-06-02T09:00:00Z",
        updatedAt: "2025-06-02T09:00:00Z",
      },
      {
        id: 11,
        name: "Renew driver's license",
        completed: false,
        priority: "Low",
        description: "Complete license renewal process",
        categoryId: "3",
        tagNames: ["personal"],
        dueDate: "2025-06-10T09:00",
        status: "Pending",
        createdAt: "2025-06-03T08:00:00Z",
        updatedAt: "2025-06-03T08:00:00Z",
      },
      {
        id: 12,
        name: "Consult accountant",
        completed: false,
        priority: "Medium",
        description: "Discuss tax planning",
        categoryId: "3",
        tagNames: ["finance"],
        dueDate: "2025-06-11T11:00",
        status: "InProgress",
        createdAt: "2025-06-01T12:00:00Z",
        updatedAt: "2025-06-01T12:00:00Z",
      },
      {
        id: 13,
        name: "Print business card",
        completed: false,
        priority: "Low",
        description: "Order new business cards",
        categoryId: "1",
        tagNames: ["branding"],
        dueDate: "2025-06-12T13:00",
        status: "Pending",
        createdAt: "2025-06-02T09:00:00Z",
        updatedAt: "2025-06-02T09:00:00Z",
      },
    ],
  });

  const toggleTaskCompletion = (taskId, section) => {
    setTasks({
      ...tasks,
      [section]: tasks[section].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const handleDeleteTask = (taskId, section) => {
    setTasks({
      ...tasks,
      [section]: tasks[section].filter((task) => task.id !== taskId),
    });
    toast.success("Task deleted!");
  };

  const handleTaskCreated = (newTaskData) => {
    const task = {
      id: newTaskData.id || Date.now(),
      name: newTaskData.title,
      completed: false,
      priority: newTaskData.priority,
      description: newTaskData.description,
      categoryId: newTaskData.categoryId,
      tagNames: newTaskData.tagNames,
      dueDate: newTaskData.dueDate,
      status: newTaskData.status || "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks({
      ...tasks,
      [activeSection]: [...tasks[activeSection], task],
    });
    toast.success("Task created!");
    setIsModalOpen(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetail = () => {
    setSelectedTask(null);
  };

  const handleAvatarClick = () => {
    navigate("/user-profile");
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
    toast.success("Filters applied!");
  };

  const handleFilterClear = (e) => {
    e.preventDefault();
    setFilters({
      title: "",
      description: "",
      todoStatus: "",
      priorityStatus: "",
      dueDate: "",
      createdAt: "",
      updatedAt: "",
      tagNames: [],
    });
    toast.success("Filters cleared!");
    setIsFilterModalOpen(false);
  };

  // Filter tasks based on filters
  const filteredTasks = tasks[activeSection].filter((task) => {
    const matchesTitle = filters.title
      ? task.name.toLowerCase().includes(filters.title.toLowerCase())
      : true;
    const matchesDescription = filters.description
      ? task.description
          ?.toLowerCase()
          .includes(filters.description.toLowerCase())
      : true;
    const matchesStatus = filters.todoStatus
      ? task.status === filters.todoStatus
      : true;
    const matchesPriority = filters.priorityStatus
      ? task.priority === filters.priorityStatus
      : true;
    const matchesDueDate = filters.dueDate
      ? new Date(task.dueDate).toDateString() ===
        new Date(filters.dueDate).toDateString()
      : true;
    const matchesCreatedAt = filters.createdAt
      ? new Date(task.createdAt).toDateString() ===
        new Date(filters.createdAt).toDateString()
      : true;
    const matchesUpdatedAt = filters.updatedAt
      ? new Date(task.updatedAt).toDateString() ===
        new Date(filters.updatedAt).toDateString()
      : true;
    const matchesTags =
      filters.tagNames.length > 0
        ? filters.tagNames.every((tag) => task.tagNames.includes(tag))
        : true;

    return (
      matchesTitle &&
      matchesDescription &&
      matchesStatus &&
      matchesPriority &&
      matchesDueDate &&
      matchesCreatedAt &&
      matchesUpdatedAt &&
      matchesTags
    );
  });

  // Create avatar URL or fallback
  const avatarUrl = user?.imgName
    ? `http://127.0.0.1:5000/images/${user?.imgName}`
    : null;
  const avatarInitial = user?.userName
    ? user.userName.slice(0, 1).toUpperCase()
    : "N/A";

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
        <div className="bg-white shadow-sm sm:hidden">
          <div className="px-4 py-4 sm:mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <h1 className="text-2xl font-extrabold text-emerald-600">ToDo</h1>
            <div className="ml-auto">
              <button
                onClick={handleAvatarClick}
                className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-emerald-600 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{avatarInitial}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="bg-white shadow hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-4xl font-extrabold text-emerald-600">ToDo</h1>
            <button
              onClick={handleAvatarClick}
              className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-emerald-600 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{avatarInitial}</span>
              )}
            </button>
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

          {/* Add New Task and Filter Buttons */}
          <div className="mb-8 flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Task
            </button>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter Tasks
            </button>
          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            section={activeSection}
            toggleTaskCompletion={toggleTaskCompletion}
            handleDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {/* Filter Tasks Modal */}
      {isFilterModalOpen && (
        <FilterTasksModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleFilterApply}
          onClear={handleFilterClear}
          currentFilters={filters}
        />
      )}

      {/* Task Detail Popup */}
      {selectedTask && (
        <TaskDetailPopup
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={closeTaskDetail}
        />
      )}
    </div>
  );
};

export default HomePage;
