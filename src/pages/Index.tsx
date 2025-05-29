
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InstallPrompt } from '@/components/InstallPrompt';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import { EmergencyResponderDashboard } from '@/components/dashboard/EmergencyResponderDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { usePWA } from '@/hooks/usePWA';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  Stethoscope, 
  MapPin, 
  Clock, 
  Users, 
  Shield,
  Wifi,
  WifiOff,
  Bell,
  LogIn
} from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isInstallable, isInstalled } = usePWA();
  const { latitude, longitude, error: locationError } = useGeolocation();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show install prompt after 3 seconds if not installed
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled && !user) {
        setShowInstallPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timer);
    };
  }, [isInstallable, isInstalled, user]);

  useEffect(() => {
    if (!isOnline) {
      toast.error("You're offline. Some features may be limited.", {
        icon: <WifiOff className="h-4 w-4" />,
        duration: 3000,
      });
    } else {
      toast.success("You're back online!", {
        icon: <Wifi className="h-4 w-4" />,
        duration: 2000,
      });
    }
  }, [isOnline]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success("Notifications enabled! You'll receive emergency alerts.");
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show public landing page if not authenticated
  if (!user) {
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
            
            <div className="flex items-center gap-2">
              {!isOnline && (
                <Badge variant="destructive" className="gap-1">
                  <WifiOff className="h-3 w-3" />
                  Offline
                </Badge>
              )}
              {locationError && (
                <Badge variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  Location off
                </Badge>
              )}
              <Button
                onClick={requestNotificationPermission}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button asChild>
                <a href="/auth" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl font-bold">
              Your Health, Our Priority
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access emergency services, consult with healthcare providers, and manage your health 
              with Africa's most trusted telemedicine platform.
            </p>
            <Button asChild size="lg" className="gap-2">
              <a href="/auth">
                <LogIn className="h-5 w-5" />
                Get Started
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs text-muted-foreground">Emergency Support</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <Stethoscope className="h-8 w-8 text-success" />
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs text-muted-foreground">Verified Doctors</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-8 w-8 text-warning" />
                  <div className="text-2xl font-bold">&lt;5min</div>
                  <div className="text-xs text-muted-foreground">Response Time</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-8 w-8 text-info" />
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-xs text-muted-foreground">Users Helped</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Services */}
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Emergency Services</CardTitle>
              <CardDescription>
                Immediate help when you need it most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Quick Emergency Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up to access our emergency dispatch system with automatic location sharing 
                    and real-time emergency responder coordination.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">What We Provide</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ambulance dispatch</li>
                    <li>• Emergency medical consultation</li>
                    <li>• Hospital location services</li>
                    <li>• 24/7 helpline support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Install Prompt */}
        {showInstallPrompt && (
          <InstallPrompt onClose={() => setShowInstallPrompt(false)} />
        )}
      </div>
    );
  }

  // If user exists but profile is still loading, show loading
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render role-based dashboard
  const renderDashboard = () => {
    switch (profile.role) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'emergency_responder':
        return <EmergencyResponderDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'patient':
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
      
      {/* Install Prompt for authenticated users */}
      {showInstallPrompt && (
        <InstallPrompt onClose={() => setShowInstallPrompt(false)} />
      )}
    </DashboardLayout>
  );
};

export default Index;
