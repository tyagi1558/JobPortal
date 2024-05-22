const fetchJobListings = async ( pageNo = 1, opportunityType = 'Job', limit = 21) => {
  try {
      // Construct the URL with query parameters
      const url = `https://backend.engineerhub.in/api/v1/getHiringByOpportunityType/?opportunityType=${opportunityType}&pageNo=${pageNo}&limit=${limit}`;
      
      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      
      if (!response.ok) {
          throw new Error('Failed to fetch job listings');
      }
      
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error(error);
      return [];
  }
};

    export default fetchJobListings;