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
  TrendingUp
} from "lucide-react";

export default function CreateBlog() {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [slug, setSlug] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Initialize Quill modules
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("blog_categories")
        .select("*")
        .order("title");
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  // Generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .slice(0, 100);
    setSlug(generatedSlug);
  }, [title]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelect(file);
    }
  };

  const handleImageSelect = (file: File) => {
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !categoryId) {
      alert("📝 Please fill in all required fields!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      let imageUrl = "";

      // Upload cover image if exists
      if (image) {
        const fileName = `blogs/${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      // Insert blog post
      const { error: insertError } = await supabase.from("blogs").insert([
        {
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
          content,
          category_id: categoryId,
          cover_image: imageUrl,
          published_at: new Date().toISOString(),
          status: 'published',
          read_time: Math.ceil(content.split(/\s+/).length / 200) + ' min read'
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("");
        setContent("");
        setCategoryId("");
        setImage(null);
        setImagePreview(null);
        setSuccess(false);
      }, 2000);

    } catch (err: any) {
      alert(`❌ Error: ${err.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.id === categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 text-lg">
            Share your knowledge with the world 🌍
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Title Input */}
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Type className="w-5 h-5 text-blue-500" />
                  Blog Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Catchy title that grabs attention..."
                  className="w-full px-6 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 hover:border-blue-300"
                />
                
                {/* Auto-generated Slug */}
                {title && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>Slug:</span>
                    <code className="px-3 py-1 bg-gray-100 rounded-lg font-mono">
                      yourblog.com/{slug || 'generating...'}
                    </code>
                  </div>
                )}
              </div>

              {/* Category Selector */}
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Tag className="w-5 h-5 text-purple-500" />
                  Category
                </label>
                <div className="relative">
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none appearance-none bg-white transition-all duration-300 hover:border-purple-300"
                  >
                    <option value="">Choose a category...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-lg" />
                  </div>
                </div>

                {/* Selected Category Preview */}
                {selectedCategory && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    {selectedCategory.thumbnail_url && (
                      <img
                        src={selectedCategory.thumbnail_url}
                        alt={selectedCategory.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-purple-800">{selectedCategory.title}</h4>
                      <p className="text-sm text-purple-600">{selectedCategory.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Editor */}
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  Blog Content
                </label>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-300">
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    theme="snow"
                    placeholder="Start writing your amazing content here..."
                    className="min-h-[400px]"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <ImageIcon className="w-5 h-5 text-orange-500" />
                  Cover Image
                </label>
                
                {imagePreview ? (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-xl border-2 border-orange-200">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium">Click to change or drag new image</span>
                      </div>
                    </div>
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 ${dragActive ? 'border-orange-500' : 'border-dashed border-gray-300'} rounded-xl p-12 text-center transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 group cursor-pointer`}
                  >
                    <div className="space-y-4">
                      <div className="inline-flex p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                        <Upload className={`w-10 h-10 ${dragActive ? 'text-orange-500' : 'text-orange-400'} transition-colors duration-300`} />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {dragActive ? "🎉 Drop your image here!" : "Drag & drop cover image"}
                        </p>
                        <p className="text-gray-600 mt-2">
                          or <span className="text-orange-500 font-medium">click to browse</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-3">
                          Recommended: 1200x630px • Max 5MB
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e.target.files?.[0]!)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                  loading
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                    : success
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Publishing Your Blog...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Blog Published Successfully! 🎉
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Publish Blog Post
                  </>
                )}
              </button>

              {/* Success Message */}
              {success && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center animate-bounce">
                  <p className="text-green-700 font-medium">
                    ✨ Your blog is live! Redirecting to editor...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Content Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Characters</span>
                  <span className="font-bold text-blue-600">{content.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Words</span>
                  <span className="font-bold text-blue-600">{content.split(/\s+/).filter(Boolean).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Read Time</span>
                  <span className="font-bold text-blue-600">
                    {Math.ceil(content.split(/\s+/).length / 200)} minutes
                  </span>
                </div>
                <div className="pt-4 border-t border-blue-100">
                  <div className="text-sm text-gray-500">
                    {content.length > 0 ? "Great content! 🚀" : "Start writing..."}
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Writing Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Start with a compelling hook</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Use short paragraphs for readability</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Add relevant images to break text</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Include a clear call-to-action</span>
                </li>
              </ul>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 border border-pink-100 shadow-lg">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                <Palette className="w-5 h-5 text-pink-500" />
                Live Preview
              </h3>
              <div className="space-y-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                {title && (
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-800 truncate">{title}</h4>
                    {selectedCategory && (
                      <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        <Tag className="w-3 h-3" />
                        {selectedCategory.title}
                      </div>
                    )}
                  </div>
                )}
                {!title && !imagePreview && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Start writing to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}