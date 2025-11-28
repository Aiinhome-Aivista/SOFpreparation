import { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/Cards";
import { Badge } from "../../ui/Badge";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui-common/Tab";

import {
  Upload,
  FileText,
  Video,
  Image as ImageIcon,
  Download,
  Trash2,
  Search,
  X,
} from "lucide-react";

export default function AdminResourceLibrary() {
  const toast = useRef(null);

  // ========================
  // Resource Data
  // ========================
  const [resources, setResources] = useState([
    {
      id: "1",
      title: "Science Olympiad Preparation Guide",
      type: "pdf",
      category: "Study Material",
      grade: "7",
      subject: "Science",
      uploadedDate: "2024-10-15",
      size: "2.3 MB",
      uploadedBy: "Admin",
      downloads: 145,
    },
    {
      id: "2",
      title: "Mathematics Problem Solving",
      type: "video",
      category: "Video Lecture",
      grade: "6",
      subject: "Mathematics",
      uploadedDate: "2024-10-20",
      size: "45 MB",
      uploadedBy: "Admin",
      downloads: 89,
    },
    {
      id: "3",
      title: "Physics Formulas Chart",
      type: "image",
      category: "Reference",
      grade: "8",
      subject: "Science",
      uploadedDate: "2024-11-01",
      size: "1.2 MB",
      uploadedBy: "Admin",
      downloads: 203,
    },
  ]);

  // ========================
  // Filters
  // ========================
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSubject, setFilterSubject] = useState(null);

  const gradeOptions = [
    { label: "All Grades", value: null },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
  ];

  const subjectOptions = [
    { label: "All Subjects", value: null },
    { label: "Science", value: "Science" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "English", value: "English" },
    { label: "General Knowledge", value: "General Knowledge" },
  ];

  const filteredResources = resources.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchGrade = !filterGrade || r.grade === filterGrade;
    const matchSubject = !filterSubject || r.subject === filterSubject;

    return matchSearch && matchGrade && matchSubject;
  });

  // ========================
  // Upload Dialog
  // ========================
  const [showUpload, setShowUpload] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "pdf",
    category: "",
    grade: null,
    subject: null,
    file: null,
  });

  const fileInputRef = useRef(null);

  const handleFilePick = (e) => {
    if (e.target.files?.[0]) {
      setNewResource({ ...newResource, file: e.target.files[0] });
      toast.current.show({
        severity: "success",
        summary: "File Selected",
        detail: e.target.files[0].name,
      });
    }
  };

  const handleUploadResource = () => {
    if (
      !newResource.title ||
      !newResource.category ||
      !newResource.subject ||
      !newResource.grade ||
      !newResource.file
    ) {
      toast.current.show({
        severity: "error",
        summary: "Missing Fields",
        detail: "All fields are required",
      });
      return;
    }

    const fileSizeMB = (newResource.file.size / (1024 * 1024)).toFixed(1);

    const resource = {
      id: Math.random().toString(36).slice(2),
      title: newResource.title,
      type: newResource.type,
      category: newResource.category,
      grade: newResource.grade,
      subject: newResource.subject,
      uploadedDate: new Date().toISOString().split("T")[0],
      size: `${fileSizeMB} MB`,
      uploadedBy: "Admin",
      downloads: 0,
    };

    setResources([resource, ...resources]);
    setShowUpload(false);

    setNewResource({
      title: "",
      type: "pdf",
      category: "",
      grade: null,
      subject: null,
      file: null,
    });

    toast.current.show({
      severity: "success",
      summary: "Uploaded",
      detail: `${resource.title} added.`,
    });
  };

  // ========================
  // Delete
  // ========================
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteResource = () => {
    setResources(resources.filter((r) => r.id !== selected.id));
    setConfirmDeleteVisible(false);

    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: `${selected.title} was removed.`,
    });
  };

  // ========================
  // Icons by Type
  // ========================
  const getIcon = (type) => {
    if (type === "pdf" || type === "document")
      return <FileText className="size-5 text-red-600" />;
    if (type === "video") return <Video className="size-5 text-purple-600" />;
    if (type === "image") return <ImageIcon className="size-5 text-blue-600" />;
    return <FileText className="size-5 text-gray-600" />;
  };

  // ========================
  // Resource Card Renderer
  // ========================
  function renderResourceCard(r) {
    return (
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <div className="bg-gray-50 rounded-lg p-3">{getIcon(r.type)}</div>

          <div className="flex-1">
            <h4 className="text-blue-900">{r.title}</h4>

            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-blue-50 border-2 border-blue-200">
                Grade {r.grade}
              </Badge>
              <Badge className="bg-green-50 border-2 border-green-200">
                {r.subject}
              </Badge>
              <Badge className="bg-purple-50 border-2 border-purple-200">
                {r.category}
              </Badge>
            </div>

            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span>{r.size}</span>
              <span>•</span>
              <span>{r.downloads} downloads</span>
              <span>•</span>
              <span>{new Date(r.uploadedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-200 rounded-md">
            <Download className="size-4" />
          </button>

          <button
            onClick={() => {
              setSelected(r);
              setConfirmDeleteVisible(true);
            }}
            className="p-2 hover:bg-gray-200 rounded-md"
          >
            <Trash2 className="size-4 text-red-600" />
          </button>
        </div>
      </div>
    );
  }

  // ========================
  // TABS + FILTERED LIST
  // ========================
  const tabsData = [
    { value: "all", label: "All", filter: (r) => true },
    { value: "pdf", label: "PDFs", filter: (r) => r.type === "pdf" },
    { value: "video", label: "Videos", filter: (r) => r.type === "video" },
    { value: "image", label: "Images", filter: (r) => r.type === "image" },
  ];

  return (
    <div className="space-y-6">
      <Toast ref={toast} />

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-900">Resource Library</CardTitle>
              <CardDescription>
                Upload and manage educational resources
              </CardDescription>
            </div>

            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Upload className="size-4" />
              Upload Resource
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search + Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <InputText
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                  placeholder="Search resources..."
                />
              </div>
            </div>

            {/* Grade */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Grade</label>
              <Dropdown
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.value)}
                options={gradeOptions}
                optionLabel="label"
                placeholder="All Grades"
                className="w-full"
                showClear
              />
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Subject</label>
              <Dropdown
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.value)}
                options={subjectOptions}
                optionLabel="label"
                placeholder="All Subjects"
                className="w-full"
                showClear
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-blue-50 border-blue-100">
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-xl font-semibold text-blue-900">
                {resources.length}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-red-50 border-red-100">
              <p className="text-sm text-gray-600">PDFs</p>
              <p className="text-xl font-semibold text-red-900">
                {resources.filter((r) => r.type === "pdf").length}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-purple-50 border-purple-100">
              <p className="text-sm text-gray-600">Videos</p>
              <p className="text-xl font-semibold text-purple-900">
                {resources.filter((r) => r.type === "video").length}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-green-50 border-green-100">
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-xl font-semibold text-green-900">
                {resources.reduce((acc, r) => acc + r.downloads, 0)}
              </p>
            </div>
          </div>

          {/* TABS + RESOURCE LIST */}
          
          <Tabs defaultValue="all" className="mt-4">
            <TabsList>
              {tabsData.map((tab) => {
                const count = filteredResources.filter(tab.filter).length;
                return (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabsData.map((tab) => {
              const list = filteredResources.filter(tab.filter);

              return (
                <TabsContent key={tab.value} value={tab.value} className="mt-4">
                  {list.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <FileText className="size-12 mx-auto mb-3 text-gray-300" />
                      No {tab.label.toLowerCase()} found
                    </div>
                  ) : (
                    list.map((r) => (
                      <Card
                        key={r.id}
                        className="hover:shadow-md mb-3 border border-gray-300"
                      >
                        <CardContent className="p-4">
                          {renderResourceCard(r)}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog
        visible={showUpload}
        onHide={() => setShowUpload(false)}
        header="Upload Resource"
        className="w-[90%] md:w-[35%]"
      >
        <div className="p-4">
          {/* File Input */}
          <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFilePick}
              accept=".pdf,.doc,.png,.jpg,.jpeg,.mp4"
            />

            <Upload className="size-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600 mb-2">
              Drag & drop file or click to browse
            </p>

            <button
              className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </button>

            {newResource.file && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <FileText className="size-4 text-green-600" />
                <p className="text-green-600">{newResource.file.name}</p>
                <button
                  className="p-1"
                  onClick={() => setNewResource({ ...newResource, file: null })}
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium">Title *</label>
              <InputText
                className="w-full"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource({ ...newResource, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Type *</label>
              <Dropdown
                value={newResource.type}
                onChange={(e) =>
                  setNewResource({ ...newResource, type: e.value })
                }
                options={[
                  { label: "PDF", value: "pdf" },
                  { label: "Document", value: "document" },
                  { label: "Video", value: "video" },
                  { label: "Image", value: "image" },
                ]}
                optionLabel="label"
                placeholder="Select Type"
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Category *</label>
              <InputText
                className="w-full"
                value={newResource.category}
                onChange={(e) =>
                  setNewResource({ ...newResource, category: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Grade *</label>
              <Dropdown
                value={newResource.grade}
                onChange={(e) =>
                  setNewResource({ ...newResource, grade: e.value })
                }
                options={gradeOptions.slice(1)}
                optionLabel="label"
                placeholder="Select Grade"
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Subject *</label>
              <Dropdown
                value={newResource.subject}
                onChange={(e) =>
                  setNewResource({ ...newResource, subject: e.value })
                }
                options={subjectOptions.slice(1)}
                optionLabel="label"
                placeholder="Select Subject"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setShowUpload(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleUploadResource}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Upload Resource
            </button>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        visible={confirmDeleteVisible}
        onHide={() => setConfirmDeleteVisible(false)}
        message="Are you sure you want to delete this resource?"
        header="Confirm Delete"
        icon="pi pi-exclamation-triangle"
        accept={deleteResource}
        reject={() => setConfirmDeleteVisible(false)}
      />
    </div>
  );
}
