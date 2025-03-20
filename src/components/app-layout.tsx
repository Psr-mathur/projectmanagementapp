import AppSidebar from "./sidebar"; // Import your Sidebar component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}