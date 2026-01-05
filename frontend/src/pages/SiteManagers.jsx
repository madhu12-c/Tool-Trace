import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";

const SiteManagers = () => {
  const contractorId = localStorage.getItem("contractorId");

  const [managers, setManagers] = useState([]);
  const [sites, setSites] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch site managers and sites
  const fetchData = async () => {
    try {
      const [managersRes, sitesRes] = await Promise.all([
        api.get(`/users/site-managers?contractorId=${contractorId}`),
        api.get(`/sites?contractorId=${contractorId}`),
      ]);
      setManagers(managersRes.data);
      setSites(sitesRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create or update site manager
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || (!password.trim() && !editing) || !selectedSiteId) return;

    setLoading(true);
    try {
      if (editing) {
        await api.patch(`/users/${editingId}`, {
          name,
          email,
          siteId: selectedSiteId,
        });
        alert("Site manager updated successfully");
      } else {
        await api.post("/users", {
          name,
          email,
          password,
          role: "site_manager",
          siteId: selectedSiteId,
          contractorId,
        });
        alert("Site manager added successfully");
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error saving site manager", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSelectedSiteId("");
    setEditing(false);
    setEditingId(null);
  };

  const editManager = (manager) => {
    setName(manager.name);
    setEmail(manager.email);
    setSelectedSiteId(manager.siteId?._id || "");
    setEditing(true);
    setEditingId(manager._id);
  };

  const deleteManager = async (id) => {
    if (!confirm("Are you sure you want to delete this site manager?")) return;

    try {
      await api.delete(`/users/${id}`);
      alert("Site manager deleted successfully");
      fetchData();
    } catch (err) {
      console.error("Error deleting site manager", err);
      alert("Failed to delete site manager");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-1">Site Managers</h2>
        <p className="text-gray-500 mb-6">
          Manage site managers
        </p>

        {/* Create/Edit Site Manager */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-4 gap-3 mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border px-3 py-2 rounded"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="border px-3 py-2 rounded"
            />
            {!editing && (
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="border px-3 py-2 rounded"
              />
            )}
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Select Site</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.siteName}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : editing ? "Update Site Manager" : "Add Site Manager"}
          </button>
          {editing && (
            <button
              onClick={resetForm}
              className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Site Managers Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Site</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager._id} className="border-t">
                  <td className="p-3 font-medium">
                    {manager.name}
                  </td>
                  <td className="p-3">
                    {manager.email}
                  </td>
                  <td className="p-3">
                    {manager.siteId?.siteName || "Not Assigned"}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(manager.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => editManager(manager)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteManager(manager._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {managers.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No site managers found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SiteManagers;