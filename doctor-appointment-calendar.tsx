import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar, Clock, Star, Stethoscope, GraduationCap, Building2, Languages, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data with available dates and slots
const doctorData = {
  id: 1,
  name: "Dr. Michael Anderson",
  title: "Cardiologist",
  avatar: "/api/placeholder/100/100",
  rating: 4.8,
  experience: "20+ years",
  education: [
    "MD - Harvard Medical School",
    "Cardiology Fellowship - Mayo Clinic",
    "Board Certified in Cardiovascular Disease"
  ],
  languages: ["English", "Spanish"],
  insurances: ["Blue Cross", "Aetna", "UnitedHealth", "Medicare"],
  specialties: ["General Cardiology", "Preventive Cardiology", "Heart Failure"],
  locations: [
    "Main Clinic - 123 Medical Center Drive",
    "Downtown Office - 456 Health Plaza"
  ],
  bio: "Dr. Anderson is a board-certified cardiologist with over two decades of experience in treating complex cardiovascular conditions. He specializes in preventive cardiology and heart failure management.",
  availableDates: {
    "Main Clinic": {
      "2024-11-17": [
        { id: 1, time: "09:00 AM", available: true },
        { id: 2, time: "10:00 AM", available: true },
        { id: 3, time: "11:00 AM", available: false },
        { id: 4, time: "02:00 PM", available: true }
      ],
      "2024-11-18": [
        { id: 5, time: "09:00 AM", available: true },
        { id: 6, time: "10:00 AM", available: true },
        { id: 7, time: "02:00 PM", available: true }
      ],
      "2024-11-19": [
        { id: 8, time: "09:00 AM", available: true },
        { id: 9, time: "11:00 AM", available: true },
        { id: 10, time: "03:00 PM", available: true }
      ]
    },
    "Downtown Office": {
      "2024-11-17": [
        { id: 11, time: "09:30 AM", available: true },
        { id: 12, time: "10:30 AM", available: false },
        { id: 13, time: "02:30 PM", available: true }
      ],
      "2024-11-18": [
        { id: 14, time: "10:30 AM", available: true },
        { id: 15, time: "01:30 PM", available: true },
        { id: 16, time: "03:30 PM", available: true }
      ],
      "2024-11-19": [
        { id: 17, time: "09:30 AM", available: true },
        { id: 18, time: "11:30 AM", available: true },
        { id: 19, time: "02:30 PM", available: true }
      ]
    }
  },
  visitTypes: [
    { id: 1, name: "New Patient Consultation", duration: "45 min" },
    { id: 2, name: "Follow-up Visit", duration: "30 min" },
    { id: 3, name: "Cardiac Evaluation", duration: "60 min" }
  ]
};

const DoctorAppointment = () => {
  const [selectedLocation, setSelectedLocation] = useState("Main Clinic");
  const [selectedDate, setSelectedDate] = useState(new Date("2024-11-17"));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedVisitType, setSelectedVisitType] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Format date to match the availableDates object keys
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get available time slots for selected date and location
  const getAvailableSlots = () => {
    const formattedDate = formatDate(selectedDate);
    return doctorData.availableDates[selectedLocation]?.[formattedDate] || [];
  };

  // Calculate the available dates for the selected location
  const availableDates = Object.keys(doctorData.availableDates[selectedLocation]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleBooking = () => {
    if (selectedSlot && selectedVisitType) {
      setBookingConfirmed(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <img src={doctorData.avatar} alt={doctorData.name} />
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{doctorData.name}</CardTitle>
              <CardDescription className="text-lg flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                {doctorData.title}
              </CardDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{doctorData.rating}</span>
                </div>
                <Badge variant="secondary">{doctorData.experience}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="booking">Book Appointment</TabsTrigger>
              <TabsTrigger value="profile">Doctor Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="booking" className="space-y-4">
              {bookingConfirmed ? (
                <Alert>
                  <AlertDescription className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <strong>Appointment Confirmed!</strong>
                    </div>
                    <p>Your appointment has been scheduled for:</p>
                    <div className="bg-secondary p-3 rounded-md space-y-1">
                      <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {getAvailableSlots().find(slot => slot.id === selectedSlot)?.time}</p>
                      <p><strong>Location:</strong> {selectedLocation}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      A confirmation email will be sent with appointment details and pre-visit instructions.
                    </p>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Select Visit Type</h3>
                    <Select onValueChange={setSelectedVisitType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose visit type" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctorData.visitTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name} ({type.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Select Location</h3>
                    <Select defaultValue={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(doctorData.availableDates).map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Select Date
                      </h3>
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                          return !availableDates.includes(formatDate(date));
                        }}
                        className="rounded-md border"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Available Times
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getAvailableSlots().map((slot) => (
                          <Button
                            key={slot.id}
                            variant={selectedSlot === slot.id ? "default" : "outline"}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.id)}
                            className="flex items-center justify-center gap-2"
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedSlot && selectedVisitType && (
                    <Button 
                      className="w-full mt-6" 
                      onClick={handleBooking}
                    >
                      Confirm Appointment
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education & Certification
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {doctorData.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctorData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Languages
                  </h3>
                  <div className="flex gap-2">
                    {doctorData.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Insurance Accepted
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctorData.insurances.map((insurance, index) => (
                      <Badge key={index} variant="outline">
                        {insurance}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorAppointment;
