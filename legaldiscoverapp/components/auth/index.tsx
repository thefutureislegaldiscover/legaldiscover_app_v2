interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
}

export const AuthWrapper = ({ children, title }: AuthWrapperProps) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 bg-gradient-to-br from-blue-500/10 via-white to-gray-200 dark:from-blue-900/10 dark:via-gray-950 dark:to-gray-800" />
      <div className="z-10 w-full max-w-md bg-white dark:bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-8 md:p-10 space-y-6 border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
            {title}
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-400">
            Access your LegalDiscover dashboard
          </p>
        </div>
        <div>{children}</div>
      </div>
  </div>
);
