import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminFormField from '../components/AdminFormField';
import { Page } from '../../types';
import { 
  getAllPages, 
  getPageById, 
  createPage, 
  updatePage, 
  deletePage,
  searchPages,
  slugExists
} from '../services/pageService';

const AdminPages: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [content, setContent] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<Page>();
  const title = watch('title', '');

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = () => {
    const allPages = getAllPages();
    setPages(allPages);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      loadPages();
    } else {
      const filteredPages = searchPages(query);
      setPages(filteredPages);
    }
  };

  const handleAddClick = () => {
    setCurrentPage(null);
    setContent('');
    reset({
      title: '',
      slug: '',
      metaDescription: '',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (page: Page) => {
    setCurrentPage(page);
    setContent(page.content);
    reset({
      title: page.title,
      slug: page.slug,
      metaDescription: page.metaDescription,
      isPublished: page.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (page: Page) => {
    setCurrentPage(page);
    setIsDeleteModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const currentSlug = watch('slug');
    
    // Only auto-generate slug if it's empty or matches the previous auto-generated slug
    if (!currentSlug || currentSlug === generateSlug(title)) {
      reset({
        ...watch(),
        slug: generateSlug(newTitle),
      });
    }
  };

  const handleFormSubmit = (data: Partial<Page>) => {
    if (!content) {
      toast.error('Content is required');
      return;
    }

    // Check if slug exists (excluding current page if editing)
    if (slugExists(data.slug || '', currentPage?.id)) {
      toast.error('A page with this slug already exists');
      return;
    }

    try {
      if (currentPage) {
        // Update existing page
        const updatedPage = updatePage(currentPage.id, {
          ...data,
          content,
        });
        
        if (updatedPage) {
          toast.success('Page updated successfully');
          loadPages();
          setIsModalOpen(false);
        } else {
          toast.error('Failed to update page');
        }
      } else {
        // Create new page
        const newPage = createPage({
          title: data.title || '',
          slug: data.slug || '',
          content,
          metaDescription: data.metaDescription || '',
          isPublished: data.isPublished || false,
        });
        
        toast.success('Page created successfully');
        loadPages();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error saving page:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentPage) {
      const success = deletePage(currentPage.id);
      
      if (success) {
        toast.success('Page deleted successfully');
        loadPages();
      } else {
        toast.error('Failed to delete page');
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Slug',
      accessor: 'slug',
    },
    {
      header: 'Status',
      accessor: (page: Page) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          page.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {page.isPublished ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      header: 'Last Updated',
      accessor: (page: Page) => formatDate(page.updatedAt),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Manage Pages</h1>
      
      <AdminTable
        data={pages}
        columns={columns}
        keyField="id"
        title="Pages"
        addButtonLabel="Add Page"
        onAddClick={handleAddClick}
        searchPlaceholder="Search pages..."
        onSearch={handleSearch}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      {/* Add/Edit Page Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPage ? 'Edit Page' : 'Add New Page'}
        size="xl"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <AdminFormField
              label="Title"
              name="title"
              register={register}
              error={errors.title}
              required
              onChange={handleTitleChange}
            />
            
            <AdminFormField
              label="Slug"
              name="slug"
              register={register}
              error={errors.slug}
              required
              placeholder="page-url-slug"
            />
          </div>
          
          <AdminFormField
            label="Meta Description"
            name="metaDescription"
            register={register}
            error={errors.metaDescription}
            type="textarea"
            required
            rows={2}
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-dark mb-1">
              Content <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ indent: '-1' }, { indent: '+1' }],
                  [{ align: [] }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
              className="h-64 mb-12"
            />
            {!content && (
              <p className="mt-1 text-sm text-red-600">Content is required</p>
            )}
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="isPublished"
              {...register('isPublished')}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-neutral-dark">
              Publish this page
            </label>
          </div>
          
          <div className="flex justify-end space-x-3">
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
              {currentPage ? 'Update Page' : 'Add Page'}
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
          <p className="mb-4">Are you sure you want to delete the page "{currentPage?.title}"? This action cannot be undone.</p>
          
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

export default AdminPages;