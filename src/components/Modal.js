import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', slideFrom }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${slideFrom === 'top' ? 'flex flex-col items-center justify-start p-0' : 'flex items-center justify-center p-4'}`}>
      <div
        className={`bg-white rounded-b-2xl shadow-xl w-full ${slideFrom === 'top' ? 'max-w-full' : sizeClasses[size]} max-h-[90vh] overflow-y-auto
          ${slideFrom === 'top' ? 'animate-slide-down-modal' : ''}
        `}
        style={slideFrom === 'top' ? { marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
