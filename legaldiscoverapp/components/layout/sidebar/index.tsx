"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/Auth";
import { Images } from "@/public/assets/index";
import { CustomImage } from "../../common/image";
import { Spinner } from "@/components/ui/spinner";
import { navigationTabs } from "@/lib/sidebar-data";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, LogOut, Menu } from "lucide-react";

type ExpandedStates = {
  [key: string]: boolean;
};

export const Sidebar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedStates, setExpandedStates] = useState<ExpandedStates>(
    navigationTabs.reduce((acc, tab) => {
      acc[tab.section.name] = true;
      return acc;
    }, {} as ExpandedStates)
  );
  const route = useRouter();
  const path = usePathname();
  const { isLoader, user, userInfo, logout } = useAuthStore()

  const handleToggle = (name: string) => {
    setExpandedStates(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleCollapseToggle = () => setIsCollapsed(prev => !prev);

  const COLLAPSED_WIDTH_MD = "md:w-[80px]";
  const FULL_WIDTH_MD = "md:w-[256px]";
  const hiddenWhenCollapsed = isCollapsed ? "hidden" : "block";

  const logoutHandler = async () => {
    const success = await logout()
    if (success) {
      route.push("/auth/signin");
    } else {
      console.error("Logout failed");
    }
  };
  return (
    <>
      <div className="bg-gray-50 md:hidden pl-4 pt-4">
        <Menu
          size={35}
          onClick={() => setMobileOpen(true)}
          className="cursor-pointer bg-accent text-white p-2 rounded-xl"
        />
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}

      <aside
        className={`flex-shrink-0 fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white transform transition-all duration-300 flex flex-col md:h-full md:relative 
          ${mobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? COLLAPSED_WIDTH_MD : FULL_WIDTH_MD}
        `}
      >
        <div className={`flex items-center gap-3 p-4 border-b border-blue-700 flex-shrink-0 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="bg-white rounded-[8px] w-[32px] h-[32px] p-1.5 flex justify-center items-center flex-shrink-0">
            <CustomImage
              src={Images.logo}
              alt="LegalDiscover"
              className="bg-white rounded-[8px] w-[32px] h-[32px]"
            />
          </div>
          <div className={`flex-1 overflow-hidden ${hiddenWhenCollapsed}`}>
            <h2 className="text-lg font-bold whitespace-nowrap">LegalDiscover</h2>
            <p className="text-xs text-blue-200 whitespace-nowrap">AI-Powered Legal Platform</p>
          </div>

          {isCollapsed ? (
            <ChevronRight
              size={22}
              onClick={handleCollapseToggle}
              className={`cursor-pointer absolute top-1/2 -right-[18px] h-[40px] transform -translate-y-1/2 bg-[#1e3b9a] rounded-r-[10px] hidden md:block`}
            />
          ) : (
            <ChevronLeft
              size={16}
              onClick={handleCollapseToggle}
              className={`cursor-pointer hidden md:block`}
            />
          )}
          <ChevronLeft
            size={16}
            onClick={() => setMobileOpen(false)}
            className={`cursor-pointer ${isCollapsed ? 'hidden' : 'md:hidden'}`}
          />
        </div>

        <div className="max-h-[75vh] px-2 overflow-y-auto flex-1 scrollbar-hide">
          {navigationTabs.map((group, idx) => {
            const sectionName = group.section.name;
            const isExpanded = expandedStates[sectionName]
            return (
              <div key={idx}>
                {!isCollapsed &&
                  <div
                    className={`flex cursor-pointer text-[#bfdbfe] hover:text-white items-center py-2 mt-4 mb-2 ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
                    onClick={() => handleToggle(sectionName)}
                  >
                    {group.section.icon}
                    <h3 className={`text-xs font-medium uppercase px-2 ${hiddenWhenCollapsed}`}>
                      {sectionName}
                    </h3>

                    {!isCollapsed && (
                      isExpanded ? (
                        <ChevronUp size={15} className="ml-auto transition-transform duration-200" />
                      ) : (
                        <ChevronDown size={15} className="ml-auto transition-transform duration-200" />
                      )
                    )}
                  </div>
                }
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? "max-h-screen" : "max-h-0"} 
                  `}
                >
                  <div className={`space-y-1 ${isCollapsed && "mt-4 mb-2"}`}>
                    {group.items.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center ${path === item.href ? "bg-[#1d4ed8]" : "bg-transparent"} ${isCollapsed ? 'justify-center px-0' : 'justify-between gap-3 px-3'} py-[14px] rounded-lg cursor-pointer text-blue-200 hover:bg-[#1d4fd884] hover:text-white`}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className={`ml-[15px] font-medium text-blue-100 ${hiddenWhenCollapsed}`}>{item.label}</span>
                        </div>
                        {item.label === "AI Consultant" && <span className={`rounded-[9.5px] px-[6px] py-[2px] bg-accent text-[12px] ${hiddenWhenCollapsed}`}>AI</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={`flex-shrink-0 mt-auto bg-primary-blue/30 text-blue-200 rounded-lg p-4 m-4`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="bg-primary-blue rounded-full w-10 h-10 flex justify-center items-center flex-shrink-0">
              {user?.name && user?.name?.[0]}
            </div>
            {isLoader ? <Spinner /> :
              <div className={`overflow-hidden ${hiddenWhenCollapsed}`}>
                <p className="text-sm font-medium text-white whitespace-nowrap">{user?.name && user?.name}</p>
                <p className="text-xs capitalize whitespace-nowrap">{userInfo && userInfo.role}</p>
              </div>
            }
          </div>
          <div className={`flex items-center hover:text-[#bfdbfed2] cursor-pointer gap-2 mt-3 text-xs ${hiddenWhenCollapsed}`} onClick={logoutHandler}>
            <LogOut size={15} />
            Logout
          </div>
        </div>
      </aside>
    </>
  );
};
