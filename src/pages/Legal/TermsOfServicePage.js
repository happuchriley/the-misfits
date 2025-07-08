export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this website, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Use License</h2>
          <p className="text-gray-700">
            Permission is granted to temporarily download one copy of the materials on Elevate Apparel's 
            website for personal, non-commercial transitory viewing only.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-gray-700">
            The materials on Elevate Apparel's website are provided on an 'as is' basis. 
            Elevate Apparel makes no warranties, expressed or implied, and hereby disclaims 
            and negates all other warranties including without limitation, implied warranties 
            or conditions of merchantability, fitness for a particular purpose, or non-infringement 
            of intellectual property or other violation of rights.
          </p>
        </div>
      </div>
    </div>
  );
}
