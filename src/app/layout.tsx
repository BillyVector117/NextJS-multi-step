import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { StepperWizardProvider } from "@/context/useStepperWizard";
import { UserInfoProvider } from "@/context/useUserInfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multistep",
  description: "Multistep App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StepperWizardProvider>
          <UserInfoProvider>
            <Navbar />
            {children}
          </UserInfoProvider>
        </StepperWizardProvider>
      </body>
    </html>
  );
}
