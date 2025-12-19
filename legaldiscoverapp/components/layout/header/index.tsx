"use client"

import { actions } from "@/lib/header-data";
import { useAuthStore } from "@/store/Auth";
import { ShieldCheck, User } from "lucide-react";
import { AISearchBar } from "@/components/AISearchBar";
import { Spinner } from "@/components/ui/spinner";

export const Header = () => {
  const { isLoader, user, userInfo } = useAuthStore()
  return (
    <header className="bg-white flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-4 border-b border-gray-200 gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <AISearchBar />
        <div className="whitespace-nowrap flex items-center px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors w-fit">
          <ShieldCheck size={16} className="mr-1" />
          Secure Session
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center sm:gap-3 text-medium-gray">
          {actions.map((action, index) => (
            <div
              key={index}
              aria-label={action.label}
              className="cursor-pointer relative p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              {action.icon}
              {action.label === "View Messages" && action.badge && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {action.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pl-4 md:border-l md:border-gray-200">
          {isLoader ? (
            <Spinner className="text-gray-500" />
          ) : (
            <>
              <div className="flex flex-col text-right leading-tight min-w-0 max-w-[100px]">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-medium-gray capitalize">
                  {userInfo?.role}
                </p>
              </div>

              <div className="cursor-pointer flex-shrink-0 bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent/90 transition-colors" title={user?.name}>
                <User size={20} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}