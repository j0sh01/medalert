
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Navigation,
  Radio,
  Activity
} from 'lucide-react';

export const EmergencyResponderDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">AVAILABLE</p>
                <p className="text-sm text-muted-foreground">Current Status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Active Emergencies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">8m</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Truck className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Calls Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="emergencies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emergencies" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Emergency Calls
          </TabsTrigger>
          <TabsTrigger value="dispatch" className="gap-2">
            <Navigation className="h-4 w-4" />
            Live Dispatch
          </TabsTrigger>
          <TabsTrigger value="communication" className="gap-2">
            <Radio className="h-4 w-4" />
            Communication
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emergencies" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Active Emergency Calls
              </CardTitle>
              <CardDescription>Incoming distress signals requiring immediate response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* High Priority Emergency */}
                <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Emergency #E001</p>
                        <Badge variant="destructive">HIGH PRIORITY</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Chest pain, male 45 years</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">123 Main St, Downtown</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span className="text-xs">2 min ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">Accept Call</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>

                {/* Medium Priority Emergency */}
                <div className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Emergency #E002</p>
                        <Badge variant="secondary">MEDIUM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Fall injury, elderly female</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">456 Oak Ave, Suburb</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span className="text-xs">5 min ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">Accept Call</Button>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </div>
                </div>

                <div className="text-center py-4 text-muted-foreground">
                  <p>No other active emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dispatch" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-blue-500" />
                Live Dispatch Map
              </CardTitle>
              <CardDescription>Real-time ambulance tracking and navigation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 bg-muted/50 rounded-lg">
                <Navigation className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Interactive Map View</p>
                <p className="text-sm text-muted-foreground mt-2">Live GPS tracking and route optimization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-green-500" />
                Communication Center
              </CardTitle>
              <CardDescription>Coordinate with dispatch and medical teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Communication system coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
