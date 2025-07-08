import React from 'react';

const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = {
    tops: [
      { size: 'XS', chest: '32-34"', waist: '26-28"', length: '26"', fit: 'Slim' },
      { size: 'S', chest: '34-36"', waist: '28-30"', length: '27"', fit: 'Slim' },
      { size: 'M', chest: '36-38"', waist: '30-32"', length: '28"', fit: 'Regular' },
      { size: 'L', chest: '38-40"', waist: '32-34"', length: '29"', fit: 'Regular' },
      { size: 'XL', chest: '40-42"', waist: '34-36"', length: '30"', fit: 'Relaxed' },
      { size: 'XXL', chest: '42-44"', waist: '36-38"', length: '31"', fit: 'Relaxed' }
    ],
    bottoms: [
      { size: 'XS', waist: '26-28"', hip: '34-36"', inseam: '30"', fit: 'Slim' },
      { size: 'S', waist: '28-30"', hip: '36-38"', inseam: '30"', fit: 'Slim' },
      { size: 'M', waist: '30-32"', hip: '38-40"', inseam: '32"', fit: 'Regular' },
      { size: 'L', waist: '32-34"', hip: '40-42"', inseam: '32"', fit: 'Regular' },
      { size: 'XL', waist: '34-36"', hip: '42-44"', inseam: '34"', fit: 'Relaxed' },
      { size: 'XXL', waist: '36-38"', hip: '44-46"', inseam: '34"', fit: 'Relaxed' }
    ],
    shoes: [
      { size: '7', us: '7', eu: '40', uk: '6.5', cm: '25.5' },
      { size: '8', us: '8', eu: '41', uk: '7.5', cm: '26.5' },
      { size: '9', us: '9', eu: '42', uk: '8.5', cm: '27.5' },
      { size: '10', us: '10', eu: '43', uk: '9.5', cm: '28.5' },
      { size: '11', us: '11', eu: '44', uk: '10.5', cm: '29.5' },
      { size: '12', us: '12', eu: '45', uk: '11.5', cm: '30.5' }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {/* Tops Size Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tops (T-Shirts, Shirts, Jackets)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Chest</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Waist</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Length</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.tops.map((row) => (
                      <tr key={row.size}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{row.size}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.chest}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.waist}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.length}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottoms Size Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bottoms (Jeans, Pants, Shorts)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Waist</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Hip</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Inseam</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.bottoms.map((row) => (
                      <tr key={row.size}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{row.size}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.waist}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.hip}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.inseam}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shoes Size Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shoes</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">US</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">EU</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">UK</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.shoes.map((row) => (
                      <tr key={row.size}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{row.us}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.eu}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.uk}</td>
                        <td className="border border-gray-300 px-4 py-2">{row.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Measure */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Measure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Chest</h4>
                  <p className="text-gray-600 text-sm">
                    Measure around the fullest part of your chest, keeping the tape horizontal.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Waist</h4>
                  <p className="text-gray-600 text-sm">
                    Measure around your natural waistline, keeping the tape comfortably loose.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Hip</h4>
                  <p className="text-gray-600 text-sm">
                    Measure around the fullest part of your hips, keeping the tape horizontal.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Inseam</h4>
                  <p className="text-gray-600 text-sm">
                    Measure from the crotch to the bottom of your ankle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
