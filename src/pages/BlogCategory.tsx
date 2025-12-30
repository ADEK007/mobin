import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogCategory() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data: cat } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("slug", slug)
        .single();

      setCategory(cat);

      if (!cat) return;

      const { data: blogData } = await supabase
        .from("blogs")
        .select("*")
        .eq("category_id", cat.id)
        .order("created_at", { ascending: false });

      setBlogs(blogData || []);
    };

    load();
  }, [slug]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">
          {category?.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {blog.cover_image
 && (
                <img
                  src={blog.cover_image
}
                  className="w-full h-80 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {blog.excerpt || "Click to read details"}
                </p>

                <div className="flex justify-end">
                  <Link
                    to={`/blog/post/${blog.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
