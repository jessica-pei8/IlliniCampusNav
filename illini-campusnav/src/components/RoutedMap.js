import React, { useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const mapContainerStyle = {
	display: 'flex', 
	justifyContent: 'center', 
  width: '100%',
  height: '450px'
};

//addToRoutes is a fuction that adds the route to the final list of routes to render

const RoutedMap = ({from, to, arriveTime, routesSoFar, addToRoutes, earlyTolerance}) => {
  const [responses, setResponses] = useState([]);


  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponses(prevResponses => [...prevResponses, response]);

		
		console.log("route type", response.routes);
		const newRoute = response.routes[0];

		let totTravelTime = 0;
    	for (const leg of newRoute.legs) {
      		totTravelTime += leg.duration.value; // Duration in seconds
    	}
		totTravelTime *= 1000; // Duration in milliseconds

		// if (routesSoFar.isEmpty()) {

		// 	const leaveTime = arriveTime - totTravelTime - earlyTolerance;
		// 	addToRoutes({leave: leaveTime, route: newRoute});


		// } else {
		// 	const latestRoute = routesSoFar.peek();


		// }
		
		


      } else {
        console.error('Directions request failed:', response.status);
      }
    }
  };

  const today = new Date();
  const [hrs, min] = arriveTime ? arriveTime.split(':').map(Number) : (0, 0);
  const arrivalTimeMili = today.getTime() - (today.getTime() % 86400000) + (hrs * 60 * 60 * 1000) + (min * 60 * 1000);

  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{lat: 40.10793837591804, lng: -88.22726330946084}}
        zoom={15}
      >
        {responses.map((response, index) => (
          <DirectionsRenderer
            key={index}
            options={{ preserveViewport: true }}
            directions={response}
          />
        ))}
        <DirectionsService
          options={{
            destination: from,
            origin: to,
            travelMode: 'TRANSIT', // 'TRANSIT', 'BICYCLING', 'WALKING'
			transitOptions: {
				arrivalTime: new Date(arrivalTimeMili)
			},
			
          }}
          callback={directionsCallback}
        />
        
      </GoogleMap>
	  
   
  );
};

export default RoutedMap;
