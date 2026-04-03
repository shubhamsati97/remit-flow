import { LogOut, Settings, Bell, HelpCircle, ChevronRight } from "lucide-react";

const menuItems = [
  { icon: Settings, label: "Settings" },
  { icon: Bell, label: "Notifications" },
  { icon: HelpCircle, label: "Help & Support" },
];

const ProfilePage = () => {
  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto space-y-4">
      <h1 className="text-xl font-bold text-foreground">Profile</h1>

      {/* User Card */}
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-lg font-bold text-primary">
          JD
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">Juan Delgado</p>
          <p className="text-sm text-muted-foreground">juan@email.com</p>
          <p className="text-xs text-primary mt-0.5">Verified ✓</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="glass-card divide-y divide-border/50">
        {menuItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 w-full px-5 py-4 text-left hover:bg-muted/30 transition-colors"
          >
            <Icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground flex-1">{label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="glass-card flex items-center gap-3 w-full px-5 py-4 hover:bg-destructive/10 transition-colors">
        <LogOut className="w-4 h-4 text-destructive" />
        <span className="text-sm font-medium text-destructive">Log Out</span>
      </button>
    </div>
  );
};

export default ProfilePage;
