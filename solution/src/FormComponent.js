import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis';
import 'bootstrap/dist/css/bootstrap.min.css';


const FormComponent = () => {
  const [name, setName] = useState('');
  const [nameAvailable, setNameAvailable] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch locations from mock API
    getLocations()
      .then(locations => {
        setLocations(locations);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    // Validate name availability using mock API
    // Trim the name before validation
    isNameValid(newName.trim()) 
      .then(available => {
        setNameAvailable(available);
      })
      .catch(error => {
        console.error('Error checking name availability:', error);
      });
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleClear = () => {
    setName('');
    setSelectedLocation('');
  };

  const handleAdd = () => {
    // Add form data to the list
    setFormData([...formData, { name, location: selectedLocation }]);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} className="form-control" />
          {!nameAvailable && <span className="text-danger">This name has already been taken</span>}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          <label>Location:</label>
          <select value={selectedLocation} onChange={handleLocationChange} className="form-control">
            <option value="">Select location...</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          <button onClick={handleClear} className="btn btn-secondary">Clear</button>
          <button onClick={handleAdd} disabled={!nameAvailable || !selectedLocation} className="btn btn-primary">Add</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
