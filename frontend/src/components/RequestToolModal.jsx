import { useState, useEffect } from "react";
import api from "../api/axios";

const RequestToolModal = ({ onClose, onSuccess }) => {
  const [tools, setTools] = useState([]);
  const [selectedToolId, setSelectedToolId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const siteId = localStorage.getItem("siteId");
  const contractorId = localStorage.getItem("contractorId");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await api.get(`/tools?contractorId=${contractorId}&status=idle`);
        if (Array.isArray(res.data)) {
          setTools(res.data);
        }
      } catch (err) {
        console.error("Tools fetch error", err);
      }
    };
    fetchTools();
  }, [contractorId]);

  const submitRequest = async () => {
    if (!selectedToolId || !reason.trim()) return;

    setLoading(true);
    try {
      await api.patch(`/tools/${selectedToolId}/status`, {
        status: "pending",
        requestedSiteId: siteId,
        requestedBy: userId,
        reason,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Request failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-lg font-semibold mb-4">Request Tool</h3>

        <select
          value={selectedToolId}
          onChange={(e) => setSelectedToolId(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        >
          <option value="">Select a tool</option>
          {tools.map((tool) => (
            <option key={tool._id} value={tool._id}>
              {tool.toolName} - {tool.serialNo} (at {tool.siteId?.siteName || "Warehouse"})
            </option>
          ))}
        </select>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for request"
          className="w-full border px-3 py-2 rounded mb-4"
          rows="3"
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={submitRequest}
            disabled={loading || !selectedToolId || !reason.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Requesting..." : "Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestToolModal;
