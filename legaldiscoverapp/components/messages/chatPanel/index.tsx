import { Input } from '@/components/ui/input';
import { User, Phone, Video, MoreVertical, Paperclip, Send, Users, CheckCircle, Smile, Shield, Menu } from 'lucide-react';

export const ChatPanel = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <div className="flex-1 flex flex-col min-w-0 relative">
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white relative z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm md:text-xl text-gray-600">#</span>
        <div>
          <span className="text-sm md:text-lg font-semibold text-gray-900">general</span>
          <div className="flex items-center whitespace-nowrap space-x-3 text-sm text-green-600">
            <span className="text-gray-500">4 members</span>
            <Shield className="w-3 h-3" />
            <span>Encrypted</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-2">
        <Users className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer hidden sm:block" />
        <Phone className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer hidden sm:block" />
        <Video className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer hidden sm:block" />
        <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-start space-x-3">

        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1 flex-wrap">
            <span className="text-sm font-medium text-red-600">System</span>
            <span className="text-xs text-gray-500">1h ago</span>
            <Shield className="w-3 h-3 text-green-600" />
          </div>
          <div className="text-sm text-gray-900">
            Welcome to the secure legal messaging platform! All messages are end-to-end encrypted and audit logged.
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-4 mb-4">
        <Paperclip className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600 rounded-lg" />
        <Smile className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600 rounded-lg" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Message general..."
            className='w-full pl-4 pr-16 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-xs text-green-600">E2E</span>
          </div>
        </div>
        <button className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-150">
          <Send className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 flex-wrap gap-2">
        <div className="flex items-center space-x-4 flex-wrap">
          <span>🔒 End-to-end encrypted</span>
          <span className="hidden sm:inline">📝 All messages logged</span>
          <span className="hidden sm:inline">⚖️ RBAC enforced</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-500 w-3 h-3" />
          <span>Secure</span>
        </div>
      </div>
    </div>
  </div>
)
