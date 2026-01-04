import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";

const ContractorDashboard = () => {
  const contractorId = localStorage.getItem("contractorId");

  const [stats, setStats] = useState({
    sites: 0,
    managers: 0,
    tools: 0,
    pending: 0,
    active: 0,
    maintenance: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [sites, managers, tools] = await Promise.all([
          api.get(`/sites?contractorId=${contractorId}`),
          api.get(`/users/site-managers?contractorId=${contractorId}`),
          api.get(`/tools?contractorId=${contractorId}`),
        ]);

        const toolData = tools.data;

        setStats({
          sites: sites.data.length,
          managers: managers.data.length,
          tools: toolData.length,
          pending: toolData.filter(t => t.status === "pending").length,
          active: toolData.filter(t => t.status === "active").length,
          maintenance: toolData.filter(t => t.status === "maintenance").length,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    loadDashboard();
  }, [contractorId]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-500 mb-6">
          Welcome back! Here's what's happening with your tools.
        </p>

        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Sites" value={stats.sites} />
          <StatCard title="Site Managers" value={stats.managers} />
          <StatCard title="Total Tools" value={stats.tools} />
          <StatCard title="Pending Requests" value={stats.pending} />
        </div>

        {/* Tool Status */}
        <h3 className="font-semibold mb-3">Tools by Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Active" value={stats.active} />
          <StatCard title="Pending" value={stats.pending} />
          <StatCard title="Under Maintenance" value={stats.maintenance} />
        </div>
      </main>
    </div>
  );
};

export default ContractorDashboard;

/* ---------------- Components ---------------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
