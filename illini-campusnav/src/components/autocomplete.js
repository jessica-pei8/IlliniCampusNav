import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
		address: '', 
		coordinates: { lat: 40.10793837591804, lng: -88.22726330946084 },
	};
  }
 

  handleChange = e => {
    this.setState({address: e, coordinates: { lat: 40.10793837591804, lng: -88.22726330946084 }});
  };
 
  handleSelect = e => {
    geocodeByAddress(e)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
		console.log('Success', latLng);
		this.props.passedInSelect(e, {lat: latLng.lat, lng: latLng.lng});
	})
      .catch(error => console.error('Error', error));
	  this.setState({address: e, coordinates: { lat: 40.10793837591804, lng: -88.22726330946084 }});
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;