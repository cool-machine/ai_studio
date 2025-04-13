import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileText, Video, Headphones, PenTool as Tool } from 'lucide-react';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminFormField from '../components/AdminFormField';
import { Resource } from '../../types';
import { 
  getAllResources, 
  getResourceById, 
  createResource, 
  updateResource, 
  deleteResource,
  searchResources
} from '../services/resourceService';

const AdminResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Resource>();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = () => {
    const allResources = getAllResources();
    setResources(allResources);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      loadResources();
    } else {
      const filteredResources = searchResources(query);
      setResources(filteredResources);
    }
  };

  const handleAddClick = () => {
    setCurrentResource(null);
    reset({
      title: '',
      description: '',
      link: '',
      category: 'article',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (resource: Resource) => {
    setCurrentResource(resource);
    reset({
      title: resource.title,
      description: resource.description,
      link: resource.link,
      category: resource.category,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (resource: Resource) => {
    setCurrentResource(resource);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (data: Partial<Resource>) => {
    try {
      if (currentResource) {
        // Update existing resource
        const updatedResource = updateResource(currentResource.id, data);
        
        if (updatedResource) {
          toast.success('Resource updated successfully');
          loadResources();
          setIsModalOpen(false);
        } else {
          toast.error('Failed to update resource');
        }
      } else {
        // Create new resource
        const newResource = createResource({
          title: data.title || '',
          description: data.description || '',
          link: data.link || '',
          category: data.category as 'article' | 'video' | 'podcast' | 'tool' || 'article',
        });
        
        toast.success('Resource created successfully');
        loadResources();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error saving resource:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentResource) {
      const success = deleteResource(currentResource.id);
      
      if (success) {
        toast.success('Resource deleted successfully');
        loadResources();
      } else {
        toast.error('Failed to delete resource');
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'article':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'podcast':
        return <Headphones className="h-5 w-5 text-purple-600" />;
      case 'tool':
        return <Tool className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Category',
      accessor: (resource: Resource) => (
        <div className="flex items-center">
          {getCategoryIcon(resource.category)}
          <span className="ml-2 capitalize">{resource.category}</span>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: (resource: Resource) => (
        <div className="truncate max-w-xs">{resource.description}</div>
      ),
    },
    {
      header: 'Link',
      accessor: (resource: Resource) => (
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark"
        >
          View Resource
        </a>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Manage Resources</h1>
      
      <AdminTable
        data={resources}
        columns={columns}
        keyField="id"
        title="Resources"
        addButtonLabel="Add Resource"
        onAddClick={handleAddClick}
        searchPlaceholder="Search resources..."
        onSearch={handleSearch}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      {/* Add/Edit Resource Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentResource ? 'Edit Resource' : 'Add New Resource'}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <AdminFormField
            label="Title"
            name="title"
            register={register}
            error={errors.title}
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
            label="Link"
            name="link"
            register={register}
            error={errors.link}
            placeholder="https://example.com/resource"
            required
          />
          
          <AdminFormField
            label="Category"
            name="category"
            register={register}
            error={errors.category}
            type="select"
            options={[
              { value: 'article', label: 'Article' },
              { value: 'video', label: 'Video' },
              { value: 'podcast', label: 'Podcast' },
              { value: 'tool', label: 'Tool' },
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
              {currentResource ? 'Update Resource' : 'Add Resource'}
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
          <p className="mb-4">Are you sure you want to delete the resource "{currentResource?.title}"? This action cannot be undone.</p>
          
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

export default AdminResources;