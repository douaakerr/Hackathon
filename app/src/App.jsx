import { NavLink, Route, Routes } from "react-router-dom";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Bell, ChevronDown,
  CircleHelp, Clock3, Droplets, LayoutDashboard, LifeBuoy, Menu, MoreHorizontal,
  Plus, Refrigerator, Settings, ShieldCheck, Thermometer, TrendingUp, Zap,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import "./App.css";

const temperatureData = [
  { time: "08:00", value: 4.1 }, { time: "09:00", value: 4.2 },
  { time: "10:00", value: 4.0 }, { time: "11:00", value: 4.3 },
  { time: "12:00", value: 4.4 }, { time: "13:00", value: 4.2 },
  { time: "14:00", value: 4.1 }, { time: "15:00", value: 4.3 },
  { time: "16:00", value: 4.2 }, { time: "17:00", value: 4.2 },
];

const navigation = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Devices", path: "/devices", icon: Refrigerator },
  { label: "Alerts", path: "/alerts", icon: Bell, count: 2 },
  { label: "Reports", path: "/reports", icon: TrendingUp },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.3} /></span>
        <span className="brand-name">GUARDIAN<span>.</span><small>MEDICAL COLD-CHAIN</small></span>
      </NavLink>

      <div className="workspace-switcher">
        <span className="workspace-avatar">PH</span>
        <span className="workspace-copy"><strong>Pharmacy Horizon</strong><small>Healthcare workspace</small></span>
        <ChevronDown size={15} />
      </div>

      <p className="nav-caption">WORKSPACE</p>
      <nav className="side-nav">
        {navigation.map(({ label, path, icon: Icon, count }) => (
          <NavLink key={path} to={path} end={path === "/"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Icon size={18} />
            <span>{label}</span>
            {count && <span className="nav-count">{count}</span>}
          </NavLink>
        ))}
      </nav>

      <p className="nav-caption nav-caption-lower">PREFERENCES</p>
      <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <Settings size={18} /><span>Settings</span>
      </NavLink>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon"><LifeBuoy size={17} /></span>
          <strong>Need a hand?</strong>
          <p>Our support team is here to help.</p>
          <button type="button" className="help-link">Visit help center <ArrowUpRight size={13} /></button>
        </div>
        <div className="profile-row">
          <div className="profile-avatar">SK</div>
          <div className="profile-copy"><strong>Sarah Khaled</strong><small>Pharmacist</small></div>
          <MoreHorizontal size={18} className="profile-more" />
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title, eyebrow }) {
  return (
    <header className="topbar">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>
      <div className="topbar-actions">
        <span className="connection-pill"><span /> All systems operational</span>
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="topbar-date"><Clock3 size={15} /> Today, 25 November</div>
      </div>
    </header>
  );
}

function MetricCard({ label, value, unit, detail, trend, icon: Icon, tone = "blue" }) {
  return (
    <article className="metric-card">
      <div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={18} /></span></div>
      <div className="metric-value">{value}<small>{unit}</small></div>
      <div className="metric-foot"><span className={trend === "down" ? "trend down" : "trend"}>{trend === "down" ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{detail}</span><span className="metric-period">vs. yesterday</span></div>
    </article>
  );
}

function Overview() {
  return (
    <>
      <Topbar title="Good morning, Sarah" eyebrow="TUESDAY, 25 NOVEMBER 2026" />
      <main className="page-content">
        <section className="welcome-strip">
          <div className="welcome-icon"><ShieldCheck size={23} /></div>
          <div><strong>Your cold-chain is looking good.</strong><p>All monitored storage conditions are within their configured ranges.</p></div>
          <span className="welcome-status"><span /> Protected</span>
        </section>

        <div className="section-heading"><div><h2>At a glance</h2><p>A live snapshot of your medicine storage environment.</p></div><button className="outline-button"><Clock3 size={15} /> Last 24 hours <ChevronDown size={14} /></button></div>

        <section className="metrics-grid">
          <MetricCard label="Current temperature" value="4.2" unit="°C" detail="0.3°C" icon={Thermometer} tone="teal" />
          <MetricCard label="Connected devices" value="03" unit="/ 03" detail="All online" icon={Refrigerator} tone="blue" />
          <MetricCard label="Power stability" value="99.8" unit="%" detail="0.2%" trend="down" icon={Zap} tone="mint" />
          <MetricCard label="Active alerts" value="02" unit="" detail="1 resolved today" icon={AlertTriangle} tone="amber" />
        </section>

        <section className="content-grid">
          <article className="panel temperature-panel">
            <div className="panel-heading"><div><div className="panel-title-line"><h3>Temperature overview</h3><span className="live-label"><i /> LIVE</span></div><p>Refrigerator temperature over the last 10 hours</p></div><button className="more-button" aria-label="More options"><MoreHorizontal size={19} /></button></div>
            <div className="chart-legend"><span><i /> Temperature</span><span className="safe-range"><i /> Safe range: 2–8°C</span></div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="temperatureFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00A896" stopOpacity={0.2} /><stop offset="100%" stopColor="#00A896" stopOpacity={0.01} /></linearGradient></defs>
                  <CartesianGrid stroke="#edf1f2" strokeDasharray="4 5" vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "#89999e", fontSize: 11 }} dy={10} />
                  <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tickLine={false} axisLine={false} tick={{ fill: "#89999e", fontSize: 11 }} />
                  <Tooltip contentStyle={{ border: "1px solid #e8eeee", borderRadius: 10, fontSize: 12 }} formatter={(value) => [`${value} °C`, "Temperature"]} />
                  <Area type="monotone" dataKey="value" stroke="#028090" strokeWidth={2.5} fill="url(#temperatureFill)" activeDot={{ r: 5, fill: "#028090", stroke: "#fff", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-foot"><span><i className="dot dot-teal" /> Stable throughout the day</span><span>Updated just now</span></div>
          </article>

          <article className="panel device-panel">
            <div className="panel-heading"><div><h3>Monitored devices</h3><p>Your connected storage units</p></div><button className="text-button">View all <ArrowUpRight size={14} /></button></div>
            <div className="device-list">
              <DeviceRow name="Main medicine fridge" id="GRD-FR-001" temperature="4.2°C" status="Normal" />
              <DeviceRow name="Vaccine storage" id="GRD-FR-002" temperature="5.1°C" status="Normal" />
              <DeviceRow name="Backup refrigerator" id="GRD-FR-003" temperature="3.8°C" status="Normal" />
            </div>
            <button className="add-device-button"><Plus size={16} /> Add a device</button>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="panel alert-panel">
            <div className="panel-heading"><div><h3>Recent alerts</h3><p>Events that may need your attention</p></div><NavLink to="/alerts" className="text-button">All alerts <ArrowUpRight size={14} /></NavLink></div>
            <div className="alert-row"><span className="alert-symbol warning"><Zap size={16} /></span><div className="alert-copy"><strong>Power interruption detected</strong><p>Backup power activated · Main medicine fridge</p></div><time>09:42 AM</time><span className="alert-state resolved">Resolved</span></div>
            <div className="alert-row"><span className="alert-symbol info"><Droplets size={16} /></span><div className="alert-copy"><strong>Sensor connection restored</strong><p>Vaccine storage · Connection is stable</p></div><time>08:16 AM</time><span className="alert-state monitored">Monitoring</span></div>
          </article>
          <article className="panel status-panel">
            <div className="panel-heading"><div><h3>Storage conditions</h3><p>Configured temperature limits</p></div><button className="more-button" aria-label="More options"><MoreHorizontal size={19} /></button></div>
            <div className="condition-range"><div className="range-labels"><span>Below range</span><strong>2–8°C</strong><span>Above range</span></div><div className="range-track"><span className="range-marker" /></div><div className="range-current"><span>Current reading</span><strong>4.2°C <i>Within range</i></strong></div></div>
            <div className="condition-note"><ShieldCheck size={16} /><span>Temperature is currently within the configured storage range.</span></div>
          </article>
        </section>
        <p className="simulation-note"><Activity size={13} /> Prototype preview · Dashboard readings are simulated and are not connected to physical sensors.</p>
      </main>
    </>
  );
}

function DeviceRow({ name, id, temperature, status }) {
  return <div className="device-row"><span className="device-icon"><Refrigerator size={18} /></span><div className="device-copy"><strong>{name}</strong><small>{id}</small></div><div className="device-reading"><strong>{temperature}</strong><small>{status}</small></div><span className="online-dot" /></div>;
}

function PlaceholderPage({ title, description, icon: Icon }) {
  return <><Topbar title={title} eyebrow="GUARDIAN WORKSPACE" /><main className="page-content"><section className="placeholder-panel"><span className="placeholder-icon"><Icon size={25} /></span><h2>{title}</h2><p>{description}</p><span className="coming-soon">COMING IN THE NEXT BUILD</span></section></main></>;
}

export default function App() {
  return <div className="app-shell"><Sidebar /><div className="main-area"><Routes>
    <Route path="/" element={<Overview />} />
    <Route path="/devices" element={<PlaceholderPage title="Devices" description="Manage your connected medical refrigerators and monitor their current status." icon={Refrigerator} />} />
    <Route path="/alerts" element={<PlaceholderPage title="Alerts center" description="Review temperature, power, and connectivity events across your monitored devices." icon={AlertTriangle} />} />
    <Route path="/reports" element={<PlaceholderPage title="Reports" description="Explore storage history, temperature excursions, and operational summaries." icon={TrendingUp} />} />
    <Route path="/settings" element={<PlaceholderPage title="Settings" description="Manage workspace preferences, notification settings, and team access." icon={Settings} />} />
  </Routes></div></div>;
}
