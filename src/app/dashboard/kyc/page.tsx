'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Upload, 
  X, 
  Camera,
  FileText,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Check
} from 'lucide-react';

type VerificationStep = 'personal' | 'documents' | 'selfie' | 'review';
type DocumentType = 'passport' | 'id' | 'driving';

export default function KYCVerificationPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('personal');
  const [docType, setDocType] = useState<DocumentType>('passport');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Document uploads
  const [docFront, setDocFront] = useState<File | null>(null);
  const [docBack, setDocBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  const steps = [
    { id: 'personal', label: 'Personal Info', completed: currentStep !== 'personal' },
    { id: 'documents', label: 'Documents', completed: ['selfie', 'review'].includes(currentStep) },
    { id: 'selfie', label: 'Selfie', completed: currentStep === 'review' },
    { id: 'review', label: 'Review', completed: false },
  ];

  const handleFileUpload = (type: 'front' | 'back' | 'selfie', file: File | null) => {
    if (type === 'front') setDocFront(file);
    if (type === 'back') setDocBack(file);
    if (type === 'selfie') setSelfie(file);
  };

  const handleNext = () => {
    const stepOrder: VerificationStep[] = ['personal', 'documents', 'selfie', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!docFront || !selfie || (docType !== 'passport' && !docBack)) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const fd = new FormData();
      fd.append('firstName', formData.firstName);
      fd.append('lastName', formData.lastName);
      fd.append('dateOfBirth', formData.dateOfBirth);
      fd.append('nationality', formData.nationality);
      fd.append('address', formData.address);
      fd.append('city', formData.city);
      fd.append('postalCode', formData.postalCode);
      fd.append('country', formData.country);
      fd.append('documentType', docType);
      fd.append('docFront', docFront);
      if (docBack) fd.append('docBack', docBack);
      fd.append('selfie', selfie);
      const res = await fetch('/api/kyc', { method: 'POST', credentials: 'include', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError((data as { error?: string }).error || 'Submission failed');
        return;
      }
      setSubmitSuccess(true);
    } catch {
      setSubmitError('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Progress Header */}
      <section className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl tracking-tight font-bold text-[#1e272e] mb-2">
              Identity Verification
            </h1>
            <p className="text-sm text-gray-500 font-light">
              Complete your verification to start trading
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <ShieldCheck className="text-[#46b445] w-5 h-5" />
            <span className="text-sm font-semibold text-[#46b445]">Secure</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step.completed
                    ? 'bg-[#46b445] border-[#46b445] text-white'
                    : currentStep === step.id
                    ? 'border-[#19be00] bg-white text-[#19be00]'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="font-bold text-sm">{index + 1}</span>
                  )}
                </div>
                {!step.completed && currentStep === step.id && (
                  <span className="text-sm font-semibold text-[#1e272e]">{step.label}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-[2px] flex-1 transition-all ${
                  step.completed ? 'bg-[#46b445]' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Step Content */}
      <div className="bg-white rounded-xl p-8">
        {currentStep === 'personal' && (
          <PersonalInfoStep 
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )}

        {currentStep === 'documents' && (
          <DocumentsStep
            docType={docType}
            setDocType={setDocType}
            docFront={docFront}
            docBack={docBack}
            onFileUpload={handleFileUpload}
            onNext={handleNext}
          />
        )}

        {currentStep === 'selfie' && (
          <SelfieStep
            selfie={selfie}
            onFileUpload={handleFileUpload}
            onNext={handleNext}
          />
        )}

        {currentStep === 'review' && (
          <ReviewStep
            formData={formData}
            docType={docType}
            docFront={docFront}
            docBack={docBack}
            selfie={selfie}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
          />
        )}
      </div>

      {/* Help Section */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#1e272e] mb-4">Need Help?</h3>
        <div className="space-y-2">
          <HelpItem label="What documents do I need?" />
          <HelpItem label="How long does verification take?" />
          <HelpItem label="Why do I need to verify my identity?" />
        </div>
      </div>
    </div>
  );
}

// Personal Information Step
function PersonalInfoStep({ 
  formData, 
  setFormData, 
  onNext 
}: { 
  formData: any; 
  setFormData: (data: any) => void; 
  onNext: () => void;
}) {
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormValid = formData.firstName && formData.lastName && formData.dateOfBirth && 
                     formData.nationality && formData.address && formData.city && 
                     formData.postalCode && formData.country;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1e272e] mb-2">Personal Information</h2>
        <p className="text-sm text-gray-500 font-light">
          Please provide your personal details as they appear on your identity document.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            Nationality
          </label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter your nationality"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter your street address"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter your city"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            Postal Code
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter postal code"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19be00] focus:border-transparent outline-none transition-all"
            placeholder="Enter your country"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="bg-[#19be00] hover:bg-[#15a300] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Documents Step
function DocumentsStep({
  docType,
  setDocType,
  docFront,
  docBack,
  onFileUpload,
  onNext
}: {
  docType: DocumentType;
  setDocType: (type: DocumentType) => void;
  docFront: File | null;
  docBack: File | null;
  onFileUpload: (type: 'front' | 'back', file: File | null) => void;
  onNext: () => void;
}) {
  const handleFileChange = (type: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(type, file);
    }
  };

  const getDocTypeLabel = (type: DocumentType) => {
    const labels = {
      passport: 'Passport',
      id: 'National ID Card',
      driving: 'Driving License'
    };
    return labels[type];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1e272e] mb-2">Upload Documents</h2>
        <p className="text-sm text-gray-500 font-light">
          Upload clear photos of your identity document. Make sure all text is readable.
        </p>
      </div>

      {/* Document Type Selection */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-tight mb-3">
          Document Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['passport', 'id', 'driving'] as DocumentType[]).map((type) => (
            <button
              key={type}
              onClick={() => setDocType(type)}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                docType === type
                  ? 'border-[#19be00] bg-green-50 text-[#19be00] font-semibold'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              {getDocTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Document Upload Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadCard
          title="Front of Document"
          file={docFront}
          onFileChange={(e) => handleFileChange('front', e)}
          onRemove={() => onFileUpload('front', null)}
          required
        />
        <FileUploadCard
          title={docType === 'passport' ? "Photo Page" : "Back of Document"}
          file={docBack}
          onFileChange={(e) => handleFileChange('back', e)}
          onRemove={() => onFileUpload('back', null)}
          required={docType !== 'passport'}
        />
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Tips for best results:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Use good lighting and avoid shadows</li>
              <li>Ensure all corners of the document are visible</li>
              <li>Make sure text is clear and readable</li>
              <li>File size should be less than 10MB</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!docFront || (docType !== 'passport' && !docBack)}
          className="bg-[#19be00] hover:bg-[#15a300] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Selfie Step
function SelfieStep({
  selfie,
  onFileUpload,
  onNext
}: {
  selfie: File | null;
  onFileUpload: (type: 'selfie', file: File | null) => void;
  onNext: () => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload('selfie', file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1e272e] mb-2">Take a Selfie</h2>
        <p className="text-sm text-gray-500 font-light">
          Take a clear selfie to verify your identity. Make sure your face is clearly visible.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <FileUploadCard
          title="Selfie Photo"
          file={selfie}
          onFileChange={handleFileChange}
          onRemove={() => onFileUpload('selfie', null)}
          required
          isSelfie
        />
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <Camera className="text-blue-600 w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Selfie Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Look directly at the camera</li>
              <li>Remove glasses or hat if possible</li>
              <li>Ensure good lighting on your face</li>
              <li>Keep a neutral expression</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!selfie}
          className="bg-[#19be00] hover:bg-[#15a300] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Review Step
function ReviewStep({
  formData,
  docType,
  docFront,
  docBack,
  selfie,
  onSubmit,
  isSubmitting,
  submitError,
  submitSuccess,
}: {
  formData: { firstName: string; lastName: string; dateOfBirth: string; nationality: string; address: string; city: string; postalCode: string; country: string };
  docType: DocumentType;
  docFront: File | null;
  docBack: File | null;
  selfie: File | null;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitError?: string;
  submitSuccess?: boolean;
}) {
  const getDocTypeLabel = (type: DocumentType) => {
    const labels = {
      passport: 'Passport',
      id: 'National ID Card',
      driving: 'Driving License'
    };
    return labels[type];
  };

  if (submitSuccess) {
    return (
      <div className="space-y-6 text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-[#46b445] mx-auto" />
        <h2 className="text-xl font-bold text-[#1e272e]">Verification Submitted</h2>
        <p className="text-gray-600">Your identity verification has been submitted. We will review it and notify you once approved.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#1e272e] mb-2">Review Your Information</h2>
        <p className="text-sm text-gray-500 font-light">
          Please review all information before submitting. This process cannot be undone.
        </p>
      </div>
      {submitError && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{submitError}</div>
      )}

      {/* Personal Information Review */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-[#1e272e] mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>
            <span className="ml-2 font-medium text-[#1e272e]">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Date of Birth:</span>
            <span className="ml-2 font-medium text-[#1e272e]">{formData.dateOfBirth}</span>
          </div>
          <div>
            <span className="text-gray-500">Nationality:</span>
            <span className="ml-2 font-medium text-[#1e272e]">{formData.nationality}</span>
          </div>
          <div>
            <span className="text-gray-500">Country:</span>
            <span className="ml-2 font-medium text-[#1e272e]">{formData.country}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Address:</span>
            <span className="ml-2 font-medium text-[#1e272e]">
              {formData.address}, {formData.city}, {formData.postalCode}
            </span>
          </div>
        </div>
      </div>

      {/* Documents Review */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-[#1e272e] mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          Documents
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Document Type:</span>
            <span className="text-sm font-medium text-[#1e272e]">{getDocTypeLabel(docType)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Front Document:</span>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Uploaded
            </span>
          </div>
          {docBack && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Back Document:</span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> Uploaded
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Selfie:</span>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Uploaded
            </span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-[#19be00] hover:bg-[#15a300] disabled:opacity-70 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 flex items-center gap-2"
        >
          <ShieldCheck className="w-5 h-5" />
          {isSubmitting ? 'Submitting...' : 'Submit Verification'}
        </button>
      </div>
    </div>
  );
}

// File Upload Card Component
function FileUploadCard({
  title,
  file,
  onFileChange,
  onRemove,
  required = false,
  isSelfie = false
}: {
  title: string;
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  required?: boolean;
  isSelfie?: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#19be00] transition-colors">
      <div className="text-center">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm font-medium text-[#1e272e]">{file?.name}</p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {isSelfie ? (
                <Camera className="w-8 h-8 text-gray-400" />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-sm font-semibold text-[#1e272e] mb-1">{title}</p>
            {required && <span className="text-red-500 text-xs">* Required</span>}
            <p className="text-xs text-gray-500 mt-2">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
          id={`upload-${title}`}
        />
        {!preview && (
          <label
            htmlFor={`upload-${title}`}
            className="mt-4 inline-block bg-[#19be00] hover:bg-[#15a300] text-white font-semibold py-2 px-6 rounded-full cursor-pointer transition-all active:scale-95"
          >
            Choose File
          </label>
        )}
      </div>
    </div>
  );
}

// Help Item Component
function HelpItem({ label }: { label: string }) {
  return (
    <div className="group flex items-center justify-between py-3 cursor-pointer border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
      <span className="text-sm font-medium text-gray-600 group-hover:text-[#1e272e] transition-colors">
        {label}
      </span>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
    </div>
  );
}

