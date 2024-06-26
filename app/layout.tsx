"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../public/css/main.css";
import "../public/css/tutorial.css";
import "../public/css/start.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { AppStateProvider } from "./api/AppStateContext";
import React, { Suspense } from 'react';

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <html lang="en">
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        </head>
        <body>
          <Suspense fallback={<div>Loading...</div>}/>
          <AppStateProvider>{children}</AppStateProvider>
        </body>
      </html>
    </DndProvider>
  );
}

