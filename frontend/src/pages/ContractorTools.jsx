import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const ContractorTools = () => {
  const contractorId = localStorage.getItem("contractorId");

  const [tools, setTools] = useState([]);
  const [sites, setSites] = useState([]);
  const [toolName, setToolName] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [purchasedSite, setPurchasedSite] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [sitesRes, toolsRes] = await Promise.all([
        api.get(`/sites?contractorId=${contractorId}`),
        api.get(`/tools?contractorId=${contractorId}`),
      ]);

      setSites(sitesRes.data);
      setTools(toolsRes.data);
    } catch (err) {
      console.error("Tools load error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contractorId]);

  const createTool = async () => {
    if (!toolName.trim() || !serialNo.trim() || !selectedSiteId) return;

    setLoading(true);
    try {
      await api.post("/tools", {
        toolName,
        serialNo,
        purchasedFrom,
        purchasedSite,
        siteId: selectedSiteId,
        contractorId,
      });

      setToolName("");
      setSerialNo("");
      setPurchasedFrom("");
      setPurchasedSite("");
      setSelectedSiteId("");

      fetchData();
    } catch (err) {
      console.error("Error creating tool", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-1">Tools</h2>
        <p className="text-gray-500 mb-6">
          Manage all tools
        </p>

        {/* Add Tool Form */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              placeholder="Tool Name"
              className="border px-3 py-2 rounded"
            />
            <input
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              placeholder="Serial Number"
              className="border px-3 py-2 rounded"
            />
            <input
              value={purchasedFrom}
              onChange={(e) => setPurchasedFrom(e.target.value)}
              placeholder="Purchased From"
              className="border px-3 py-2 rounded"
            />
            <input
              value={purchasedSite}
              onChange={(e) => setPurchasedSite(e.target.value)}
              placeholder="Purchased Site"
              className="border px-3 py-2 rounded"
            />
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
            onClick={createTool}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Tool"}
          </button>
        </div>

        {/* Tools Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Tool Name</th>
                <th className="p-3">Serial No</th>
                <th className="p-3">Site</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool._id} className="border-t">
                  <td className="p-3 font-medium">{tool.toolName}</td>
                  <td className="p-3">{tool.serialNo}</td>
                  <td className="p-3">{tool.siteId?.siteName || "N/A"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      tool.status === 'active' ? 'bg-green-100 text-green-800' :
                      tool.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tool.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tools.length === 0 && (
            <p className="p-4 text-center text-gray-500">No tools added yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContractorTools;