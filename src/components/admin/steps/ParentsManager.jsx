import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/Cards";
import { Badge } from "../../ui/Badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui-common/Table"; // your reusable table
import { InputText } from "primereact/inputtext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import {
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Key,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import ApiService from "../../../service/ApiService";
import { GET_APIS, POST_APIS } from "../../../../connection";
import AddParentModal from "../../../common/modal/AddParentModal.jsx";

export default function ParentsManager() {
  const toast = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [parents, setParents] = useState([]);
  const [kpis, setKpis] = useState({
    active: 0,
    premiumUsers: 0,
    suspended: 0,
    totalParents: 0,
  });

  useEffect(() => {
    fetchParentsData();
  }, []);

  const fetchParentsData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ApiService(GET_APIS.adminparentdashboardurl);
      if (response && response.isSuccess) {
        setParents(response.data.parents);
        setKpis(response.data.kpi);
      } else {
        setError(response.message || "Failed to fetch parent data.");
      }
    } catch (error) {
      setError(error.message || "Unexpected error.");
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch parent data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.parent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.parent_email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // ================================
  // Add Parent Dialog
  // ================================
  const [showAddParent, setShowAddParent] = useState(false);

  // ================================
  // Delete Confirmation
  // ================================
  const [selectedParent, setSelectedParent] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const confirmDelete = () => {
    setParents(parents.filter((p) => p.id !== selectedParent.id));
    setConfirmVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: `${selectedParent.name} removed.`,
    });
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="space-y-6">
      <Toast ref={toast} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-900">
                Parents Management
              </CardTitle>
              <CardDescription>
                Manage parent accounts and subscriptions
              </CardDescription>
            </div>

            <button
              onClick={() => setShowAddParent(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              <UserPlus className="size-4" /> Add Parent
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search + Filter */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Search */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>

              <InputText
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Parents */}
            <div className="p-4 rounded-lg border bg-blue-50 border-blue-100">
              <p className="text-sm text-gray-600">Total Parents</p>
              <p className="text-xl font-semibold text-blue-900">
                {kpis.totalParents}
              </p>
            </div>

            {/* Active */}
            <div className="p-4 rounded-lg border bg-green-50 border-green-100">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-semibold text-green-900">
                {kpis.active}
              </p>
            </div>

            {/* Suspended */}
            <div className="p-4 rounded-lg border bg-orange-50 border-orange-100">
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-xl font-semibold text-orange-900">
                {kpis.suspended}
              </p>
            </div>

            {/* Premium Users */}
            {/* <div className="p-4 rounded-lg border bg-purple-50 border-purple-100">
              <p className="text-sm text-gray-600">Premium Users</p>
              <p className="text-xl font-semibold text-purple-900">
                {kpis.premiumUsers}
              </p>
            </div> */}
          </div>

          {/* TABLE */}
          <div className="border-2 border-gray-300 rounded-lg">
            <div className="max-h-[210px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                  <TableRow className="border-bottom-2 border-gray-300">
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Children</TableHead>
                    {/* <TableHead>Subscription</TableHead> */}
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan="7" className="h-24 text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan="7" className="h-24">
                        <div className="flex flex-col items-center gap-2 text-red-500">
                          <AlertCircle className="size-7 text-red-300" />
                          Error fetching data: {error}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredParents.map((parent) => (
                      <TableRow
                        key={parent.user_id}
                        className="cursor-pointer border-bottom-2 border-gray-300"
                      >
                        <TableCell>
                          <div>
                            <p>{parent.parent_name}</p>
                            <p className="text-sm text-gray-500">
                              {parent.parent_email}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-gray-700">
                            <span className="flex items-center gap-2">
                              <Mail className="size-3" /> {parent.parent_email}
                            </span>
                            <span className="flex items-center gap-2">
                              <Phone className="size-3" /> {parent.contact}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-blue-50 border-2 border-blue-100 text-black">
                            {parent.children_count}{" "}
                            {parent.children_count === 1 ? "child" : "children"}
                          </Badge>
                        </TableCell>

                        {/* <TableCell>
                      <Badge
                        className={
                          parent.subscription_plan === "premium"
                            ? "bg-purple-100 border-0 text-purple-800"
                            : parent.subscription_plan === "basic"
                            ? "bg-blue-100 border-0 text-blue-800"
                            : "bg-gray-100 border-0 text-gray-800"
                        }
                      >
                        {parent.subscription_plan}
                      </Badge>
                    </TableCell> */}

                        <TableCell>
                          <Badge
                            className={
                              parent.is_active === 1
                                ? "bg-green-100 border-0 text-green-800"
                                : "bg-red-100 border-0 text-red-800"
                            }
                          >
                            {parent.is_active === 1 ? "active" : "suspended"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="size-3" />
                            {new Date(
                              parent.registered_date
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <button
                            onClick={() => {
                              setSelectedParent(parent);
                              setConfirmVisible(true);
                            }}
                            className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {showAddParent && (
        <AddParentModal
          visible={showAddParent}
          onClose={() => setShowAddParent(false)}
          onSuccess={fetchParentsData}
        />
      )}

      {/* DELETE CONFIRMATION */}
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message="Are you sure you want to delete this parent?"
        header="Confirm Delete"
        icon="pi pi-exclamation-triangle"
        accept={confirmDelete}
        reject={() => setConfirmVisible(false)}
        position="center"
        draggable={false}
      />
    </div>
  );
}
