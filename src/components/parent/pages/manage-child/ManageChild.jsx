import React, { useEffect, useState, useRef, useContext } from "react";
import { User, Mail, GraduationCap, MoreVertical, Loader, AlertCircle, Pencil, Trash2, School } from "lucide-react";
import ApiService from "../../../../service/ApiService";
import { POST_APIS } from "../../../../../connection";
import EditChildModal from "../../../../common/modal/EditChildModal";
import { UserContext } from "../../../../common/helper/UserContext";

const ManageChild = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const menuRef = useRef(null);
  const {childdetails, setChilddetails} = useContext(UserContext)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchChildren = async () => {
    const storedUser = localStorage.getItem('user'); 
    let parentId;
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parentId = parsedUser?.userData?.id;
      }
    } catch (e) {
      setError("User not found. Please log in again..");
      setIsLoading(false);
      return;
    }

    if (!parentId) {
      setError("User not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const payload = { parent_id: parentId };
      const response = await ApiService(POST_APIS.childdetails, { method: 'POST', body: payload });
      if (Array.isArray(response)) {
        // Correctly map API fields to UI fields
        const formattedChildren = response.map(child => ({
          ...child, name: child.student_full_name, class: `Class ${child.class_grade}`, email: child.student_email,
          school: child.school_name,
          stats: { tests:child.total_tests, avgScore:child.avg_score, completed: child.completed_tests ,pending:child.pending_tests } }));
        setChilddetails(formattedChildren);
        setError(null); 
      } else {
        setError(response.message || "Received invalid data from server.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching children details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleEditClick = (child) => {
    setSelectedChild(child);
    setIsEditModalOpen(true);
    setOpenMenuIndex(null); // Close the dropdown menu
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedChild(null);
  };

  const handleUpdateSuccess = () => {
    fetchChildren(); // Refetch children data to show updated info
  };

  return (
    <div className="w-full">
      <h2 className="text-[#1C398E] text-xl font-semibold">Manage Children</h2>
      <p className="text-[#4A5565] mb-6">
        View and manage all your children's accounts
      </p>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-blue-600" size={40} />
          <p className="ml-4 text-gray-600">Loading Children...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!isLoading && !error && childdetails.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No children have been added yet.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-6">
        {!isLoading && !error && childdetails.map((child, index) => (
          <div
            key={index}
            className="w-[380px] h-[250px] bg-white p-6 rounded-2xl shadow-md border border-gray-100 relative hover:shadow-lg transition-shadow duration-200"
          >
            {/* 3-dots */}
            <div className="absolute top-4 right-4" ref={openMenuIndex === index ? menuRef : null}>
              <button onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <MoreVertical size={20} />
              </button>
              {openMenuIndex === index && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl z-10 border border-gray-100">
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <button onClick={() => handleEditClick(child)} className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Pencil size={16} />
                        Edit
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-green-400 flex items-center justify-center shadow">
                <User className="text-white" size={28} />
              </div>

              <div>
                <h3 className="text-[#1C398E] text-lg font-semibold">
                  {child.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                  <GraduationCap className="text-green-600" size={17} />
                  <span>{child.class}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                  <School className="text-yellow-600" size={17} />
                  <span>{child.school}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <Mail className="text-blue-600" size={17} />
                  <span>{child.email}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute bottom-6 left-0 w-full px-6">
              <div className="grid grid-cols-4 text-center text-sm">
                <div>
                  <p className="text-blue-600 font-bold text-base">{child.stats.tests}</p>
                  <p className="text-gray-500 text-xs"> Total Tests</p>
                </div>
                 <div>
                  <p className="text-blue-600 font-bold text-base">{child.stats.completed}</p>
                  <p className="text-gray-500 text-xs"> Completed</p>
                </div>
                 <div>
                  <p className="text-orange-600 font-bold text-base">{child.stats.pending}</p>
                  <p className="text-gray-500 text-xs">Pending</p>
                </div>
                <div>
                  <p className="text-green-600 font-bold text-base">{parseFloat(child.stats.avgScore || 0).toFixed(2)}%</p>
                  <p className="text-gray-500 text-xs">Avg Score</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <EditChildModal
          child={selectedChild}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>


  );
};

export default ManageChild;
