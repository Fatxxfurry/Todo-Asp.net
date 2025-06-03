import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  LogOut,
  BarChart2,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
  activeCategory,
  setActiveCategory,
  setIsQuickAddModalOpen,
}) => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(true);
  const [categories, setCategories] = useState([
    { name: "Personal", count: 3, color: "bg-pink-200" },
    { name: "Work", count: 3, color: "bg-cyan-200" },
    { name: "List 1", count: 3, color: "bg-yellow-200" },
  ]);
  const [tags, setTags] = useState(["Tag 1", "Tag 2"]);

  const { logout } = useUserStore();
  const navigate = useNavigate();

  const handleAddCategory = () => {
    const newCategoryName = prompt("Enter new category name:");
    if (newCategoryName) {
      setCategories([
        ...categories,
        { name: newCategoryName, count: 0, color: "bg-gray-200" },
      ]);
    }
  };

  const handleAddTag = () => {
    const newTag = prompt("Enter new tag:");
    if (newTag) {
      setTags([...tags, newTag]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-0"
      } bg-white shadow-md transition-all duration-300 flex-shrink-0 overflow-hidden overflow-y-auto h-screen`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          TASKS
        </h3>
        <ul className="mt-2 space-y-1">
          <li
            className={`flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100 cursor-pointer ${
              activeSection === "Upcoming" ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              setActiveSection("Upcoming");
              setActiveCategory(null);
            }}
          >
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Upcoming</span>
            </div>
            <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-600">
              12
            </span>
          </li>
          <li
            className={`flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100 cursor-pointer ${
              activeSection === "All Tasks" ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              setActiveSection("All Tasks");
              setActiveCategory(null);
            }}
          >
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">All Tasks</span>
            </div>
            <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-600">
              13
            </span>
          </li>
          <li
            className={`flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100 cursor-pointer ${
              activeSection === "Statistics" ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              setActiveSection("Statistics");
              setActiveCategory(null);
            }}
          >
            <div className="flex items-center">
              <BarChart2 className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Statistics</span>
            </div>
            <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-600">
              -
            </span>
          </li>
        </ul>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          CATEGORIES
        </h3>
        {categoriesExpanded && (
          <ul className="mt-2 space-y-1">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100 cursor-pointer ${
                  activeCategory === category.name &&
                  activeSection === "Category"
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setActiveSection("Category");
                }}
              >
                <div className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${category.color}`}
                  />
                  <span className="text-sm text-gray-600">{category.name}</span>
                </div>
                <span className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-600">
                  {category.count}
                </span>
              </li>
            ))}
            <li
              className="flex items-center py-2 px-2 rounded hover:bg-gray-100 cursor-pointer text-emerald-600"
              onClick={handleAddCategory}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-sm text-gray-600">Add New Category</span>
            </li>
          </ul>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            TAGS
          </h3>
          <button onClick={() => setTagsExpanded(!tagsExpanded)}>
            {tagsExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        {tagsExpanded && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${
                  index === 0 ? "bg-blue-200" : "bg-pink-200"
                } text-gray-700`}
              >
                {tag}
              </span>
            ))}
            <button
              className="text-xs bg-gray-200 rounded-full px-2 py-1 text-emerald-600 flex items-center"
              onClick={handleAddTag}
            >
              <Plus className="h-3 w-3 mr-1" />
              <span className="text-gray-600">Add Tag</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          ACTIONS
        </h3>
        <ul className="mt-2 space-y-1">
          <li
            className="flex items-center py-2 px-2 rounded hover:bg-gray-100 cursor-pointer text-emerald-600"
            onClick={() => setIsQuickAddModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm text-gray-600">Quick Add Task</span>
          </li>
        </ul>
      </div>

      <div className="p-4">
        <ul className="space-y-2">
          <li
            className="flex items-center py-2 px-2 rounded hover:bg-gray-100 cursor-pointer text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="text-sm text-gray-600">Sign out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
