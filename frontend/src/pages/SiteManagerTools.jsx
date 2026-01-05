import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const SiteManagerTools = () => {
  const siteId = localStorage.getItem("siteId");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetchTools();
  }, [siteId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Tools</h1>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4">Available Tools</h2>
          {tools.length === 0 ? (
            <p>No tools available.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Tool Name</th>
                  <th className="border border-gray-300 p-2">Serial No</th>
                  <th className="border border-gray-300 p-2">Purchased From</th>
                  <th className="border border-gray-300 p-2">Purchased Site</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool._id}>
                    <td className="border border-gray-300 p-2">{tool.toolName}</td>
                    <td className="border border-gray-300 p-2">{tool.serialNo}</td>
                    <td className="border border-gray-300 p-2">{tool.purchasedFrom}</td>
                    <td className="border border-gray-300 p-2">{tool.purchasedSite}</td>
                    <td className="border border-gray-300 p-2">{tool.status || "Available"}</td>
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

export default SiteManagerTools;