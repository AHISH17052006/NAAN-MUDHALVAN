import React, { useState, useRef, useEffect } from "react";
import "../styles/doctorHome.css";
import { FaBell, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PatientHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const recentActivities = [
    { icon: "🆕", title: "New Appointment", time: "2 mins ago" },
    { icon: "📡", title: "Device Status Update", time: "1 hour ago" },
    { icon: "📜", title: "Report Generated", time: "3 hours ago" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="doctor-home">
      <div className="top-nav">
        <button 
          ref={menuButtonRef}
          className="menu-icon-btn"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu />
        </button>
        <h2>Welcome</h2>
        <FaBell className="notification-icon" />
      </div>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Recent Activities</h3>
        </div>
        <div className="sidebar-activities">
          {recentActivities.map((activity, index) => (
            <div key={index} className="sidebar-activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-details">
                <h4>{activity.title}</h4>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <p className="greeting">Have a great day ahead</p>

        <div className="stats-container">
          <div className="stat-box">⌚️ Hours Active</div>
          <button 
            onClick={() => navigate("/device-management", { state: { from: '/patienthome' } })} 
            className="stat-box"
          >
            🌐 Active Devices
          </button>
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          <button 
            onClick={() => navigate("/device-management", { state: { from: '/patienthome' } })} 
            className="action-btn"
          >
            📟 Devices Management
          </button>
          <button 
            onClick={() => navigate("/Account", { state: { from: '/patienthome' } })} 
            className="action-btn"
          >
            👤 Account
          </button>
          <button 
            onClick={() => navigate("/reports")} 
            className="action-btn"
          >
            📄 View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;