import axios from 'axios';

// Fetch the route from the backend
export const fetchRoute = async () => {
  try {
   const response = await axios.get('https://vehicletrackerserver.onrender.com/route');
   // const response = await axios.get('http://localhost:5000/route');
    return response.data;
  } catch (error) {
    console.error('Error fetching route:', error);
    return [];
  }
};
