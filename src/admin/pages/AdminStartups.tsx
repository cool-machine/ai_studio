import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminFormField from '../components/AdminFormField';
import { Startup } from '../../types';
import { 
  getAllStartups, 
  getStartupById, 
  createStartup, 
  updateStartup, 
  deleteStartup,
  searchStartups
} from '../services/startupService';

const AdminStartups: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStartup, setCurrentStartup] = useState<Startup | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Startup>();

  useEffect(() => {
    loadStartups();
  }, []);

  const loadStartups = () => {
    const allStartups = getAllStartups();
    setStartups(allStartups);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      loadStartups();
    } else {
      const filteredStartups = searchStartups(query);
      setStartups(filteredStartups);
    }
  };

  const handleAddClick = () => {
    setCurrentStartup(null);
    reset({
      name: '',
      description: '',
      logo: '',
      website: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (startup: Startup) => {
    setCurrentStartup(startup);
    reset({
      name: startup.name,
      description: startup.description,
      logo: startup.logo,
      website: startup.website,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (startup: Startup) => {
    setCurrentStartup(startup);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (data: Partial<Startup>) => {
    try {
      if (currentStartup) {
        // Update existing startup
        const updatedStartup = updateStartup(currentStartup.id, data);
        
        if (updatedStartup) {
          toast.success('Startup updated successfully');
          loadStartups();
          setIsModalOpen(false);
        } else {
          toast.error('Failed to update startup');
        }
      } else {
        // Create new startup
        const newStartup = createStartup({
          name: data.name || '',
          description: data.description || '',
          logo: data.logo || '',
          website: data.website,
        });
        
        toast.success('Startup created successfully');
        loadStartups();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error saving startup:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentStartup) {
      const success = deleteStartup(currentStartup.id);
      
      if (success) {
        toast.success('Startup deleted successfully');
        loadStartups();
      } else {
        toast.error('Failed to delete startup');
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      header: 'Logo',
      accessor: (startup: Startup) => (
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img
            src={startup.logo}
            alt={`${startup.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Description',
      accessor: (startup: Startup) => (
        <div className="truncate max-w-xs">{startup.description}</div>
      ),
    },
    {
      header: 'Website',
      accessor: (startup: Startup) => (
        startup.website ? (
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark"
          >
            {new URL(startup.website).hostname}
          </a>
        ) : (
          <span className="text-gray-400">N/A</span>
        )
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Manage Startups</h1>
      
      <AdminTable
        data={startups}
        columns={columns}
        keyField="id"
        title="Startups"
        addButtonLabel="Add Startup"
        onAddClick={handleAddClick}
        searchPlaceholder="Search startups..."
        onSearch={handleSearch}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      {/* Add/Edit Startup Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentStartup ? 'Edit Startup' : 'Add New Startup'}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <AdminFormField
            label="Name"
            name="name"
            register={register}
            error={errors.name}
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
            label="Logo URL"
            name="logo"
            register={register}
            error={errors.logo}
            placeholder="https://example.com/logo.jpg"
            required
          />
          
          <AdminFormField
            label="Website URL"
            name="website"
            register={register}
            error={errors.website}
            placeholder="https://example.com"
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
              {currentStartup ? 'Update Startup' : 'Add Startup'}
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
          <p className="mb-4">Are you sure you want to delete the startup "{currentStartup?.name}"? This action cannot be undone.</p>
          
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

export default AdminStartups;