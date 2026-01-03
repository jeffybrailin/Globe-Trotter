
export interface User {
    id: string;
    email: string;
    name: string;
}

export type TripScope = 'DOMESTIC' | 'NATIONAL' | 'INTERNATIONAL';
export type TripPersona = 'SOLO' | 'COUPLE' | 'FAMILY' | 'FRIENDS';

export interface Trip {
    id: string;
    userId: string;
    title: string;
    description?: string;
    departureCity?: string;
    destinationCity?: string;
    scope?: TripScope;
    persona?: TripPersona;
    startDate: string;
    endDate: string;
    coverImage?: string;
    isPublic: boolean;
    budget?: number;
    stops?: Stop[];
    personaAnswers?: {
        q1: string;
        q2: string;
    };
}

export interface Stop {
    id: string;
    tripId: string;
    city: string;
    country: string;
    arrivalDate: string;
    departureDate: string;
    orderIndex: number;
    accomTier?: 'AFFORDABLE' | 'LUXURY';
    activities?: Activity[];
}

export interface Activity {
    id: string;
    stopId: string;
    name: string;
    category: 'SIGHTSEEING' | 'FOOD' | 'ADVENTURE' | 'RELAX' | 'OTHER';
    cost: number;
    date: string;
    status: 'PLANNED' | 'BOOKED' | 'DONE';
    notes?: string;
}
