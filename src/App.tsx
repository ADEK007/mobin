import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import BlogDetails from "./pages/BlogDetails";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import CreateBlog from "./pages/admin/CreateBlog";
import CreateCategory from "./pages/admin/CreateCategory";
import ManageBlogs from "./pages/admin/ManageBlogs";
import EditBlog from "./pages/admin/EditBlog";
import ContactMessages from "./pages/admin/ContactMessages";
import ManageCV from "./pages/admin/ManageCV";

import NotFound from "./pages/NotFound";
import Toast from "./components/Toast";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router basename="/mobin">
        <AnimatePresence mode="wait">
          <Routes>
            {/* 🌍 Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogCategory />} />
              <Route path="/blog/post/:id" element={<BlogDetails />} />
            </Route>

            {/* 🔐 Admin Layout */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs"
                element={
                  <ProtectedRoute>
                    <ManageBlogs />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/create-blog"
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit-blog/:id"
                element={
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/create-category"
                element={
                  <ProtectedRoute>
                    <CreateCategory />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/contact-messages"
                element={
                  <ProtectedRoute>
                    <ContactMessages />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/manage-cv"
                element={
                  <ProtectedRoute>
                    <ManageCV />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* ❌ GLOBAL 404 — NO SIDEBAR */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>

        <Toast />
      </Router>
    </ToastProvider>
  );
}

export default App;
