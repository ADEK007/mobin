import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  FileText,
  Upload,
  Star,
  Trash2,
  Download,
  Eye,
  CheckCircle,
  Clock,
  File,
  RefreshCw,
  Plus,
  Award,
  Calendar,
  ExternalLink,
  AlertCircle,
  Search,
  FileUp,
  Shield,
} from "lucide-react";

interface CV {
  id: string;
  title: string;
  file_path: string;
  is_active: boolean;
  created_at: string;
  size?: number;
}

export default function ManageCV() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [search, setSearch] = useState("");

  // Load CVs
  const loadCVs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCvs(data || []);
    } catch (err) {
      console.error("Error loading CVs:", err);
      showToast("Error loading CVs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCVs();
  }, []);

  // Show toast notification
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    // Simple alert-based toast - you can replace with a proper toast library
    alert(`📝 ${message}`);
  };

  // Handle drag and drop
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

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      handleFileSelect(droppedFile);
    } else {
      showToast("Please select a PDF file", "error");
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 10 * 1024 * 1024) {
      // 10MB limit
      showToast("File size should be less than 10MB", "error");
      return;
    }
    setFile(selectedFile);
  };

  // Upload CV
  const uploadCV = async () => {
    if (!title.trim()) {
      showToast("Please provide a title", "error");
      return;
    }

    if (!file) {
      showToast("Please select a PDF file", "error");
      return;
    }

    setUploading(true);
    try {
      // Clean file name
      const cleanFileName = file.name.replace(/[^\w.-]/g, "_");
      const filePath = `cv_${Date.now()}_${cleanFileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("cv-files")
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes("already exists")) {
          throw new Error(
            "A file with this name already exists. Please rename your file."
          );
        }
        throw uploadError;
      }

      // Insert DB record
      const { error: dbError } = await supabase.from("cvs").insert([
        {
          title: title.trim(),
          file_path: filePath,
          is_active: false,
          size: file.size,
        },
      ]);

      if (dbError) {
        // Clean up uploaded file if DB insert fails
        await supabase.storage.from("cv-files").remove([filePath]);
        throw dbError;
      }

      // Reset form
      setTitle("");
      setFile(null);

      // Reload list
      await loadCVs();

      // Show success message
      showToast("CV uploaded successfully!", "success");
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast(`Error: ${err.message || "Failed to upload CV"}`, "error");
    } finally {
      setUploading(false);
    }
  };

  // Set Active CV
  const setActive = async (id: string) => {
    if (
      !window.confirm(
        "Set this CV as the active version? It will replace the current active CV."
      )
    ) {
      return;
    }

    try {
      // Deactivate all CVs first
      const { error: offError } = await supabase
        .from("cvs")
        .update({ is_active: false });

      if (offError) throw offError;

      // Activate selected CV
      const { error: onError } = await supabase
        .from("cvs")
        .update({ is_active: true })
        .eq("id", id);

      if (onError) throw offError;

      await loadCVs();
      showToast("CV set as active!", "success");
    } catch (err: any) {
      showToast(`Error: ${err.message}`, "error");
    }
  };

  // Delete CV
  const deleteCV = async (cv: CV) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${cv.title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      // Remove file from storage
      const { error: storageError } = await supabase.storage
        .from("cv-files")
        .remove([cv.file_path]);

      if (storageError) {
        // If file doesn't exist in storage, just continue with DB deletion
        console.warn(
          "File not found in storage, proceeding with DB deletion:",
          storageError
        );
      }

      // Remove row from DB
      const { error: dbError } = await supabase
        .from("cvs")
        .delete()
        .eq("id", cv.id);

      if (dbError) throw dbError;

      await loadCVs();
      showToast("CV deleted successfully", "info");
    } catch (err: any) {
      showToast(`Error: ${err.message}`, "error");
    }
  };

  // View CV
  const viewCV = async (cv: CV) => {
    try {
      const { data } = supabase.storage
        .from("cv-files")
        .getPublicUrl(cv.file_path);

      if (data?.publicUrl) {
        window.open(data.publicUrl, "_blank");
      } else {
        showToast("Unable to get CV URL", "error");
      }
    } catch (err) {
      showToast("Error viewing CV", "error");
    }
  };

  // Download CV
  const downloadCV = async (cv: CV) => {
    try {
      const { data, error } = await supabase.storage
        .from("cv-files")
        .download(cv.file_path);

      if (error) {
        showToast(`Download error: ${error.message}`, "error");
        return;
      }

      if (!data) {
        showToast("File not found", "error");
        return;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        cv.title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_") + ".pdf";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err: any) {
      showToast(`Download failed: ${err.message}`, "error");
    }
  };

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Filter CVs based on search
  const filteredCVs = cvs.filter((cv) =>
    cv.title.toLowerCase().includes(search.toLowerCase())
  );

  // Active CV
  const activeCV = cvs.find((cv) => cv.is_active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage CVs
              </h1>
              <p className="text-gray-600 mt-2">
                Upload and manage your professional curriculum vitae
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadCVs}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total CVs</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {cvs.length}
                  </h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active CV</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {activeCV ? "Yes" : "None"}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Storage Used
                  </p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {formatFileSize(
                      cvs.reduce((sum, cv) => sum + (cv.size || 0), 0)
                    )}
                  </h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <File className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Latest Update
                  </p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {cvs.length > 0 ? formatDate(cvs[0].created_at) : "—"}
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Upload New CV
                </h2>
                <p className="text-gray-600">
                  Add your latest curriculum vitae
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Award className="w-4 h-4" />
                    CV Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Professional CV 2024"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
                  />
                  <p className="text-sm text-gray-500">Required field</p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Shield className="w-4 h-4" />
                    File Requirements
                  </label>
                  <ul className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>PDF format only (.pdf)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Maximum file size: 10MB</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Include your latest experience</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - File Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <File className="w-4 h-4" />
                  PDF File *
                </label>

                {file ? (
                  <div className="bg-white rounded-xl border-2 border-green-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <FileText className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {file.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                        disabled={uploading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-dashed border-gray-300"
                    } rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover:border-blue-400 hover:bg-gray-50`}
                  >
                    <div className="space-y-4">
                      <div className="inline-flex p-4 bg-gray-100 rounded-full">
                        <Upload
                          className={`w-8 h-8 ${
                            dragActive ? "text-blue-500" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {dragActive
                            ? "🎉 Drop your PDF here!"
                            : "Drag & drop your CV"}
                        </p>
                        <p className="text-gray-600 mt-2">
                          or{" "}
                          <span className="text-blue-500 font-medium">
                            click to browse
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-3">
                          PDF files only • Max 10MB
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          handleFileSelect(selectedFile);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={uploadCV}
                disabled={uploading || !title.trim() || !file}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                  uploading || !title.trim() || !file
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
                }`}
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6" />
                    Upload CV
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search CVs by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* CV List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-semibold text-gray-700">
                    CV Details
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Upload Date
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Size
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                        <p className="text-gray-600">Loading CVs...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCVs.length > 0 ? (
                  filteredCVs.map((cv) => (
                    <tr
                      key={cv.id}
                      className={`hover:bg-gray-50 transition-colors duration-200 ${
                        cv.is_active ? "bg-yellow-50" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-3 rounded-lg ${
                              cv.is_active ? "bg-yellow-100" : "bg-gray-100"
                            }`}
                          >
                            <FileText
                              className={`w-6 h-6 ${
                                cv.is_active
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {cv.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {cv.file_path}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {cv.is_active ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                              <Star className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                              <Clock className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {formatDate(cv.created_at)}
                      </td>
                      <td className="p-4">
                        <span className="text-gray-600">
                          {formatFileSize(cv.size)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewCV(cv)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadCV(cv)}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-300"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          {!cv.is_active && (
                            <button
                              onClick={() => setActive(cv.id)}
                              className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors duration-300"
                              title="Set as Active"
                            >
                              <Star className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteCV(cv)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <div className="max-w-sm mx-auto">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {search
                            ? "No matching CVs found"
                            : "No CVs uploaded yet"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {search
                            ? "Try a different search term"
                            : "Upload your first CV to get started!"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        {activeCV && (
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-yellow-800 mb-2">Active CV</h3>
                <p className="text-yellow-700">
                  <span className="font-semibold">{activeCV.title}</span> is
                  currently set as your active CV. This is the version visitors
                  will see on your portfolio.
                </p>
                <p className="text-yellow-600 text-sm mt-2">
                  Uploaded: {formatDate(activeCV.created_at)} • Size:{" "}
                  {formatFileSize(activeCV.size)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
