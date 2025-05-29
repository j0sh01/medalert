
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmergencyButton } from '@/components/EmergencyButton';
import { SymptomChecker } from '@/components/SymptomChecker';
import { DoctorFinder } from '@/components/DoctorFinder';
import { 
  Heart, 
  Stethoscope, 
  MapPin, 
  Clock, 
  Calendar,
  Pill
} from 'lucide-react';

export const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-400">Emergency</h3>
                <p className="text-sm text-muted-foreground">Get immediate help</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Health Check</h3>
                <p className="text-sm text-muted-foreground">Analyze symptoms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Book Appointment</h3>
                <p className="text-sm text-muted-foreground">Schedule consultation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="health" className="gap-2">
            <Stethoscope className="h-4 w-4" />
            Health Check
          </TabsTrigger>
          <TabsTrigger value="doctors" className="gap-2">
            <Heart className="h-4 w-4" />
            Find Doctors
          </TabsTrigger>
          <TabsTrigger value="pharmacy" className="gap-2">
            <Pill className="h-4 w-4" />
            Pharmacy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="health" className="animate-fade-in">
          <SymptomChecker />
        </TabsContent>
        
        <TabsContent value="doctors" className="animate-fade-in">
          <DoctorFinder />
        </TabsContent>

        <TabsContent value="pharmacy" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Nearby Pharmacies
              </CardTitle>
              <CardDescription>
                Find pharmacies with medication availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Pharmacy finder coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your healthcare journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Symptom check completed</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="text-center py-4 text-muted-foreground">
              <p>No recent activity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Button */}
      <EmergencyButton />
    </div>
  );
};
