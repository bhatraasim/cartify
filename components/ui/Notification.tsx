"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{ message: string; type: NotificationType; id: number } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });

    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
  {children}

  {notification && (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <div
        className={`
          bg-yellow-400/95 text-black max-w-xs w-full rounded-xl shadow-2xl
          backdrop-blur-sm ring-1 ring-yellow-500/40 px-5 py-4 flex items-center
          space-x-4 transition-transform transform hover:scale-[1.03] 
          animate-fadeIn
        `}
        role="alert"
        aria-live="assertive"
      >
        <svg
          className="flex-shrink-0 w-6 h-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-semibold text-sm leading-tight truncate">
          {notification.message}
        </span>
        <button
          onClick={() => setNotification(null)}
          aria-label="Dismiss notification"
          className="ml-auto p-1 rounded-full hover:bg-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )}
</NotificationContext.Provider>
  );
}

function getAlertClass(type: NotificationType): string {
  switch (type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "info":
      return "alert-info";
    default:
      return "alert-info";
  }
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
