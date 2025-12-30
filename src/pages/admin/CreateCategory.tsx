import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Upload, Sparkles, Tag, X, CheckCircle } from "lucide-react";

export default function CreateCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      alert("🎨 Please fill all fields and select an image!");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const fileName = `category-${Date.now()}-${image.name}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      // Insert into database
      const { error: insertError } = await supabase
        .from("blog_categories")
        .insert([
          {
            title,
            slug: title.toLowerCase().replace(/\s+/g, "-"),
            description,
            thumbnail_url: publicUrlData.publicUrl,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("");
        setDescription("");
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

  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <Tag className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create New Category
        </h1>
        <p className="text-gray-600 mt-2">Add a colorful category to organize your content</p>
      </div>

      {/* Form Container */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-purple-700">
              <Sparkles className="w-4 h-4" />
              Category Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Web Development, Design Tips, etc."
                className="w-full px-4 py-3 pl-12 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-white"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Tag className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-purple-700">
              <Sparkles className="w-4 h-4" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this category is about..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 resize-none bg-white"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-purple-700">
              <Upload className="w-4 h-4" />
              Thumbnail Image
            </label>
            
            {imagePreview ? (
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl border-2 border-purple-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
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
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-purple-500 bg-purple-50 scale-105"
                    : "border-purple-300 hover:border-purple-400 hover:bg-purple-50"
                }`}
              >
                <Upload className={`w-12 h-12 mx-auto mb-4 ${
                  dragActive ? "text-purple-500" : "text-purple-400"
                }`} />
                <p className="text-gray-700 mb-2 font-medium">
                  {dragActive ? "Drop image here!" : "Drag & drop an image or click to browse"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports JPG, PNG, WebP (Max 5MB)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="px-6 py-2 bg-purple-100 text-purple-600 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : success
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-200"
            }`}
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Category...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-6 h-6" />
                Category Created Successfully!
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Create Category
              </>
            )}
          </button>

          {/* Success Message */}
          {success && (
            <div className="animate-bounce">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-700 font-medium">
                  🎉 New category added! Redirecting...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800">Tips for great categories</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-600">
              <li>• Use descriptive titles that are easy to understand</li>
              <li>• Add a clear thumbnail that represents the category</li>
              <li>• Keep descriptions concise but informative</li>
              <li>• Avoid duplicate categories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}