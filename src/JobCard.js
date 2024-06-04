import React, { useState } from 'react';

const JobCard = ({ job }) => {
 
  const {
    organisationName,
    organisationLogo,
    description,
    opportunityName,
    applicationStartTime,
    applicationEndTime,
    salaryDisclosure,
    minRange,
    maxRange,
    minExperience,
    maxExperience,
    isForFreshers,
    minExp,
    salaryUnit,
    salaryCurrencyCode,
    imageUrl,
    applyLink,
    estimatedSalary,
    city
  } = job;

  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const toggleDescriptionExpansion = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleApplyClick = () => {
    if (applyLink) {
      window.open(applyLink, '_blank');
    }
  };
  
  const renderDescription = () => {
    // Remove HTML tags from the description
    const cleanDescription = description.replace(/<[^>]+>/g, '');

    return isDescriptionExpanded ? cleanDescription : `${cleanDescription.slice(0, 100)}...`;
  };

  const getEstimatedSalary = () => {
    if (minRange && maxRange) {
      return `${minRange} - ${maxRange} ${salaryUnit}`;
    } else if (estimatedSalary) {
      return estimatedSalary;
    } else {
      return 'Not Disclosed';
    }
  };

  const handleNullValue = (value) => {
    if (minExperience && maxExperience) {
      return `${minExperience} - ${maxExperience} years`;
    } else {
      return 'Not specified';
    }  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        {organisationLogo && <img src={organisationLogo} alt="Company Logo" className="logo" />}
    
        <div>
          <h2>{organisationName}</h2>
          {opportunityName && <p className="job-role">{opportunityName}</p>}
          {city && <p className="location">{city}</p>}
        </div>
      </div>
      <div>
        {getEstimatedSalary() && <p className="estimated-salary">Estimated Salary: {getEstimatedSalary()}</p>}
      </div>
      <div className="job-card-details">
        <div>
          <h3 style={{paddingRight:210}}>About Company</h3>
          <div style={{paddingRight:280}}>
            <p>About us</p>
          </div>
          {description && (
  <>
       <p className={`job-description ${description ? 'expanded' : ''}`} onClick={toggleDescriptionExpansion}>
        {renderDescription()}
      </p>
      {!isDescriptionExpanded && (
        <span className="show-more-button" onClick={toggleDescriptionExpansion}></span>
      )}
    </>
)}

        </div>
      </div>
      <p className="experience"><span>Min Experience:</span> {handleNullValue(minExperience)}</p>
      <button className="apply-button" onClick={handleApplyClick}>Apply</button>
    </div>
  );
};

export default JobCard;
