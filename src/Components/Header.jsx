import { Bell, Mail, Search, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { UseSidebar } from "../Shared/SidebarContext";
import useAuth from "../Router/UseAuth";

export default function Header() {
  const location = useLocation();
  const { toggleSidebar } = UseSidebar();
  const { user, logOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null); // Profile dropdown ref
  const notificationsRef = useRef(null); // Notifications dropdown ref
  const messagesRef = useRef(null); // Messages dropdown ref

  const titles = {
    "/dashboard/manufacturer": "Manufacturer",
    "/dashboard/products": "Products",
    "/dashboard/reseller": "Reseller",
    "/dashboard/rolemanagement": "Role Management",
    "/dashboard/packages": "Packages",
    "/dashboard/imageupload": "Image Upload",
    "/dashboard/blog": "Blogs",
    "/dashboard/contact": "Contact",
  };
  const title = titles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    logOut();
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, text: "Your order #1234 has been shipped.", time: "2h ago" },
    { id: 2, text: "New user registered on your platform.", time: "5h ago" },
    { id: 3, text: "Server downtime scheduled for tonight.", time: "1d ago" },
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      text: "Can we schedule a meeting tomorrow?",
      time: "1h ago",
    },
    {
      id: 2,
      sender: "Jane Smith",
      text: "Please review the attached document.",
      time: "4h ago",
    },
    {
      id: 3,
      sender: "Support Team",
      text: "Your ticket has been resolved.",
      time: "1d ago",
    },
  ];

  return (
    <header className="px-4 sm:px-6 py-4  z-10 top-0">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="block lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A9B9B]"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <h1
          id="header-title"
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0A9B9B] hidden lg:block truncate"
        >
          {title}
        </h1>

        <div className="flex items-center flex-grow max-w-2xl mx-4">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search Product Here..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-[#0A9B9B] outline-none text-sm"
              aria-label="Search Products"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {notifications.length > 0 && (
                <span
                  className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
            {showNotifications && (
              <div className="absolute -right-28 lg:right-0 mt-2 w-72 rounded-[24px] border-2 border-white bg-white/50 backdrop-blur-[16.5px] shadow-lg p-4 z-50">
                <h2 className="font-semibold text-gray-800 mb-2">
                  Notifications
                </h2>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-b py-2 last:border-b-0"
                  >
                    <p className="text-sm text-gray-600">{notification.text}</p>
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={messagesRef}>
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Messages"
            >
              <Mail className="w-6 h-6 text-gray-700" />
            </button>
            {showMessages && (
              <div className="absolute -right-16 lg:right-0 mt-2 w-72 rounded-[24px] border-2 border-white bg-white/50 backdrop-blur-[16.5px] shadow-lg p-4 z-50">
                <h2 className="font-semibold text-gray-800 mb-2">Messages</h2>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="border-b py-2 last:border-b-0"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {message.sender}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {message.text}
                    </p>
                    <span className="text-xs text-gray-400">
                      {message.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center w-8 lg:w-12 h-8 lg:h-12 rounded-full overflow-hidden border-2 border-[#0A9B9B] hover:opacity-90"
              aria-label="Profile"
            >
              <img
                src="https://images.squarespace-cdn.com/content/v1/53b599ebe4b08a2784696956/1451882872681-B0PM3YN9RPLLA36MKVI8/image-asset.jpeg?format=500w"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 md:w-72 lg:w-96 rounded-[24px] border-2 border-white bg-white/50 backdrop-blur-[16.5px] shadow-lg p-4 z-50">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/53b599ebe4b08a2784696956/1451882872681-B0PM3YN9RPLLA36MKVI8/image-asset.jpeg?format=500w"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Abul Monsur Mohammad Kachru
                    </h2>
                    <p className="text-sm text-gray-600">
                      {user.email.slice(0, 15) + "..."}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => navigate("/dashboard/settings")}
                    className="w-full text-center my-4 px-4 py-2 text-[#0A9B9B] font-medium hover:bg-gray-100 rounded-md"
                  >
                    Manage your account
                  </button>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white bg-[#009daa] rounded-md"
                      >
                        Sign out
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-4 py-2 text-white bg-[#009daa] rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
