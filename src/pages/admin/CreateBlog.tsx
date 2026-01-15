import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  Sparkles,
  CheckCircle,
  Palette,
  TrendingUp,
} from "lucide-react";

export default function CreateBlog() {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  /* ---------------- Quill ---------------- */
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  /* ---------------- Load categories ---------------- */
  useEffect(() => {
    supabase
      .from("blog_categories")
      .select("*")
      .order("title")
      .then(({ data }) => setCategories(data || []));
  }, []);

  /* ---------------- Slug ---------------- */
  useEffect(() => {
    setSlug(
      title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 100)
    );
  }, [title]);

  /* ---------------- Drag events ---------------- */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleImageSelect(file);
  };

  /* ---------------- Image ---------------- */
  const handleImageSelect = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    imagePreview && URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    if (!title || !content || !categoryId) {
      alert("📝 Please fill in all required fields!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      let imageUrl = "";

      // 🔥 Upload image
      if (image) {
        const fileName = `blogs/${Date.now()}-${image.name}`;
        const { error } = await supabase.storage
          .from("blog-images")
          .upload(fileName, image);

        if (error) throw error;

        imageUrl = supabase.storage.from("blog-images").getPublicUrl(fileName)
          .data.publicUrl;
      }

      // 🔥 Insert blog
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
      setTimeout(() => {
        setTitle("");
        setContent("");
        setCategoryId("");
        setImage(null);
        setImagePreview(null);
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex w-20 h-20 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Share your knowledge with the world 🌍
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Title */}
              <label className="flex gap-2 font-semibold mb-2">
                <Type className="text-blue-500" /> Blog Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-4 text-xl border-2 rounded-xl focus:ring-4 focus:ring-blue-100"
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
                  <Tag className="text-purple-500" /> Category
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
                  <BookOpen className="text-green-500" /> Blog Content
                </label>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  theme="snow"
                  className="min-h-[350px]"
                />
              </div>

              {/* Image Upload (FIXED) */}
              <div className="mt-8">
                <label className="flex gap-2 font-semibold mb-2">
                  <ImageIcon className="text-orange-500" /> Cover Image
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
                  <label
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`block border-2 ${
                      dragActive
                        ? "border-orange-500 bg-orange-50"
                        : "border-dashed border-gray-300"
                    } rounded-xl p-12 text-center cursor-pointer`}
                  >
                    <Upload
                      className="mx-auto text-orange-400 mb-3"
                      size={40}
                    />
                    <p className="text-lg font-medium">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Recommended: 1200×630 • Max 5MB
                    </p>
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
                className={`mt-8 w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 ${
                  loading
                    ? "bg-gray-400"
                    : success
                    ? "bg-green-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02]"
                } text-white`}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="flex gap-2 font-bold mb-4">
                <TrendingUp /> Content Stats
              </h3>
              <p>Words: {content.split(/\s+/).filter(Boolean).length}</p>
              <p>
                Read time: {Math.ceil(content.split(/\s+/).length / 200)} min
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="flex gap-2 font-bold mb-4">
                <Sparkles /> Writing Tips
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>Start with a hook</li>
                <li>Use short paragraphs</li>
                <li>Add visuals</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="flex gap-2 font-bold mb-4">
                <Palette /> Live Preview
              </h3>
              {title ? (
                <p className="font-semibold">{title}</p>
              ) : (
                <p className="text-gray-500">Start writing to preview</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
