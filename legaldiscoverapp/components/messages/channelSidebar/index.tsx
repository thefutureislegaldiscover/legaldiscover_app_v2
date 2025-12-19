import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, User, Users, Settings, Building, Scale, Hash, Shield, X } from 'lucide-react';

export const ChannelSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {isOpen &&
      <div className="absolute inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
    }
    <div className={`
      absolute lg:relative  top-0 bottom-0 left-0 md:w-80 w-full bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out z-50 lg:z-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div>
        <div className="p-4 flex items-center gap-2 lg:justify-between">
          <div className="text-xl font-semibold">Legal Messages</div>
          <div className="flex items-center  text-green-400 space-x-1">
            <Shield className="w-4 h-4" />
            <span className="text-xs">
              E2E
            </span>
          </div>
        </div>
        <div className="px-4 text-xs text-gray-400">
          End-to-end encrypted with audit logging
        </div>
        <div className="p-4 flex space-x-2 border-b border-gray-700">
          <div className="cursor-pointer flex items-center space-x-1 px-2 py-1 rounded text-xs bg-blue-600 text-white">
            <Hash className="w-3 h-3" />
            <span>
              All
            </span>
          </div>
          <div className="cursor-pointer flex items-center space-x-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-800">
            <Building className="w-3 h-3" />
            <span>
              Internal
            </span>
          </div>
          <div className="cursor-pointer flex items-center space-x-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-800">
            <Users className="w-3 h-3" />
            <span>
              Clients
            </span>
          </div>
          <div className="cursor-pointer flex items-center space-x-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-800">
            <Scale className="w-3 h-3" />
            <span>
              Cases
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative">
          <Input type="text"
            placeholder="Search channels" className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <Button className="w-full flex justify-start bg-blue-600 hover:bg-blue-700 rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Case Channel</span>
        </Button>
      </div>

      <h3 className="px-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        CHANNELS (0)
      </h3>

      <div className="mt-auto p-4 flex items-center justify-between border-t border-[#3b415a]">
        <div className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
          <User className="w-4 h-4" />
        </div>
        <Settings className="text-gray-400 hover:text-white w-4 h-4 cursor-pointer" />
      </div>
    </div>
  </>
)
