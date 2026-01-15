import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { BlogCategory } from "../../types/blog";

import {
  BookOpen,
  Upload,
  Image as ImageIcon,
  Tag,
  Type,
  Globe,
  X,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function CreateBlog() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ================= LOAD CATEGORIES ================= */

  useEffect(() => {
    supabase
      .from("blog_categories")
      .select("*")
      .order("title")
      .then(({ data }) => setCategories((data as BlogCategory[]) ?? []));
  }, []);

  /* ================= SLUG ================= */

  useEffect(() => {
    setSlug(
      title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 100)
    );
  }, [title]);

  /* ================= IMAGE ================= */

  const handleImageSelect = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    imagePreview && URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!title || !content || !categoryId) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      let imageUrl = "";

      if (image) {
        const fileName = `blogs/${Date.now()}-${image.name}`;
        const { error } = await supabase.storage
          .from("blog-images")
          .upload(fileName, image);

        if (error) throw error;

        imageUrl =
          supabase.storage.from("blog-images").getPublicUrl(fileName).data
            .publicUrl;
      }

      const { error } = await supabase.from("blogs").insert({
        title,
        slug,
        content,
        category_id: categoryId,
        cover_image: imageUrl,
        status: "published",
        published_at: new Date().toISOString(),
        read_time: `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
      });

      if (error) throw error;

      setSuccess(true);
      setTitle("");
      setContent("");
      setCategoryId("");
      removeImage();
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= QUILL CONFIG ================= */

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
    "video",
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex w-20 h-20 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Rich editor with image upload ✨
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Title */}
          <label className="flex gap-2 font-semibold mb-2">
            <Type /> Blog Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 text-xl border-2 rounded-xl"
            placeholder="Catchy title..."
          />

          {title && (
            <p className="text-sm text-gray-600 mt-2 flex gap-2">
              <Globe size={14} /> yourblog.com/{slug}
            </p>
          )}

          {/* Category */}
          <div className="mt-6">
            <label className="flex gap-2 font-semibold mb-2">
              <Tag /> Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-6 py-4 border-2 rounded-xl"
            >
              <option value="">Choose category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Editor */}
          <div className="mt-8">
            <label className="flex gap-2 font-semibold mb-2">
              <BookOpen /> Blog Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              theme="snow"
              className="min-h-[350px]"
            />
          </div>

          {/* Cover Image */}
          <div className="mt-8">
            <label className="flex gap-2 font-semibold mb-2">
              <ImageIcon /> Cover Image
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer">
                <Upload className="mx-auto mb-3" size={40} />
                <p>Click to upload cover image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleImageSelect(e.target.files[0])
                  }
                />
              </label>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-8 w-full py-5 rounded-xl font-bold text-lg flex justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

          {success && (
            <div className="mt-4 flex gap-2 justify-center text-green-600">
              <CheckCircle /> Blog published successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
