import { useState } from "react";
import api from "../api/axios";

const RequestToolModal = ({ onClose, onSuccess }) => {
  const [toolName, setToolName] = useState("");
  const [loading, setLoading] = useState(false);

  const siteId = localStorage.getItem("siteId");
  const contractorId = localStorage.getItem("contractorId");

  const submitRequest = async () => {
    if (!toolName.trim()) return;

    setLoading(true);
    try {
      await api.post("/tools", {
        toolName,
        status: "pending",
        siteId,
        contractorId,
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

        <input
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          placeholder="Tool name"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={submitRequest}
            disabled={loading}
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
