import React, { useState, useEffect } from 'react';
import {fetchJobListings} from './jobService';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

const App = () => {
  const [allJobListings, setAllJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchMoreJobs = async () => {
    setLoading(true);
    try {
        const newPageNo = offset / 21 + 1; // Calculate the new pageNo based on the offset
        
        const moreJobs = await fetchJobListings( newPageNo, 'Job', 21);         
        console.log('Fetch job listings response:', moreJobs);
        
        if (Array.isArray(moreJobs)) {
            setAllJobListings(prevJobListings => [...prevJobListings, ...moreJobs]);
            setOffset(prevOffset => prevOffset + 21);
        } else {
            console.error('Fetch job listings response is not an array:', moreJobs);
        }
    } catch (error) {
        console.error('Error fetching job listings:', error);
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    fetchMoreJobs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100
      ) {
        fetchMoreJobs();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, allJobListings, offset]);

  const applyFilters = (filters) => {

    const filteredJobs = allJobListings.filter(job => {
      const minExperienceMatch = !filters.minExperience || job.minExperience >= parseInt(filters.minExperience);
      
      const companyNameMatch = !filters.organisationName || job.organisationName.toLowerCase().includes(filters.organisationName.toLowerCase());
      const jobRoleMatch = !filters.jobRole || job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase());
      const locationMatch = !filters.city || job.city.toLowerCase().includes(filters.city.toLowerCase());

      const minBasePayMatch = !filters.minRange || job.minRange >= parseInt(filters.minRange);
      return minExperienceMatch && companyNameMatch && locationMatch && minBasePayMatch && jobRoleMatch;
    });

    setFilteredJobListings(filteredJobs);
  };

  return (
    <div className="App">
      <h1>Job Listings</h1>
      <JobFilters onFilter={applyFilters} />
      <div className="job-list">
        {(filteredJobListings.length > 0 ? filteredJobListings : allJobListings).map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default App;
