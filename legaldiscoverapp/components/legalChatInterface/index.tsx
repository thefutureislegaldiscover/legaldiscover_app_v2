import { toast } from "sonner";
import { Input } from "../ui/input";
import Markdown from "react-markdown";
import React, { JSX, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/Auth";
import { Eye, Globe, Lock, Send, Shield } from "lucide-react";
import { getAIConversation, sendMssagetoaskAI } from "@/services/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AIMode = "private" | "public";
type ChatRole = "assistant" | "user" | "thinking";

export type ChatMessage = {
  messageId: string;
  role: ChatRole;
  content: string;
  timestamp: string;
};

type AIConversationResponse = {
  items: ChatMessage[];
};

interface LegalChatInterfaceProps {
  aiMode: AIMode;
}

type SendMessageContext = {
  thinkingMessageId: string;
};

const modeStyles: Record<
  AIMode,
  { color: "green" | "blue"; icon: JSX.Element; label: string }
> = {
  public: {
    color: "green",
    icon: <Globe className="w-5 h-5" />,
    label: "Public Mode",
  },
  private: {
    color: "blue",
    icon: <Shield className="w-5 h-5" />,
    label: "Secure Mode",
  },
};

export const LegalChatInterface: React.FC<LegalChatInterfaceProps> = ({
  aiMode,
}) => {
  const { color, icon, label } = modeStyles[aiMode];
  const { token, user } = useAuthStore();
  const [message, setMessage] = useState<string>("");

  const queryClient = useQueryClient();

  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollChatToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  const {
    data: aiConversation = [],
    isLoading,
    error,
  } = useQuery<ChatMessage[], Error>({
    queryKey: ["aiConversation", token, user?.id],
    enabled: Boolean(token && user?.id),
    queryFn: async (): Promise<ChatMessage[]> => {
      const res: AIConversationResponse = await getAIConversation(
        token as string,
        user!.id
      );

      return res.items.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    },
  });
  useEffect(() => {
    if (!aiConversation?.length) return;
    scrollChatToBottom("smooth");
  }, [aiConversation.length]);

  if (error instanceof Error) {
    toast.error(error.message);
  }

  const sendMessageMutation = useMutation<unknown, Error, string, SendMessageContext>(
    {
      mutationFn: async (message: string) => {
        if (!token || !user?.id) throw new Error("Authentication required");
        return sendMssagetoaskAI({ message, userId: user.id }, token);
      },

      onMutate: async (message: string) => {
        const userMessage: ChatMessage = {
          messageId: crypto.randomUUID(),
          role: "user",
          content: message,
          timestamp: new Date().toISOString(),
        };

        const thinkingMessage: ChatMessage = {
          messageId: crypto.randomUUID(),
          role: "thinking",
          content: "Thinking",
          timestamp: new Date().toISOString(),
        };

        queryClient.setQueryData<ChatMessage[]>(
          ["aiConversation", token, user?.id],
          (old = []) => [...old, userMessage, thinkingMessage]
        );

        setMessage("");

        setTimeout(() => scrollChatToBottom("smooth"), 0);

        return { thinkingMessageId: thinkingMessage.messageId };
      },

      onSuccess: (_, __, context) => {
        queryClient.setQueryData<ChatMessage[]>(
          ["aiConversation", token, user?.id],
          (old = []) =>
            old.filter((msg) => msg.messageId !== context?.thinkingMessageId)
        );

        queryClient.invalidateQueries({
          queryKey: ["aiConversation", token, user?.id],
        });
        setTimeout(() => scrollChatToBottom("smooth"), 0);
      },

      onError: (err, _, context) => {
        toast.error(err.message || "Failed to send message");

        queryClient.setQueryData<ChatMessage[]>(
          ["aiConversation", token, user?.id],
          (old = []) =>
            old.filter((msg) => msg.messageId !== context?.thinkingMessageId)
        );

        setTimeout(() => scrollChatToBottom("smooth"), 0);
      },
    }
  );

  const sendMessage = (): void => {
    if (!message.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message);
  };

  return (
    <div className="h-[82.5vh] flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 border-b border-gray-200">
        <div
          className={`text-white p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 bg-${color}-600`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            {aiMode === "public"
              ? "Public AI Legal Consultant"
              : "Private AI Legal Consultant"}
          </h1>
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className={`text-${color}-600`}>
              {aiMode === "private"
                ? "Secure Local AI • Confidential Data Access"
                : "OpenAI GPT-4 • Public Legal Research"}
            </span>
            <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
            <span className="text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* ✅ attach ref here so only this div scrolls */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {aiConversation.map((msg) => (
          <div
            key={msg.messageId}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "thinking" ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
                <span className="text-gray-500 animate-pulse">{msg.content}...</span>
              </div>
            ) : (
              <div
                className={`max-w-3xl px-4 py-3 rounded-lg text-sm shadow ${msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
              >
                <Markdown>{msg.content}</Markdown>
                <div className="mt-1 text-[10px] opacity-60 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="animate-pulse bg-gray-100 rounded-md p-4">
            Loading conversation...
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about public legal research, case law, or statutes..."
            className={`px-4 py-3 md:h-[45px] h-[38px] border border-gray-300 rounded-lg focus:outline-none focus:ring-${aiMode === "public" ? "green" : "blue"
              }-500 focus:border-${aiMode === "public" ? "green" : "blue"
              }-500 transition duration-150 shadow-sm text-gray-700`}
          />

          <Button
            disabled={!message && true}
            className={`flex items-center gap-1 justify-center w-full sm:w-auto cursor-pointer px-4 py-3 md:h-[45px] h-[38px] bg-${aiMode === "public" ? "green" : "blue"
              }-600 text-white font-semibold rounded-lg shadow-md hover:bg-${aiMode === "public" ? "green" : "blue"
              }-700 transition duration-150`}
            onClick={sendMessage}
          >
            <Send className="md:w-5 md:h-5 w-4 h-4 " />
            Send
          </Button>
        </div>

        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>
            {aiMode === "public"
              ? "🌐 Public AI • General research only"
              : "🔒 Encrypted • No data sharing"}
          </span>

          <div className={`flex items-center whitespace-nowrap bg-gray-100 px-3 py-1 rounded-full text-${color}-600`}>
            {aiMode === "public" ? (
              <Eye className="w-3 h-3 mr-1" />
            ) : (
              <Lock className="w-3 h-3 mr-1" />
            )}
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};
