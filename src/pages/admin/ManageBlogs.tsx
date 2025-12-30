import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadBlogs = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("id, title, created_at")
      .order("created_at", { ascending: false });

    setBlogs(data || []);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    await supabase.from("blogs").delete().eq("id", id);
    loadBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create, edit and manage your blog posts
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/create-blog")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            + New Blog
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-gray-400">
                    No blogs found 🚀
                  </td>
                </tr>
              )}

              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <div className="font-medium text-gray-800">
                      {blog.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(blog.created_at).toDateString()}
                    </div>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}
                      className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
