
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Heart, 
  LogOut, 
  User, 
  Stethoscope, 
  Truck, 
  Shield,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'doctor':
        return <Stethoscope className="h-4 w-4" />;
      case 'emergency_responder':
        return <Truck className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'doctor':
        return 'default' as const;
      case 'emergency_responder':
        return 'destructive' as const;
      case 'admin':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">MedAlert</h1>
              <p className="text-xs text-muted-foreground">Emergency Healthcare</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Profile Info */}
            {profile && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {profile.first_name} {profile.last_name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={getRoleBadgeVariant(profile.role)} 
                      className="text-xs gap-1"
                    >
                      {getRoleIcon(profile.role)}
                      {profile.role.replace('_', ' ')}
                    </Badge>
                    {!profile.is_verified && profile.role !== 'patient' && (
                      <Badge variant="outline" className="text-xs text-yellow-600">
                        Pending Verification
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Bell className="h-4 w-4" />
            </Button>
            
            <ThemeToggle />
            
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
