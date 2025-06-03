import { useState } from "react";
import { Menu, Plus } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import TaskList from "../components/TaskList";
import TaskDetailPopup from "../components/TaskDetailPopup";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("Today");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

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
        status: "Pending",
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
        status: "Pending",
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
        tagNames: ["work"],
        dueDate: "2025-06-05T10:00",
        status: "Pending",
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
        status: "Pending",
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
      },
    ],
    "This Week": [
      {
        id: 8,
        name: "Add New Task",
        completed: false,
        priority: "Low",
        description: "Create a new task for this week",
        categoryId: 1,
        tagNames: ["work"],
        dueDate: "2025-06-07T10:00",
        status: "Pending",
      },
      {
        id: 9,
        name: "Research content ideas",
        completed: false,
        priority: "Medium",
        description: "Explore new content strategies",
        categoryId: 2,
        tagNames: ["research", "content"],
        dueDate: "2025-06-08T15:00",
        status: "Pending",
      },
      {
        id: 10,
        name: "Create a database of guest authors",
        completed: false,
        priority: "High",
        description: "Update author database",
        categoryId: 1,
        tagNames: ["database", "authors"],
        dueDate: "2025-06-09T12:00",
        status: "Pending",
      },
      {
        id: 11,
        name: "Renew driver's license",
        completed: false,
        priority: "Low",
        description: "Complete license renewal process",
        categoryId: 3,
        tagNames: ["personal"],
        dueDate: "2025-06-10T09:00",
        status: "Pending",
      },
      {
        id: 12,
        name: "Consult accountant",
        completed: false,
        priority: "Medium",
        description: "Discuss tax planning",
        categoryId: 3,
        tagNames: ["finance"],
        dueDate: "2025-06-11T11:00",
        status: "Pending",
      },
      {
        id: 13,
        name: "Print business card",
        completed: false,
        priority: "Low",
        description: "Order new business cards",
        categoryId: 1,
        tagNames: ["branding"],
        dueDate: "2025-06-12T13:00",
        status: "Pending",
      },
    ],
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    };
    setTasks({
      ...tasks,
      [activeSection]: [...tasks[activeSection], task],
    });
    toast.success("Task created via modal!");
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

  // Tạo URL hình ảnh hoặc fallback
  const avatarUrl = user?.imgName ? `public/avatars/${user.imgName}` : null;
  const avatarInitial = user?.userName
    ? user.userName.charAt(0).toUpperCase()
    : "?";

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

        {/* Desktop Header */}
        <div className="bg-white shadow hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Upcoming</h1>
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

          {/* Add New Task Button */}
          <div className="mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Task
            </button>
          </div>

          {/* Task List */}
          <TaskList
            tasks={tasks[activeSection]}
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
