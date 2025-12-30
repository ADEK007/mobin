import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Blog() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setCategories(data || []);
      }

      setLoading(false);
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="pt-28 text-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          My <span className="text-purple-600">Blog</span>
        </h1>

        {/* GRID: max 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/blog/${cat.slug}`}
              className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* 🖼️ Portrait Image Container */}
              <div className="w-full h-[420px] bg-gray-100 flex items-center justify-center">
                <img
                  src={cat.thumbnail_url || "/no-image.jpg"}
                  alt={cat.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* 📄 Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-900">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
