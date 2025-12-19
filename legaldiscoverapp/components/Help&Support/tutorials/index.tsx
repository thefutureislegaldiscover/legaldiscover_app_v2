
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const tutorialData = [
  {
    title: "Getting Started with LegalDiscover",
    duration: "15 min",
    difficulty: { label: "Beginner", bgColor: "bg-green-100", textColor: "text-green-800" },
    description: "A comprehensive overview of the platform and its key features",
    tags: ["Dashboard Overview", "Navigation", "Basic Setup"],
    buttonText: "Start Tutorial",
  },
  {
    title: "Advanced Case Management",
    duration: "25 min",
    difficulty: { label: "Intermediate", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
    description: "Learn how to effectively manage complex legal cases",
    tags: ["Case Creation", "Document Organization", "Team Collaboration"],
    buttonText: "Start Tutorial",
  },
  {
    title: "AI-Powered Document Review",
    duration: "20 min",
    difficulty: { label: "Intermediate", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
    description: "Leverage AI tools for efficient document analysis",
    tags: ["AI Analysis", "Privilege Review", "Bulk Processing"],
    buttonText: "Start Tutorial",
  },
  {
    title: "Financial Management & Billing",
    duration: "18 min",
    difficulty: { label: "Advanced", bgColor: "bg-red-100", textColor: "text-red-800" },
    description: "Master time tracking, billing, and financial reporting",
    tags: ["Time Tracking", "Invoice Generation", "Financial Reports"],
    buttonText: "Start Tutorial",
  },
];

const TutorialCard = ({ title, duration, difficulty, description, tags, buttonText }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Video className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{duration}</p>
        </div>
      </div>
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${difficulty.bgColor} ${difficulty.textColor}`}>
        {difficulty.label}
      </span>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
          {tag}
        </span>
      ))}
    </div>
    <Button className="w-full px-4 h-10">
      {buttonText}
    </Button>
  </div>
);

export const Tutorials = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tutorialData.map((tutorial, index) => (
        <TutorialCard
          key={index}
          title={tutorial.title}
          duration={tutorial.duration}
          difficulty={tutorial.difficulty}
          description={tutorial.description}
          tags={tutorial.tags}
          buttonText={tutorial.buttonText}
        />
      ))}
    </div>
  </div>
);
