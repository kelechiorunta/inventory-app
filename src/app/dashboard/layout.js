'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react'; // Import the signOut function
import { FaDailymotion, FaIndustry, FaRProject, FaSalesforce, FaSwift, FaUser, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';

const DashBoardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // State to manage which accordion sections are open
  const [openSections, setOpenSections] = useState({
    general: false,
    support: false,
  });

  // Function to toggle section
  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Sign out function
  const handleSignOut = () => {
    signOut({ callbackUrl: '/signin' }); // Redirect to sign-in after sign-out
  };

  return (
    <div className="container max-w-full w-full flex h-screen max-sm:flex-col">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r max-sm:w-full">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-8 py-4 bg-gray-200">
            <h2 className="text-purple-600 font-bold text-lg">Wrapper</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col flex-grow px-4 py-6">

            {/* General Section Accordion */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleSection('general')}
              >
                <p className="uppercase text-xs font-semibold text-gray-400">General</p>
                {openSections.general ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {openSections.general && (
                <div className="flex flex-col gap-y-2">
                  <Link href="/dashboard/main"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/main' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}><FaUser /> Dashboard
                  </Link>

                  <Link href="/dashboard/inventory"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/inventory' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}><FaIndustry /> Inventory
                  </Link>

                  <Link href="/dashboard/sales-orders"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/sales-orders' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}><FaSalesforce /> Sales Orders
                  </Link>

                  <Link href="/dashboard/suppliers"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/suppliers' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}><FaDailymotion /> Suppliers
                  </Link>

                  <Link href="/dashboard/reports"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/reports' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}><FaRProject /> Reports
                  </Link>

                  <Link href="/dashboard/quick-actions"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/quick-actions' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}><FaSwift /> Quick Actions
                  </Link>
                </div>
              )}
            </div>

            {/* Support Section Accordion */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => toggleSection('support')}
              >
                <p className="uppercase text-xs font-semibold text-gray-400">Support</p>
                {openSections.support ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {openSections.support && (
                <div className="flex flex-col gap-y-2">
                  <Link href="/dashboard/help"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/help' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}> Help
                  </Link>

                  <Link href="/dashboard/settings"
                    className={`px-4 py-2 flex items-center gap-x-4 rounded-lg hover:bg-blue-200 ${
                      pathname === '/dashboard/settings' ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}>Settings
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Search Box */}
          <div className="px-4 py-3 max-sm:flex flex-nowrap items-center gap-x-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="mt-2 px-4 py-2 w-full bg-blue-500 text-white rounded-lg max-sm:w-auto max-sm:mt-0">
              Search
            </button>
          </div>

          {/* Sign-Out Button */}
          <div className="px-4 py-3">
            <button
              onClick={handleSignOut}
              className="mt-2 px-4 py-2 w-full bg-red-500 text-white rounded-lg flex items-center justify-center gap-x-2"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white">
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;

