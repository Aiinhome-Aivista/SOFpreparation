import { useState, useRef } from "react";
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
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
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
} from "lucide-react";

export default function ParentsManager() {
  const toast = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState(null);

  const subscriptionOptions = [
    { label: "Free", value: "free" },
    { label: "Basic", value: "basic" },
    { label: "Premium", value: "premium" },
  ];

  const [parents, setParents] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      registeredDate: "2024-01-15",
      childrenCount: 2,
      status: "active",
      subscription: "premium",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43211",
      registeredDate: "2024-02-20",
      childrenCount: 1,
      status: "active",
      subscription: "basic",
    },
    {
      id: "3",
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 98765 43212",
      registeredDate: "2024-03-10",
      childrenCount: 3,
      status: "active",
      subscription: "premium",
    },
    {
      id: "4",
      name: "Sneha Gupta",
      email: "sneha@example.com",
      phone: "+91 98765 43213",
      registeredDate: "2024-03-25",
      childrenCount: 1,
      status: "suspended",
      subscription: "free",
    },
  ]);

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // ================================
  // Add Parent Dialog
  // ================================
  const [showAddParent, setShowAddParent] = useState(false);
  const [newParent, setNewParent] = useState({
    name: "",
    email: "",
    phone: "",
    subscription: "free",
    status: "active",
  });

  const handleAddParent = () => {
    if (!newParent.name || !newParent.email) {
      toast.current.show({
        severity: "error",
        summary: "Missing fields",
        detail: "Name and Email are required.",
      });
      return;
    }

    const parent = {
      ...newParent,
      id: Math.random().toString(36).slice(2),
      registeredDate: new Date().toISOString().split("T")[0],
      childrenCount: 0,
    };

    setParents([...parents, parent]);
    setShowAddParent(false);
    setNewParent({ name: "", email: "", phone: "", subscription: "free" });

    toast.current.show({
      severity: "success",
      summary: "Added",
      detail: `Parent ${parent.name} added.`,
    });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Total Parents */}
            <div className="p-4 rounded-lg border bg-blue-50 border-blue-100">
              <p className="text-sm text-gray-600">Total Parents</p>
              <p className="text-xl font-semibold text-blue-900">
                {parents.length}
              </p>
            </div>

            {/* Active */}
            <div className="p-4 rounded-lg border bg-green-50 border-green-100">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-semibold text-green-900">
                {parents.filter((p) => p.status === "active").length}
              </p>
            </div>

            {/* Suspended */}
            <div className="p-4 rounded-lg border bg-orange-50 border-orange-100">
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-xl font-semibold text-orange-900">
                {parents.filter((p) => p.status === "suspended").length}
              </p>
            </div>

            {/* Premium Users */}
            <div className="p-4 rounded-lg border bg-purple-50 border-purple-100">
              <p className="text-sm text-gray-600">Premium Users</p>
              <p className="text-xl font-semibold text-purple-900">
                {parents.filter((p) => p.subscription === "premium").length}
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="border-2 border-gray-300 border-bottom-1 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-bottom-2 border-gray-300">
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Children</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredParents.map((parent) => (
                  <TableRow key={parent.id} className="cursor-pointer border-bottom-2 border-gray-300">
                    <TableCell>
                      <div>
                        <p>{parent.name}</p>
                        <p className="text-sm text-gray-500">{parent.email}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm text-gray-700">
                        <span className="flex items-center gap-2">
                          <Mail className="size-3" /> {parent.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone className="size-3" /> {parent.phone}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-blue-50 border-2 border-blue-100 text-black">
                        {parent.childrenCount} {parent.childrenCount === 1 ? 'child' : 'children'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          parent.subscription === "premium"
                            ? "bg-purple-100 border-0 text-purple-800"
                            : parent.subscription === "basic"
                            ? "bg-blue-100 border-0 text-blue-800"
                            : "bg-gray-100 border-0 text-gray-800"
                        }
                      >
                        {parent.subscription}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          parent.status === "active"
                            ? "bg-green-100 border-0 text-green-800"
                            : "bg-red-100 border-0 text-red-800"
                        }
                      >
                        {parent.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="size-3" />
                        {new Date(parent.registeredDate).toLocaleDateString()}
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ADD PARENT DIALOG */}
      <Dialog
        visible={showAddParent}
        onHide={() => setShowAddParent(false)}
        header="Add Parent"
        className="w-[90%] md:w-[35%] "
        position="center"
        draggable={false}
      >
        <div className="space-y-4 pl-3 pr-6">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Parent Name *</label>
            <InputText
              className="w-full"
              value={newParent.name}
              onChange={(e) =>
                setNewParent({ ...newParent, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email *</label>
            <InputText
              className="w-full"
              value={newParent.email}
              onChange={(e) =>
                setNewParent({ ...newParent, email: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Phone</label>
            <InputText
              className="w-full"
              value={newParent.phone}
              onChange={(e) =>
                setNewParent({ ...newParent, phone: e.target.value })
              }
            />
          </div>

          {/* Subscription */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Subscription</label>

            <Dropdown
              value={newParent.subscription}
              onChange={(e) =>
                setNewParent({ ...newParent, subscription: e.value })
              }
              options={subscriptionOptions}
              optionLabel="label"
              placeholder="Choose Subscription"
              className="w-full"
              
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setShowAddParent(false)}
              className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={handleAddParent}
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Parent
            </button>
          </div>
        </div>
      </Dialog>

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
