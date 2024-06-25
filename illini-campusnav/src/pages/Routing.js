import React, { useEffect, useState } from 'react';
import EmbeddedMap from '../components/EmbeddedMap';
import RoutedMap from '../components/RoutedMap';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Routing = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editing, setEditing] = useState(true);

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
//
  const handleEdit = () => {
    setEditing(true);
    setSelectedOptions([]);
  };

  const handleConfirm = () => {
    setEditing(false);
  };

  const [classes, setClasses] = useState([]);
  const [locations, setLocations] = useState([]);
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    };

    const fetchLocations = async () => {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    };

    fetchClasses();
    fetchLocations();
  }, []);

  return (

	<>
      <NavBar isLoggedIn={true} />
      <EmbeddedMap />
      <div className="min-h-screen flex justify-center items-center bg-black">
        <div className="p-8">
          <h1 className="text-3xl font-jura font-thin text-white mb-6">Choose Your Transportation</h1>
          <div className="flex flex-col gap-4 text-white">
            {['walking', 'biking', 'bus'].map((option) => (
              <label key={option} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 hidden"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionToggle(option)}
                  disabled={!editing}
                />
                <span className={`w-6 h-6 flex items-center justify-center border border-white ${selectedOptions.includes(option) ? 'bg-white text-black' : ''}`}>
                  {selectedOptions.includes(option) && '✓'}
                </span>
                <span className="ml-2">{capitalizeFirstLetter(option)}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            {editing ? (
              <button className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none" onClick={handleConfirm}>Confirm Choices</button>
            ) : (
              <button className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black focus:outline-none" onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </>
    
  );
}

export default Routing;

