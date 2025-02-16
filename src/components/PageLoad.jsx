import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const PageLoad = () => {
  const [load, setLoad] = useState(false);
  const {URL}=useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL+'/api/auth/pageload');
        setLoad(response.data); // Assuming response is a boolean
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Page Load Status:</h2>
      <p>{load ? 'Loaded Successfully!' : 'Loading...'}</p>
    </div>
  );
};

export default PageLoad;
