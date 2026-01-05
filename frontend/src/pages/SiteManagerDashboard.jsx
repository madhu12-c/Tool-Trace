import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import RequestToolModal from "../components/RequestToolModal";

const SiteManagerDashboard = () => {
  const [tools, setTools] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const navigate = useNavigate();

  const siteId = localStorage.getItem("siteId");
  const role = localStorage.getItem("role");

  // Removed redundant protection - route already protects

  // 📦 Fetch tools
  const fetchTools = async () => {
    try {
      const res = await api.get(`/tools?siteId=${siteId}`);
      if (Array.isArray(res.data)) {
        setTools(res.data);
      } else {
        setTools([]);
      }
    } catch (err) {
      console.error("Tools load error", err);
      setTools([]);
    }
  };

  useEffect(() => {
    if (siteId) fetchTools();
  }, [siteId]);

  // 🔄 Update tool status
  const updateStatus = async (toolId, status) => {
    try {
      await api.patch(`/tools/${toolId}/status`, { status });

      setTools((prev) =>
        prev.map((tool) =>
          tool._id === toolId ? { ...tool, status } : tool
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 📊 Stats
  const total = tools.length;
  const active = tools.filter((t) => t.status === "active").length;
  const pending = tools.filter((t) => t.status === "pending").length;
  const maintenance = tools.filter((t) => t.status === "maintenance").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">ToolTrack</h1>
          <p className="text-sm text-gray-500">Site Manager</p>
        </div>

        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Title + Request Tool */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Site Dashboard</h2>
            <p className="text-gray-500">
              Manage tools at your assigned site
            </p>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Request Tool
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Tools" value={total} />
          <StatCard title="Active" value={active} color="green" />
          <StatCard title="Pending" value={pending} color="yellow" />
          <StatCard title="Under Maintenance" value={maintenance} color="red" />
        </div>

        {/* Tools Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-3">Tool Name</th>
                <th className="p-3">Current Status</th>
                <th className="p-3">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool._id} className="border-t">
                  <td className="p-3">{tool.toolName}</td>

                  <td className="p-3">
                    <StatusBadge status={tool.status} />
                  </td>

                  <td className="p-3">
                    <select
                      value={tool.status}
                      onChange={(e) =>
                        updateStatus(tool._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tools.length === 0 && (
            <p className="p-4 text-gray-500 text-center">
              No tools assigned to this site.
            </p>
          )}
        </div>
      </main>

      {/* 🔥 Request Tool Modal */}
      {showRequestModal && (
        <RequestToolModal
          onClose={() => setShowRequestModal(false)}
          onSuccess={fetchTools}
        />
      )}
    </div>
  );
};

export default SiteManagerDashboard;

/* -------------------- Components -------------------- */

const StatCard = ({ title, value, color }) => {
  const colors = {
    green: "border-green-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
        colors[color] || "border-blue-500"
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    maintenance: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        styles[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};
