import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogCategory() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // 1️⃣ Load category
      const { data: cat, error: catError } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (catError || !cat) {
        setLoading(false);
        return;
      }

      setCategory(cat);

      // 2️⃣ Load blogs under this category
      const { data: blogData } = await supabase
        .from("blogs")
        .select("*")
        .eq("category_id", cat.id)
        .order("created_at", { ascending: false });

      setBlogs(blogData || []);
      setLoading(false);
    };

    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      {/* Wider container so 4 cards fit */}
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">{category?.title}</h1>

        {/* ✅ Responsive Grid: 1 → 2 → 3 → 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
            >
              {/* 🖼️ Cover Image */}
              {blog.cover_image && (
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
              )}

              {/* 📄 Content */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {blog.excerpt || "Click to read details"}
                </p>

                <div className="flex justify-end">
                  <Link
                    to={`/blog/post/${blog.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {blogs.length === 0 && (
          <p className="text-center text-gray-500 mt-20">
            No blogs found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
