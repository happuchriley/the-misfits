import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const ProfileCard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    avatar_url: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) {
        setProfile(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: user.email || '',
          phone: data.phone || '',
          dateOfBirth: data.dateOfBirth || '',
          avatar_url: data.avatar_url || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          postal_code: data.postal_code || '',
          country: data.country || ''
        });
      }
    }
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.phone && !/^[\+]?\d{7,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) newErrors.phone = 'Please enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return formData.avatar_url;
    const fileExt = avatarFile.name.split('.').pop();
    const filePath = `avatars/${user.id}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile, { upsert: true });
    if (uploadError) {
      setErrors({ form: uploadError.message });
      return formData.avatar_url;
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (validateForm()) {
      setLoading(true);
      let avatarUrl = formData.avatar_url;
      if (avatarFile) {
        avatarUrl = await uploadAvatar();
      }
      const { error } = await supabase
        .from('profiles')
        .update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          avatar_url: avatarUrl,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code,
          country: formData.country
        })
        .eq('id', user.id);
      if (!error) {
        setProfile({ ...profile, ...formData, avatar_url: avatarUrl });
        setSuccess('Profile updated!');
        setIsEditing(false);
        setAvatarFile(null);
      } else {
        setErrors({ form: error.message });
      }
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: user?.email || '',
      phone: profile?.phone || '',
      dateOfBirth: profile?.dateOfBirth || '',
      avatar_url: profile?.avatar_url || '',
      address: profile?.address || '',
      city: profile?.city || '',
      state: profile?.state || '',
      postal_code: profile?.postal_code || '',
      country: profile?.country || ''
    });
    setErrors({});
    setIsEditing(false);
    setSuccess(null);
    setAvatarFile(null);
  };

  if (!user) return <div className="text-center text-gray-500">No user info.</div>;
  if (!profile) return <div className="text-center text-gray-500">Loading profile...</div>;

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <img
              src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar_url || '/default-avatar.png'}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2 border"
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={loading} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} placeholder="First name" disabled={loading} />
              {errors.firstName && (<p className="mt-1 text-sm text-red-600">{errors.firstName}</p>)}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Last name" disabled={loading} />
              {errors.lastName && (<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>)}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} disabled className={`w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100 text-gray-500`} placeholder="Email address" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="Phone number" disabled={loading} />
            {errors.phone && (<p className="mt-1 text-sm text-red-600">{errors.phone}</p>)}
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled={loading} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="Street address" disabled={loading} />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="City" disabled={loading} />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="State" disabled={loading} />
            </div>
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input type="text" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="Postal Code" disabled={loading} />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border rounded-md shadow-sm" placeholder="Country" disabled={loading} />
            </div>
          </div>
          {errors.form && <div className="text-red-500 text-sm">{errors.form}</div>}
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors" disabled={loading}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">Logout</button>
      </div>
      {success && <div className="mb-4 text-green-600 text-center text-sm">{success}</div>}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profile.avatar_url || '/default-avatar.png'}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mb-2 border"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2"><span className="font-medium">First Name:</span> {profile.firstName}</div>
          <div className="mb-2"><span className="font-medium">Last Name:</span> {profile.lastName}</div>
          <div className="mb-2"><span className="font-medium">Email:</span> {user.email}</div>
          <div className="mb-2"><span className="font-medium">Phone:</span> {profile.phone || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">Date of Birth:</span> {profile.dateOfBirth || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">Address:</span> {profile.address || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">City:</span> {profile.city || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">State:</span> {profile.state || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">Postal Code:</span> {profile.postal_code || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">Country:</span> {profile.country || <span className="text-gray-400">Not set</span>}</div>
          <div className="mb-2"><span className="font-medium">Account Created:</span> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : <span className="text-gray-400">Not set</span>}</div>
        </div>
      </div>
      <div className="pt-6">
        <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfileCard;
