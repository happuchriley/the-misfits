import React from "react";
import RegistrationForm from "../../components/RegistrationForm";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const success = await register(formData.email, formData.password);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </a>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-red-600 text-center text-sm">{error}</div>}
          <RegistrationForm onSubmit={handleRegister} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}
