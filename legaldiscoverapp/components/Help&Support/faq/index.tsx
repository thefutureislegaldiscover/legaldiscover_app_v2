import { useState } from 'react';
import { ChevronRight, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';

const categories = [
  { name: 'All Categories', count: 24 },
  { name: 'Getting Started', count: 6 },
  { name: 'Case Management', count: 5 },
  { name: 'Document Management', count: 4 },
  { name: 'Billing & Finance', count: 3 },
  { name: 'Security & Privacy', count: 4 },
  { name: 'Integrations', count: 2 },
];

const faqData = [
  {
    question: "How do I get started with LegalDiscover?",
    category: "Getting Started",
    content: "Getting started is easy! First, log in with your credentials. You'll be taken to the dashboard where you can see an overview of your cases, documents, and tasks. Start by exploring the main navigation menu to familiarize yourself with the different modules.",
    likes: 15,
    dislikes: 2
  },
  {
    question: "How do I create a new case?",
    category: "Case Management",
    content: "To create a new case, navigate to the Cases section and click the \"New Case\" button. Fill in the required information including case title, client details, case type, and priority level. You can also assign attorneys and set important dates.",
    likes: 12,
    dislikes: 1
  },
  {
    question: "How do I upload and organize documents?",
    category: "Document Management",
    content: "In the Discovery section, click \"Upload Documents\" to add files. You can drag and drop multiple files at once. The AI system will automatically analyze documents for privilege, relevance, and confidentiality levels. Use tags and folders to organize your documents effectively.",
    likes: 18,
    dislikes: 0
  },
  {
    question: "How secure is my data in LegalDiscover?",
    category: "Security & Privacy",
    content: "LegalDiscover implements enterprise-grade security measures including end-to-end encryption, role-based access control, multi-factor authentication, and comprehensive audit logging. All data is encrypted both in transit and at rest, and we comply with industry standards including OWASP Top 10.",
    likes: 22,
    dislikes: 1
  },
  {
    question: "How do I track billable hours and generate invoices?",
    category: "Billing & Finance",
    content: "Use the time tracking feature in the Billing section to log hours against specific cases and clients. The system can automatically generate invoices based on your time entries and billing rates. You can also set up automated billing cycles and payment reminders.",
    likes: 14,
    dislikes: 3
  },
  {
    question: "What are the different user roles and permissions?",
    category: "Getting Started",
    content: "LegalDiscover supports multiple user roles including Super Admin, Firm Admin, Senior Partner, Partner, Associate, Paralegal, Secretary, and Client. Each role has specific permissions that control access to cases, documents, billing information, and administrative functions.",
    likes: 16,
    dislikes: 2
  }
];

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Categories');


  const filteredFaqs = activeCategory === 'All Categories'
    ? faqData
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              setActiveCategory(cat.name);
              setActiveIndex(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${activeCategory === cat.name
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
              }`}
          >
            {cat.name} ({cat.count})
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {activeIndex === index && (
                <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1">
                  <div className="text-gray-600 leading-relaxed mb-6">
                    {faq.content}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Was this helpful?</span>
                      <div className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4 text-green-500" /> {faq.likes}
                      </div>
                      <div className="flex items-center gap-1 hover:text-red-600 transition-colors">
                        <ThumbsDown className="w-4 h-4 text-red-500" /> {faq.dislikes}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                      {faq.category.split(' ')[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <span className="text-2xl text-gray-400">?</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No FAQs found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};