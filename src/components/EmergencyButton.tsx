
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { toast } from 'sonner';

export const EmergencyButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { latitude, longitude } = useGeolocation();

  const handleEmergencyCall = () => {
    if (isActive) return;

    setIsActive(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger emergency call
          triggerEmergency();
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast.error("Emergency call will be placed in 5 seconds. Tap again to cancel.", {
      duration: 5000,
      action: {
        label: "Cancel",
        onClick: () => {
          clearInterval(timer);
          setIsActive(false);
          setCountdown(0);
          toast.success("Emergency call cancelled");
        }
      }
    });
  };

  const triggerEmergency = () => {
    const locationData = latitude && longitude 
      ? `Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      : 'Location unavailable';
    
    // In a real app, this would contact emergency services
    toast.success(`Emergency alert sent! ${locationData}`);
    
    // Simulate calling emergency services
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={handleEmergencyCall}
        className={`
          h-16 w-16 rounded-full bg-emergency hover:bg-emergency/90 text-white
          shadow-lg hover:shadow-xl transition-all duration-300
          ${isActive ? 'emergency-pulse' : ''}
        `}
        disabled={isActive}
      >
        {isActive ? (
          <span className="text-xl font-bold">{countdown}</span>
        ) : (
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs">SOS</span>
          </div>
        )}
      </Button>
    </div>
  );
};
