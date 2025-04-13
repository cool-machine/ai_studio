import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import AdminFormField from '../components/AdminFormField';
import { SiteSettings } from '../../types';
import { getSettings, updateSettings, resetSettings } from '../services/settingsService';

const AdminSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SiteSettings>();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const settings = getSettings();
    reset(settings);
  };

  const handleFormSubmit = (data: SiteSettings) => {
    setIsLoading(true);
    
    try {
      updateSettings(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error updating settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      try {
        const defaultSettings = resetSettings();
        reset(defaultSettings);
        toast.success('Settings reset to default');
      } catch (error) {
        toast.error('Failed to reset settings');
        console.error('Error resetting settings:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-6">Site Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-neutral-dark mb-4 pb-2 border-b">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminFormField
                  label="Site Name"
                  name="siteName"
                  register={register}
                  error={errors.siteName}
                  required
                />
                
                <AdminFormField
                  label="Tagline"
                  name="tagline"
                  register={register}
                  error={errors.tagline}
                  required
                />
              </div>
              
              <AdminFormField
                label="Logo URL"
                name="logoUrl"
                register={register}
                error={errors.logoUrl}
                placeholder="https://example.com/logo.png"
                required
              />
              
              <AdminFormField
                label="Hero Background URL"
                name="heroBackgroundUrl"
                register={register}
                error={errors.heroBackgroundUrl}
                placeholder="https://example.com/background.jpg"
                required
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-neutral-dark mb-4 pb-2 border-b">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminFormField
                  label="Contact Email"
                  name="contactEmail"
                  register={register}
                  error={errors.contactEmail}
                  type="email"
                  required
                />
                
                <AdminFormField
                  label="Contact Phone"
                  name="contactPhone"
                  register={register}
                  error={errors.contactPhone}
                  required
                />
              </div>
              
              <AdminFormField
                label="Address"
                name="address"
                register={register}
                error={errors.address}
                type="textarea"
                rows={2}
                required
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-neutral-dark mb-4 pb-2 border-b">Social Media Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 text-primary mr-2" />
                  <AdminFormField
                    label="LinkedIn URL"
                    name="socialLinks.linkedin"
                    register={register}
                    error={errors.socialLinks?.linkedin as any}
                    placeholder="https://linkedin.com/company/your-company"
                  />
                </div>
                
                <div className="flex items-center">
                  <Twitter className="h-5 w-5 text-primary mr-2" />
                  <AdminFormField
                    label="Twitter URL"
                    name="socialLinks.twitter"
                    register={register}
                    error={errors.socialLinks?.twitter as any}
                    placeholder="https://twitter.com/your-handle"
                  />
                </div>
                
                <div className="flex items-center">
                  <Facebook className="h-5 w-5 text-primary mr-2" />
                  <AdminFormField
                    label="Facebook URL"
                    name="socialLinks.facebook"
                    register={register}
                    error={errors.socialLinks?.facebook as any}
                    placeholder="https://facebook.com/your-page"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
              >
                Reset to Default
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;