import "./globals.css";
import ScrollProgress from "../components/ScrollProgress";
import CursorFollower from "../components/CursorFollower";
import Header from "../components/Header";

export const metadata = {
  title: "Sebastian Zapata — Electrical Engineering",
  description: "Electrical Engineering student specializing in power electronics and embedded systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-24">
        <CursorFollower />
        <ScrollProgress />
        <Header />
        {children}
      </body>
    </html>
  );
}
