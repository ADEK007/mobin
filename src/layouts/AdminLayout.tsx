import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderPlus,
  PenTool,
  FileText,
  Mail,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔐 Login page check
  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 z-50 w-64 h-full bg-gray-900 text-white p-5
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-purple-600" : "hover:bg-gray-700"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Create Category */}
          <NavLink
            to="/admin/create-category"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-purple-600" : "hover:bg-gray-700"
              }`
            }
          >
            <FolderPlus size={18} />
            Create Category
          </NavLink>

          {/* Create Blog */}
          <NavLink
            to="/admin/create-blog"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-purple-600" : "hover:bg-gray-700"
              }`
            }
          >
            <PenTool size={18} />
            Create Blog
          </NavLink>

          {/* Manage Blogs */}
          <NavLink
            to="/admin/blogs"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-purple-600" : "hover:bg-gray-700"
              }`
            }
          >
            <FileText size={18} />
            Manage Blogs
          </NavLink>

          {/* Contact Messages */}
          <NavLink
            to="/admin/contact-messages"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-purple-600" : "hover:bg-gray-700"
              }`
            }
          >
            <Mail size={18} />
            Contact Messages
          </NavLink>

          {/* Manage CV */}
          <NavLink
            to="/admin/manage-cv"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive ? "bg-purple-600" : "hover:bg-gray-700"
              }`
            }
          >
            <FileText size={18} />
            Manage CV
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow p-4 flex items-center">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu size={24} />
          </button>
          <h2 className="ml-4 text-xl font-bold text-gray-800">Admin Panel</h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
