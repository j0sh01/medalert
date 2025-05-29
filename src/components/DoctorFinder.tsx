
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Clock, Phone, Calendar } from 'lucide-react';

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Amara Okafor",
    specialty: "General Medicine",
    rating: 4.8,
    distance: "1.2 km",
    availability: "Available now",
    image: "/lovable-uploads/doctor1.jpg",
    location: "Lagos Medical Center"
  },
  {
    id: 2,
    name: "Dr. Kwame Asante",
    specialty: "Cardiology",
    rating: 4.9,
    distance: "2.1 km",
    availability: "Next: 2:30 PM",
    image: "/lovable-uploads/doctor2.jpg",
    location: "Heart Care Clinic"
  },
  {
    id: 3,
    name: "Dr. Fatima Al-Hassan",
    specialty: "Pediatrics",
    rating: 4.7,
    distance: "3.5 km",
    availability: "Available now",
    image: "/lovable-uploads/doctor3.jpg",
    location: "Children's Health Center"
  }
];

const specialties = [
  "General Medicine", "Cardiology", "Pediatrics", "Dermatology", 
  "Orthopedics", "Gynecology", "Psychiatry", "Emergency Medicine"
];

export const DoctorFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors] = useState(mockDoctors);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Healthcare Providers</CardTitle>
          <CardDescription>
            Search for doctors and specialists near you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search doctors or specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!selectedSpecialty ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedSpecialty('')}
            >
              All Specialties
            </Badge>
            {specialties.map(specialty => (
              <Badge
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Results */}
      <div className="space-y-4">
        {filteredDoctors.map(doctor => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {doctor.distance} • {doctor.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {doctor.availability}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Book Appointment
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
