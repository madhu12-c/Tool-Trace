import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-8">ToolTrace</h1>

      <nav className="space-y-2">
        {role === "contractor" && (
          <>
            <NavItem to="/contractor/dashboard" label="Dashboard" />
            <NavItem to="/contractor/sites" label="Sites" />
            <NavItem to="/contractor/site-managers" label="Site Managers" />
            <NavItem to="/contractor/tools" label="Tools" />
            <NavItem to="/contractor/tool-requests" label="Tool Requests" />
          </>
        )}
        {role === "site_manager" && (
          <>
            <NavItem to="/site_manager/dashboard" label="Dashboard" />
            <NavItem to="/site_manager/tools" label="Tools" />
          </>
        )}
      </nav>

      <button
        onClick={logout}
        className="mt-10 text-sm text-red-400 hover:underline"
      >
        Logout
      </button>
    </aside>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-slate-700"
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;
