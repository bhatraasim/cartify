"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { NotificationProvider } from "./Notification";


const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;



interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {

  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error("Authentication request failed:", error);
      throw new Error("Authentication request failed");
    }
  };

  return (
    <SessionProvider>
      <NotificationProvider>
          {children}
      </NotificationProvider>
      
    </SessionProvider>

  );
}
