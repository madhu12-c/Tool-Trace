import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";

const Sites = () => {
  const contractorId = localStorage.getItem("contractorId");

  const [sites, setSites] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch sites
  const fetchSites = async () => {
    try {
      const res = await api.get(`/sites?contractorId=${contractorId}`);
      setSites(res.data);
    } catch (err) {
      console.error("Error fetching sites", err);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  // Create site
  const createSite = async () => {
    if (!siteName.trim()) return;

    setLoading(true);
    try {
      await api.post("/sites", {
        siteName,
        contractorId,
      });

      setSiteName("");
      fetchSites();
    } catch (err) {
      console.error("Error creating site", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-1">Sites</h2>
        <p className="text-gray-500 mb-6">
          Manage all construction sites
        </p>

        {/* Create Site */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex gap-3">
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter site name"
            className="border px-3 py-2 rounded w-64"
          />

          <button
            onClick={createSite}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Add Site"}
          </button>
        </div>

        {/* Sites Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Site Name</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => (
                <tr key={site._id} className="border-t">
                  <td className="p-3 font-medium">
                    {site.siteName}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(site.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sites.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No sites created yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Sites;
