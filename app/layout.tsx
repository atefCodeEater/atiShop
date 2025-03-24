import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";
import RQProvider from "./RQprovider";

const B_Traffic = localFont({
  src: "./fonts/B Traffic_YasDL.com.ttf",
  variable: "--B_Traffic",
});
const B_Traffic_Bold = localFont({
  src: "./fonts/B Traffic Bold_YasDL.com.ttf",
  variable: "--B_Traffic_Bold",
});
const B_Yekan = localFont({
  src: "./fonts/B Yekan_YasDL.com.ttf",
  variable: "--B_Yekan",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${B_Traffic.variable} ${B_Yekan.variable} ${B_Traffic_Bold.variable}
          antialiased`}
      >
        <RQProvider>
          <Provider>{children}</Provider>
        </RQProvider>
      </body>
    </html>
  );
}
