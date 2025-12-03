import { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import ApiService from "../../service/ApiService";
import { GET_APIS } from "../../../connection";
import { Pencil } from "lucide-react";

export default function EditStudentAdminModal({
  student,
  visible,
  onClose,
  onSuccess,
}) {
  const toast = useRef(null);

  const [form, setForm] = useState({
    class_grade: "",
    parent_id: "",
    account_status: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    if (student) {
      setForm({
        class_grade: student.class_grade || "",
        parent_id: student.parent_id || "",
        parent_name: student.parent_name || "",
        account_status: student.account_status === 1 ? "active" : "suspended",
      });
    }
    if (visible) {
      fetchParents();
    }
  }, [student, visible]);

  const fetchParents = async () => {
    try {
      const response = await ApiService(GET_APIS.adminparentdashboardurl);
      if (response && response.isSuccess) {
        const parentOptions = response.data.parents.map((p) => ({
          label: p.parent_name,
          value: p.user_id,
        }));
        setParents(parentOptions);
      }
    } catch (error) { }
  };

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.class_grade) newErrors.class_grade = "Grade is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.current.show({
        severity: "warn",
        detail: "Please fill in all required fields.",
      });
      return;
    }
    
  };

  const gradeOptions = Array.from({ length: 12 }, (_, i) => ({
    label: `class ${i + 1}`,
    value: i + 1,
  }));

  return (
    <Dialog header={<div className="flex items-center gap-2"><Pencil className="size-5" /> Edit Student Details</div>} visible={visible} onHide={onClose} className="w-[90%] md:w-[35%]" draggable={false}>
      <Toast ref={toast} />
      <div className="space-y-4 p-4">
        <div>
          <label className="text-sm font-medium">Student Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <InputText value={student?.student_name} className="pl-10 w-full bg-gray-100" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Student Email <span className="text-red-500">*</span></label>
          <div className="relative">
            <InputText value={student?.student_email} className="pl-10 w-full bg-gray-100" />
          </div>
        </div>

        <div><label className="text-sm font-medium">Parent <span className="text-red-500">*</span></label><Dropdown value={form.parent_id} onChange={(e) => updateField("parent_id", e.value)} options={parents} placeholder="Select a Parent" className={`w-full ${errors.parent_id ? "border-red-500" : ""}`} disabled={loading} filter />{errors.parent_id && <p className="text-red-500 text-xs mt-1">{errors.parent_id}</p>}</div>

        <div>
          <label className="text-sm font-medium">Grade <span className="text-red-500">*</span></label>
          <Dropdown value={form.class_grade} onChange={(e) => updateField("class_grade", e.value)} options={gradeOptions} placeholder="Select a Grade" className={`w-full ${errors.class_grade ? "border-red-500" : ""}`} disabled={loading} />
          {errors.class_grade && <p className="text-red-500 text-xs mt-1">{errors.class_grade}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Status <span className="text-red-500">*</span></label>
          <Dropdown value={form.account_status} onChange={(e) => updateField("account_status", e.value)} options={[{ label: "Active", value: "active" }, { label: "Suspended", value: "suspended" }]} className="w-full" disabled={loading} />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className={`px-4 py-2 cursor-pointer rounded-md text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>
            {loading ? (<span className="flex items-center gap-2"><span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>Saving...</span>) : ("Save Changes")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}