import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;

    supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      });
  }, [id]);

  const updateBlog = async () => {
    await supabase
      .from("blogs")
      .update({ title, content })
      .eq("id", id);

    navigate("/admin/blogs");
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Blog</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <ReactQuill value={content} onChange={setContent} />

      <button
        onClick={updateBlog}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Update Blog
      </button>
    </div>
  );
}
