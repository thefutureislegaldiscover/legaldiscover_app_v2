"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Shield, Globe } from "lucide-react";
import { AIActionCard } from "../AIActionCard";
import { LegalChatInterface } from "../legalChatInterface";

type AiMode = "private" | "public";

const modeStyles = {
  private: {
    button: "bg-blue-600 text-white",
    banner: "bg-blue-50 border-blue-200",
    title: "text-blue-900",
    text: "text-blue-700",
    icon: <Shield className="mr-3 w-5 h-5 mt-0.5 text-blue-600" />,
    titleText: "Private AI Model — Maximum Security",
    description:
      "This AI runs on your secure infrastructure with encrypted conversations. No data ever leaves your system.",
  },
  public: {
    button: "bg-green-600 text-white",
    banner: "bg-green-50 border-green-200",
    title: "text-green-900",
    text: "text-green-700",
    icon: <Globe className="mr-3 w-5 h-5 mt-0.5 text-green-600" />,
    titleText: "Public AI Model — General Research",
    description:
      "This AI uses a general public model. Avoid sending sensitive info, as conversations may contribute to model training.",
  },
};

export const AILegalConsultants = () => {
  const [aiMode, setAiMode] = useState<AiMode>("private");

  const ModeToggle = () => {
    const inactive =
      "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

    return (
      <div className="flex">
        <Button
          className={`rounded-r-none ${aiMode === "private" ? modeStyles.private.button : inactive}`}
          onClick={() => setAiMode("private")}
        >
          <Shield className="w-4 h-4" />
          Private AI
        </Button>
        <Button
          className={`rounded-l-none border-l-0 ${aiMode === "public" ? modeStyles.public.button : inactive}`}
          onClick={() => setAiMode("public")}
        >
          <Globe className="w-4 h-4" />
          Public AI
        </Button>
      </div>
    );
  };

  const InfoBanner = () => {
    const style = modeStyles[aiMode];

    return (
      <div className={`rounded-lg p-4 border ${style.banner}`}>
        <div className="flex">
          {style.icon}
          <div>
            <h3 className={`text-sm font-medium ${style.title}`}>{style.titleText}</h3>
            <p className={`text-sm mt-1 ${style.text}`}>{style.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" dark:bg-gray-950 p-4 sm:p-6 lg:p-8 font-sans min-h-screen transition-all">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Legal Consultants
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose between private secure AI or public research AI
            </p>
          </div>
          <ModeToggle />
        </div>
        <InfoBanner />
      </div>
      <div className="flex flex-wrap mt-5 gap-5">
        <LegalChatInterface aiMode={aiMode} />
        <AIActionCard aiMode={aiMode} />
      </div>
    </div>
  );
};
