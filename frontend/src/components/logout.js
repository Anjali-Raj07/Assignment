import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/logout') 
      .then(() => {
        alert('Logout Successfully');
        navigate('/login'); 
      })
      .catch(err => {
        alert('Error during Logout. Please try again.');
        console.error('Logout failed:', err);
      });
  }, [navigate]);

  return null; 
};

export default Logout;
