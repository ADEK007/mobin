import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setBlog(data));
  }, [id]);

  if (!blog) return null;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {blog.cover_image
 && (
          <img
            src={blog.cover_image
}
            className="w-full rounded mb-6"
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
