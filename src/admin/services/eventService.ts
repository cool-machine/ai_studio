import { Event } from '../../types';
import { events as initialEvents } from '../../data/events';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for events
let events = [...initialEvents];

// Get all events
export const getAllEvents = (): Event[] => {
  return events;
};

// Get event by ID
export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

// Create new event
export const createEvent = (eventData: Omit<Event, 'id'>): Event => {
  const newEvent: Event = {
    id: uuidv4(),
    ...eventData
  };
  
  events = [...events, newEvent];
  return newEvent;
};

// Update event
export const updateEvent = (id: string, eventData: Partial<Event>): Event | undefined => {
  const eventIndex = events.findIndex(event => event.id === id);
  
  if (eventIndex === -1) {
    return undefined;
  }
  
  const updatedEvent = {
    ...events[eventIndex],
    ...eventData
  };
  
  events = [
    ...events.slice(0, eventIndex),
    updatedEvent,
    ...events.slice(eventIndex + 1)
  ];
  
  return updatedEvent;
};

// Delete event
export const deleteEvent = (id: string): boolean => {
  const eventIndex = events.findIndex(event => event.id === id);
  
  if (eventIndex === -1) {
    return false;
  }
  
  events = [
    ...events.slice(0, eventIndex),
    ...events.slice(eventIndex + 1)
  ];
  
  return true;
};

// Search events
export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return events.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.location.toLowerCase().includes(lowercaseQuery)
  );
};