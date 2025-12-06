import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Bot",
  description: "Форма оценки проекта с генерацией отчёта",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ru">
    <body>{children}</body>
  </html>
);

export default RootLayout;
