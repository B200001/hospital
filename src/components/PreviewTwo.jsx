import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import "../styles/previewTwo.scss";


const PreviewTwo = () => {
  const { userId } = useParams();
  const [formTwoData, setFormTwoData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userRef = ref(db, userId);
      const snapshot = await get(userRef);
      const userData = snapshot.val() || {};
      setFormTwoData(userData.formTwoData || {});
    };

    fetchData();
  }, [userId]);

  return (
    <div className="preview-two-container">
      <h1>User ID: #{userId}</h1>
      <h2 className="preview-two-header">PreviewTwo</h2>
      {/* Display formTwoData fields here in rows and columns */}
      <div className="preview-two-field">
        <p className="preview-two-label">Doctor's Name:</p>
        <p>{formTwoData.doctorsName}</p>
      </div>
      <div className="preview-two-field">
        <p className="preview-two-label">Delivery Date and Time:</p>
        <p>{formTwoData.deliveryDateTime}</p>
      </div>
      {/* Add more fields as needed */}
      {/* Display dynamic newborn fields */}
      {formTwoData.newBornFields &&
        formTwoData.newBornFields.map((newBorn, index) => (
          <div key={index} className="preview-two-field">
            <p className="preview-two-label">{`Newborn ${index + 1} Gender:`}</p>
            <p>{newBorn.newBornGender}</p>

            <p className="preview-two-label">{`Newborn ${index + 1} Weight:`}</p>
            <p>{newBorn.newBornWeight}</p>

            <p className="preview-two-label">{`Newborn ${index + 1} Low Birth Weight:`}</p>
            <p>{newBorn.lowBirthWeight}</p>

            <p className="preview-two-label">{`Newborn ${index + 1} Status:`}</p>
            <p>{newBorn.newBornStatus}</p>
          </div>
        ))}

      <div className="preview-two-field">
        <p className="preview-two-label">Vitamin K1:</p>
        <p>{formTwoData.vitaminK1}</p>
      </div>

      <div className="preview-two-field">
        <p className="preview-two-label">BCG:</p>
        <p>{formTwoData.BCG}</p>
      </div>

      <div className="preview-two-field">
        <p className="preview-two-label">OPV:</p>
        <p>{formTwoData.OPV}</p>
      </div>

      <div className="preview-two-field">
        <p className="preview-two-label">Hepatitis:</p>
        <p>{formTwoData.hepatitis}</p>
      </div>

      <div className="preview-two-field">
        <p className="preview-two-label">Mother Complication:</p>
        <p>{formTwoData.motherComplication}</p>
      </div>

      <div className="preview-two-field">
        <p className="preview-two-label">Newborn Complication:</p>
        <p>{formTwoData.newBornComplication}</p>
      </div>



      {/* Buttons */}
      <div className="preview-two-buttons">
        <Link to={`/formOneView/${userId}`}>
          <button className="preview-two-button">Form 1</button>
        </Link>
        <Link to={'/'}>
          <button className="preview-two-button">Exit</button>
        </Link>
        {/* <Link to={`/newEntry/${userId}`}>
          <button className="preview-two-button">Home</button>
        </Link> */}

      </div>
    </div>
  );
};

export default PreviewTwo;