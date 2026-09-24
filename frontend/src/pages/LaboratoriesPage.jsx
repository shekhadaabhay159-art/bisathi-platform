import React, { useState } from 'react';
import { Search, FlaskConical, CheckCircle2, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { MOCK_LABORATORIES } from '../data/bisData';

export default function LaboratoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabDetails, setSelectedLabDetails] = useState(null);

  const filteredLabs = MOCK_LABORATORIES.filter(lab => 
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCityFilter = (city) => {
    setSearchQuery(city);
  };

  return (
    <div className="page-container">
      {/* Eyebrow & Title matching Image 5 */}
      <div className="eyebrow-badge">TESTING NETWORK</div>
      <h1 className="page-title">Find the right testing conversation.</h1>
      <p className="page-subtitle">
        Explore demo directory records by city and testing speciality. Verify availability with the official directory before engaging.
      </p>

      {/* Search Bar matching Image 5 */}
      <div className="search-container">
        <Search size={18} color="#94A3B8" />
        <input 
          type="text"
          className="search-input"
          placeholder="Search city or testing speciality..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-count">{filteredLabs.length} reference records</span>
      </div>

      {/* Labs List matching Image 5 */}
      <div className="lab-card">
        {filteredLabs.map((lab) => (
          <div key={lab.id} className="lab-item" style={{ display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="lab-left">
                <div className="lab-icon-box">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h3 className="lab-title">{lab.name}</h3>
                  <div className="lab-location">
                    {lab.city}, {lab.state} · {lab.categories.join(' · ')}
                  </div>
                  <div className="lab-verified-tag">
                    <CheckCircle2 size={14} />
                    <span>{lab.status}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button 
                  className="action-link"
                  onClick={() => handleCityFilter(lab.city)}
                  title={`Filter results by ${lab.city}`}
                >
                  <span>Filter by {lab.city}</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Accreditation details summary */}
            <div style={{
              marginTop: '12px',
              paddingLeft: '62px',
              fontSize: '12px',
              color: '#64748B',
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap'
            }}>
              <span><strong>Scope:</strong> {lab.accreditation}</span>
              <span><strong>Address:</strong> {lab.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
