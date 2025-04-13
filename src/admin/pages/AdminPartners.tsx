import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminFormField from '../components/AdminFormField';
import { Partner } from '../../types';
import { 
  getAllPartners, 
  getPartnerById, 
  createPartner, 
  updatePartner, 
  deletePartner,
  searchPartners
} from '../services/partnerService';

const AdminPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partner>();

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = () => {
    const allPartners = getAllPartners();
    setPartners(allPartners);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      loadPartners();
    } else {
      const filteredPartners = searchPartners(query);
      setPartners(filteredPartners);
    }
  };

  const handleAddClick = () => {
    setCurrentPartner(null);
    reset({
      name: '',
      logo: '',
      website: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (partner: Partner) => {
    setCurrentPartner(partner);
    reset({
      name: partner.name,
      logo: partner.logo,
      website: partner.website,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (partner: Partner) => {
    setCurrentPartner(partner);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (data: Partial<Partner>) => {
    try {
      if (currentPartner) {
        // Update existing partner
        const updatedPartner = updatePartner(currentPartner.id, data);
        
        if (updatedPartner) {
          toast.success('Partner updated successfully');
          loadPartners();
          setIsModalOpen(false);
        } else {
          toast.error('Failed to update partner');
        }
      } else {
        // Create new partner
        const newPartner = createPartner({
          name: data.name || '',
          logo: data.logo || '',
          website: data.website || '',
        });
        
        toast.success('Partner created successfully');
        loadPartners();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error saving partner:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentPartner) {
      const success = deletePartner(currentPartner.id);
      
      if (success) {
        toast.success('Partner deleted successfully');
        loadPartners();
      } else {
        toast.error('Failed to delete partner');
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      header: 'Logo',
      accessor: (partner: Partner) => (
        <div className="h-10 w-10 overflow-hidden">
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      ),
    },
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Website',
      accessor: (partner: Partner) => (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark"
        >
          {new URL(partner.website).hostname}
        </a>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Manage Partners</h1>
      
      <AdminTable
        data={partners}
        columns={columns}
        keyField="id"
        title="Partners"
        addButtonLabel="Add Partner"
        onAddClick={handleAddClick}
        searchPlaceholder="Search partners..."
        onSearch={handleSearch}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      {/* Add/Edit Partner Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPartner ? 'Edit Partner' : 'Add New Partner'}
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
              {currentPartner ? 'Update Partner' : 'Add Partner'}
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
          <p className="mb-4">Are you sure you want to delete the partner "{currentPartner?.name}"? This action cannot be undone.</p>
          
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

export default AdminPartners;