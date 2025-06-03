import { useState } from "react";
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
  const [activeSection, setActiveSection] = useState("All Tasks");
  const [activeCategory, setActiveCategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentUpcomingTab, setCurrentUpcomingTab] = useState("Today");
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

  const categoryMap = {
    Personal: 1,
    Work: 2,
    "List 1": 3,
  };

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
        id: 6,
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
        id: 4,
        name: "Add New Task",
        completed: false,
        priority: "Low",
        description: "Create a new task for tomorrow",
        categoryId: 1,
        tagNames: ["work"],
        dueDate: "2025-06-05T10:00",
        status: "Pending",
        createdAt: "2025-06-01T10:00:00Z",
        updatedAt: "2025-06-01T10:00:00Z",
      },
      {
        id: 5,
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
        categoryId: 1,
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
        categoryId: 2,
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
        categoryId: 1,
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
        categoryId: 3,
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
        categoryId: 3,
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
        categoryId: 1,
        tagNames: ["branding"],
        dueDate: "2025-06-12T13:00",
        status: "Pending",
        createdAt: "2025-06-02T09:00:00Z",
        updatedAt: "2025-06-02T09:00:00Z",
      },
    ],
  });

  const [allTasks, setAllTasks] = useState([
    ...tasks.Today,
    ...tasks.Tomorrow,
    ...tasks["This Week"],
  ]);

  const toggleTaskCompletion = (taskId, section) => {
    if (activeSection === "All Tasks" || activeSection === "Category") {
      setAllTasks(
        allTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      setTasks({
        ...tasks,
        Today: tasks.Today.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
        Tomorrow: tasks.Tomorrow.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
        "This Week": tasks["This Week"].map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      });
    } else {
      setTasks({
        ...tasks,
        [section]: tasks[section].map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      });
      setAllTasks(
        allTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const handleDeleteTask = (taskId, section) => {
    if (activeSection === "All Tasks" || activeSection === "Category") {
      setAllTasks(allTasks.filter((task) => task.id !== taskId));
      setTasks({
        ...tasks,
        Today: tasks.Today.filter((task) => task.id !== taskId),
        Tomorrow: tasks.Tomorrow.filter((task) => task.id !== taskId),
        "This Week": tasks["This Week"].filter((task) => task.id !== taskId),
      });
    } else {
      setTasks({
        ...tasks,
        [section]: tasks[section].filter((task) => task.id !== taskId),
      });
      setAllTasks(allTasks.filter((task) => task.id !== taskId));
    }
    toast.success("Task deleted!");
  };

  const handleTaskCreated = (newTaskData) => {
    const task = {
      id: newTaskData.id || Date.now(),
      name: newTaskData.title,
      completed: false,
      priority: newTaskData.priority || "Low",
      description: newTaskData.description || "",
      categoryId: newTaskData.categoryId ? Number(newTaskData.categoryId) : 1,
      tagNames: newTaskData.tagNames || [],
      dueDate: newTaskData.dueDate || new Date().toISOString(),
      status: newTaskData.status || "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);

    let targetSection = "This Week";
    if (dueDate.toDateString() === today.toDateString()) {
      targetSection = "Today";
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      targetSection = "Tomorrow";
    }

    setAllTasks([...allTasks, task]);
    setTasks({
      ...tasks,
      [targetSection]: [...tasks[targetSection], task],
    });

    toast.success("Task created!");
    setIsModalOpen(false);
    setIsQuickAddModalOpen(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setAllTasks(
      allTasks.map((task) =>
        task.id === updatedTask.id ? { ...updatedTask } : task
      )
    );

    const dueDate = new Date(updatedTask.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);

    let targetSection = "This Week";
    if (dueDate.toDateString() === today.toDateString()) {
      targetSection = "Today";
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      targetSection = "Tomorrow";
    }

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      Object.keys(newTasks).forEach((section) => {
        newTasks[section] = newTasks[section].filter(
          (task) => task.id !== updatedTask.id
        );
      });
      newTasks[targetSection] = [
        ...newTasks[targetSection],
        { ...updatedTask },
      ];
      return newTasks;
    });

    toast.success("Task updated!");
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

  const filteredTasks =
    activeSection === "All Tasks"
      ? allTasks.filter((task) => {
          const matchesTitle = filters.title
            ? task.name?.toLowerCase().includes(filters.title.toLowerCase())
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
          const matchesTags = filters.tagNames.length
            ? filters.tagNames.every((tag) => task.tagNames?.includes(tag))
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
        })
      : activeSection === "Category" && activeCategory
      ? allTasks
          .filter((task) => task.categoryId === categoryMap[activeCategory])
          .filter((task) => {
            const matchesTitle = filters.title
              ? task.name?.toLowerCase().includes(filters.title.toLowerCase())
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
            const matchesTags = filters.tagNames.length
              ? filters.tagNames.every((tag) => task.tagNames?.includes(tag))
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
          })
      : activeSection === "Statistics"
      ? []
      : tasks[currentUpcomingTab]?.filter((task) => {
          const matchesTitle = filters.title
            ? task.name?.toLowerCase().includes(filters.title.toLowerCase())
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
          const matchesTags = filters.tagNames.length
            ? filters.tagNames.every((tag) => task.tagNames?.includes(tag))
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
        }) || [];

  const avatarUrl = user?.imgName
    ? `http://127.0.0.1:5000/images/${user?.imgName}`
    : null;
  const avatarInitial = user?.userName
    ? user.userName.slice(0, 1).toUpperCase()
    : "N/A";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setIsQuickAddModalOpen={setIsQuickAddModalOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm sm:hidden">
          <div className="px-4 py-4 flex items-center justify-between">
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

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeSection === "Category" && activeCategory && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeCategory} Tasks
            </h2>
          )}

          {activeSection === "Statistics" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Task Statistics
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Total Tasks:{" "}
                  <span className="font-medium">{allTasks.length}</span>
                </p>
                <p className="text-gray-600">
                  Completed:{" "}
                  <span className="font-medium">
                    {
                      allTasks.filter((task) => task.status === "Completed")
                        .length
                    }
                  </span>
                </p>
                <p className="text-gray-600">
                  Overdue:{" "}
                  <span className="font-medium">
                    {
                      allTasks.filter(
                        (task) =>
                          new Date(task.dueDate) < new Date() &&
                          task.status !== "Completed"
                      ).length
                    }
                  </span>
                </p>
              </div>
            </div>
          )}

          {activeSection !== "Statistics" && (
            <>
              {activeSection === "Upcoming" && (
                <div className="flex border-b border-gray-200 mb-8">
                  {Object.keys(tasks).map((section) => (
                    <button
                      key={section}
                      onClick={() => setCurrentUpcomingTab(section)}
                      className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                        currentUpcomingTab === section
                          ? "border-b-2 border-emerald-500 text-emerald-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              )}

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

              <TaskList
                tasks={filteredTasks}
                section={
                  activeSection === "Upcoming"
                    ? currentUpcomingTab
                    : activeSection
                }
                toggleTaskCompletion={toggleTaskCompletion}
                handleDeleteTask={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={handleTaskCreated}
          isQuickAdd={false}
        />
      )}

      {isQuickAddModalOpen && (
        <AddTaskModal
          isOpen={isQuickAddModalOpen}
          onClose={() => setIsQuickAddModalOpen(false)}
          onTaskCreated={handleTaskCreated}
          isQuickAdd={true}
        />
      )}

      {isFilterModalOpen && (
        <FilterTasksModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleFilterApply}
          onClear={handleFilterClear}
          currentFilters={filters}
        />
      )}

      {selectedTask && (
        <TaskDetailPopup
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={closeTaskDetail}
          onSave={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default HomePage;
