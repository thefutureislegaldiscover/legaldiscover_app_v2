import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface SupportCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  bgColor: string;
  availability: string;
}

const SupportCard: React.FC<SupportCardProps> = ({
  title,
  description,
  buttonText,
  icon,
  bgColor,
  availability,
}) => (
  <div className={`bg-${bgColor}-50 rounded-lg p-6 text-center`}>
    <div className={`w-12 h-12 bg-${bgColor}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
      {icon}
    </div>
    <h3 className={`text-lg font-medium text-gray-900 mb-2`}>{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Button
      className={`h-10 bg-${bgColor}-600 hover:bg-${bgColor}-700 `}
    >
      {buttonText}
    </Button>
    <p className="text-xs text-gray-500 mt-2">{availability}</p>
  </div>
);

const ContactForm = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Send us a message</h3>
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <Input
            type="text"
            className="w-full px-3 h-11 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Input
            type="email"
            className="w-full px-3 h-11 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <Select defaultValue="relevance">
          <SelectTrigger className="h-11 text-sm border-gray-300 hover:border-gray-400">
            <SelectValue placeholder="Sort by Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="relevance">General Question</SelectItem>
              <SelectItem value="date">Technical Issue</SelectItem>
              <SelectItem value="size">Billing Question</SelectItem>
              <SelectItem value="name">Feature Request</SelectItem>
              <SelectItem value="type">Bug Report</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Please describe your question or issue in detail..."
        />
      </div>
      <Button className="px-6 h-10">
        Send Message
      </Button>
    </form>
  </div>
);

export const ContactSupport = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SupportCard
        title="Live Chat"
        description="Get instant help from our support team"
        buttonText="Start Chat"
        icon={<MessageSquare className="text-blue-600" />}
        bgColor="blue"
        availability="Available 24/7"
      />
      <SupportCard
        title="Email Support"
        description="Send us a detailed message"
        buttonText="Send Email"
        icon={<Mail className="text-green-600" />}
        bgColor="green"
        availability="Response within 2 hours"
      />
      <SupportCard
        title="Phone Support"
        description="Speak directly with our experts"
        buttonText="Call Now"
        icon={<Phone className="text-purple-600" />}
        bgColor="purple"
        availability="Mon-Fri 9AM-6PM EST"
      />
    </div>
    <ContactForm />
  </div>
);
