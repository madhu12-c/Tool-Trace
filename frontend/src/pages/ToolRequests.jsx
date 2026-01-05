import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const ToolRequests = () => {
  const contractorId = localStorage.getItem("contractorId");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await api.get(`/tools?contractorId=${contractorId}&status=pending`);
      if (Array.isArray(res.data)) {
        setRequests(res.data);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error("Requests load error", err);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [contractorId]);

  const updateStatus = async (toolId, status, newSiteId = null) => {
    setLoading(true);
    try {
      const updateData = { status };
      if (status === "active" && newSiteId) {
        updateData.siteId = newSiteId._id; // Use _id for siteId
        updateData.requestedSiteId = null;
        updateData.requestedBy = null;
        updateData.reason = null;
      } else if (status === "idle") {
        updateData.requestedSiteId = null;
        updateData.requestedBy = null;
        updateData.reason = null;
      }
      await api.patch(`/tools/${toolId}/status`, updateData);
      setRequests((prev) => prev.filter((req) => req._id !== toolId));
      alert("Status updated successfully");
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Tool Requests</h1>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4">Pending Requests</h2>
          {requests.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Tool Name</th>
                  <th className="border border-gray-300 p-2">Serial No</th>
                  <th className="border border-gray-300 p-2">From Site</th>
                  <th className="border border-gray-300 p-2">To Site</th>
                  <th className="border border-gray-300 p-2">Requested By</th>
                  <th className="border border-gray-300 p-2">Reason</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td className="border border-gray-300 p-2">{req.toolName}</td>
                    <td className="border border-gray-300 p-2">{req.serialNo}</td>
                    <td className="border border-gray-300 p-2">{req.siteId?.siteName || "Warehouse"}</td>
                    <td className="border border-gray-300 p-2">{req.requestedSiteId?.siteName || "N/A"}</td>
                    <td className="border border-gray-300 p-2">{req.requestedBy?.name || "N/A"}</td>
                    <td className="border border-gray-300 p-2">{req.reason}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => updateStatus(req._id, "active", req.requestedSiteId)}
                        disabled={loading}
                        className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req._id, "idle")}
                        disabled={loading}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolRequests;