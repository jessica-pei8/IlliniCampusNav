import React, { useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import LocationSearchInput from '../components/autocomplete'
import Multiselect from 'multiselect-react-dropdown';
import RoutedMap from '../components/RoutedMap';
import NavBar from '../components/NavBar'; // Importing NavBar component



function Builder() {
  const [classes, setClasses] = useState([
    
  ]);

  const [newName, setNewName] = useState('');
  const [newClassStartTime, setNewClassStartTime] = useState('');
  const [newClassEndTime, setNewClassEndTime] = useState('');
  const [newLocation, setNewLocation] = useState({
    address: '',
    location: { lat: 40.10793837591804, lng: -88.22726330946084 },
  });
  const [selectedDays, setSelectedDays] = useState([]);

  const dayList = [
    { name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' }, { name: 'Thursday' }, { name: 'Friday' }
  ];

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleLocationSelect = (address, location) => {
    setNewLocation({ address, location });
  };

  const handleStartTimeChange = (e) => {
    setNewClassStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    if (newClassStartTime === '') {
      alert("Please enter start time first");
    } else if (e.target.value <= newClassStartTime) {
      alert("End time must be after start time");
    } else {
      setNewClassEndTime(e.target.value);
    }
  };

  const handleChangeDay = (selectedOptions) => {
    setSelectedDays(selectedOptions.map(option => option.name));
  };

  const addClass = () => {
    if (newName.trim() !== '') {
      const newClass = {
        id: classes.length + 1,
        name: newName.trim(),
        sTime: newClassStartTime.trim(),
        eTime: newClassEndTime.trim(),
        location: newLocation.address,
        days: selectedDays,
      };
      setClasses([...classes, newClass]);
      setNewName('');
      setNewClassStartTime('');
      setNewClassEndTime('');
      setNewLocation({
        address: '',
        location: { lat: 40.10793837591804, lng: -88.22726330946084 },
      });
      setSelectedDays([]);
    }
  };

  const { isLoaded } = useJsApiLoader({
	    id: 'google-map-script',
	    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
		libraries: ["places"]
	})



  return (
	<html className='bg-black'>
    <div className="container mx-auto p-4 bg-black">
		<NavBar></NavBar>
      <h1 className="text-2xl font-bold mb-4 text-center font-thin font-julius text-white">Schedule Builder</h1>
      <ul className="mb-4">

		<table className="table table-bordered text-center w-full">
      <thead className="bg-orange-500 font-julius text-white">
        <tr>
          <th>Class Name</th>
          <th>Time</th>
          <th>Location</th>
          <th>Days</th>
        </tr>
      </thead>
      <tbody className="text-white">
        {classes.map((c) => (
          <tr key={c.id}>
            <td Name="py-4">{c.name}</td>
            <td Name="py-4">{c.sTime} - {c.eTime}</td>
            <td Name="py-4">{c.location}</td>
            <td Name="py-4">{c.days.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </ul>
      <div className='content-center'>
		
	  {	isLoaded ? (

		<RoutedMap from = "301 E Gregory Dr, Champaign, IL 61820" to = "1010 W Illinois St, Urbana, IL 61801" arriveTime='19:32'></RoutedMap>
	)
   : (<></>
	  )}
		
	 </div>

      <div className="flex flex-col items-center">
        <input
          type="text"
          className="border border-gray-300 bg-black border-white p-2 mb-2 text-white"
          placeholder="Class Name"
          value={newName}
          onChange={handleInputChange}
        />

		<div> 
			{isLoaded && <LocationSearchInput passedInSelect={handleLocationSelect} className="p-2 mb-2" />} 
		</div>
        

        <div>
          <label htmlFor="classDaysDropdown" className="mr-2">
            Class Days:
          </label>

          <Multiselect
            className=" bg-black p-2 text-white mb-2"
            options={dayList}
            onSelect={handleChangeDay}
            onRemove={handleChangeDay}
            displayValue="name"
          />
        </div>

        <div className="flex-row text-white">
          <label className="mr-2">From
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="border border-gray-300 text-white bg-black border-white p-2 mb-2"
              placeholder="Start Time"
              value={newClassStartTime}
              onChange={handleStartTimeChange}
            />
          </label>

          <label className="mr-2 text-white">To
            <input
              type="time"
              id="endTime"
              name="endTime"
              className="border border-gray-300 bg-black border-white p-2 mb-2"
              placeholder="End Time"
              value={newClassEndTime}
              onChange={handleEndTimeChange}
            />
          </label>

          <button
            className="bg-black text-white p-2 rounded"
            onClick={addClass}
          >
            Add Class
          </button>
        </div>
      </div>

     

    </div>

	</html>
	
	
	
  );
}

export default Builder;