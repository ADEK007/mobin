import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderPlus,
  PenTool,
  FileText,
  Mail,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

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
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
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
            to="/admin/Manage-CV"
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

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
