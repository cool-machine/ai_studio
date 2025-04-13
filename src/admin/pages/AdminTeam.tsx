import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminFormField from '../components/AdminFormField';
import { TeamMember } from '../../types';
import { 
  getAllTeamMembers, 
  getTeamMemberById, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember,
  searchTeamMembers
} from '../services/teamService';

const AdminTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TeamMember>();

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = () => {
    const allMembers = getAllTeamMembers();
    setTeamMembers(allMembers);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      loadTeamMembers();
    } else {
      const filteredMembers = searchTeamMembers(query);
      setTeamMembers(filteredMembers);
    }
  };

  const handleAddClick = () => {
    setCurrentMember(null);
    reset({
      name: '',
      role: '',
      bio: '',
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (member: TeamMember) => {
    setCurrentMember(member);
    reset({
      name: member.name,
      role: member.role,
      bio: member.bio,
      imageUrl: member.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (member: TeamMember) => {
    setCurrentMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (data: Partial<TeamMember>) => {
    try {
      if (currentMember) {
        // Update existing team member
        const updatedMember = updateTeamMember(currentMember.id, data);
        
        if (updatedMember) {
          toast.success('Team member updated successfully');
          loadTeamMembers();
          setIsModalOpen(false);
        } else {
          toast.error('Failed to update team member');
        }
      } else {
        // Create new team member
        const newMember = createTeamMember({
          name: data.name || '',
          role: data.role || '',
          bio: data.bio || '',
          imageUrl: data.imageUrl || '',
        });
        
        toast.success('Team member created successfully');
        loadTeamMembers();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error saving team member:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentMember) {
      const success = deleteTeamMember(currentMember.id);
      
      if (success) {
        toast.success('Team member deleted successfully');
        loadTeamMembers();
      } else {
        toast.error('Failed to delete team member');
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      header: 'Photo',
      accessor: (member: TeamMember) => (
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img
            src={member.imageUrl}
            alt={member.name}
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
      header: 'Role',
      accessor: 'role',
    },
    {
      header: 'Bio',
      accessor: (member: TeamMember) => (
        <div className="truncate max-w-xs">{member.bio}</div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Manage Team</h1>
      
      <AdminTable
        data={teamMembers}
        columns={columns}
        keyField="id"
        title="Team Members"
        addButtonLabel="Add Team Member"
        onAddClick={handleAddClick}
        searchPlaceholder="Search team members..."
        onSearch={handleSearch}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      {/* Add/Edit Team Member Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentMember ? 'Edit Team Member' : 'Add New Team Member'}
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
            label="Role"
            name="role"
            register={register}
            error={errors.role}
            required
          />
          
          <AdminFormField
            label="Bio"
            name="bio"
            register={register}
            error={errors.bio}
            type="textarea"
            required
          />
          
          <AdminFormField
            label="Photo URL"
            name="imageUrl"
            register={register}
            error={errors.imageUrl}
            placeholder="https://example.com/photo.jpg"
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
              {currentMember ? 'Update Team Member' : 'Add Team Member'}
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
          <p className="mb-4">Are you sure you want to delete the team member "{currentMember?.name}"? This action cannot be undone.</p>
          
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

export default AdminTeam;