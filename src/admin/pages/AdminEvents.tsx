import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminFormField from '../components/AdminFormField';
import { Event } from '../../types';
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  searchEvents
} from '../services/eventService';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Event>();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const allEvents = getAllEvents();
    setEvents(allEvents);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      loadEvents();
    } else {
      const filteredEvents = searchEvents(query);
      setEvents(filteredEvents);
    }
  };

  const handleAddClick = () => {
    setCurrentEvent(null);
    setEventDate(null);
    reset({
      title: '',
      location: '',
      description: '',
      imageUrl: '',
      type: 'upcoming',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (event: Event) => {
    setCurrentEvent(event);
    setEventDate(new Date(event.date));
    reset({
      title: event.title,
      location: event.location,
      description: event.description,
      imageUrl: event.imageUrl,
      type: event.type,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (event: Event) => {
    setCurrentEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (data: Partial<Event>) => {
    if (!eventDate) {
      toast.error('Please select a date and time for the event');
      return;
    }

    try {
      if (currentEvent) {
        // Update existing event
        const updatedEvent = updateEvent(currentEvent.id, {
          ...data,
          date: eventDate.toISOString(),
        });
        
        if (updatedEvent) {
          toast.success('Event updated successfully');
          loadEvents();
          setIsModalOpen(false);
        } else {
          toast.error('Failed to update event');
        }
      } else {
        // Create new event
        const newEvent = createEvent({
          title: data.title || '',
          date: eventDate.toISOString(),
          location: data.location || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          type: data.type as 'upcoming' | 'past' || 'upcoming',
        });
        
        toast.success('Event created successfully');
        loadEvents();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentEvent) {
      const success = deleteEvent(currentEvent.id);
      
      if (success) {
        toast.success('Event deleted successfully');
        loadEvents();
      } else {
        toast.error('Failed to delete event');
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Date',
      accessor: (event: Event) => {
        const date = new Date(event.date);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      },
    },
    {
      header: 'Location',
      accessor: 'location',
    },
    {
      header: 'Type',
      accessor: 'type',
      cell: (event: Event) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          event.type === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {event.type === 'upcoming' ? 'Upcoming' : 'Past'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Manage Events</h1>
      
      <AdminTable
        data={events}
        columns={columns}
        keyField="id"
        title="Events"
        addButtonLabel="Add Event"
        onAddClick={handleAddClick}
        searchPlaceholder="Search events..."
        onSearch={handleSearch}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      {/* Add/Edit Event Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentEvent ? 'Edit Event' : 'Add New Event'}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <AdminFormField
            label="Title"
            name="title"
            register={register}
            error={errors.title}
            required
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-dark mb-1">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholderText="Select date and time"
            />
            {!eventDate && (
              <p className="mt-1 text-sm text-red-600">Date and time is required</p>
            )}
          </div>
          
          <AdminFormField
            label="Location"
            name="location"
            register={register}
            error={errors.location}
            required
          />
          
          <AdminFormField
            label="Description"
            name="description"
            register={register}
            error={errors.description}
            type="textarea"
            required
          />
          
          <AdminFormField
            label="Image URL"
            name="imageUrl"
            register={register}
            error={errors.imageUrl}
            placeholder="https://example.com/image.jpg"
            required
          />
          
          <AdminFormField
            label="Type"
            name="type"
            register={register}
            error={errors.type}
            type="select"
            options={[
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'past', label: 'Past' },
            ]}
            required
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-neutral-dark hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {currentEvent ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </AdminModal>
      
      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        size="sm"
      >
        <div>
          <p className="mb-4">Are you sure you want to delete the event "{currentEvent?.title}"? This action cannot be undone.</p>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-neutral-dark hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminEvents;