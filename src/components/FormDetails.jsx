import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import db from '../firebase';

const FormDetails = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const formsRef = ref(db, `${userId}`);

    onValue(formsRef, (snapshot) => {
      const data = snapshot.val();
      setFormData(data);
    });
  }, [userId]);

  const isForm1Available = formData && formData.formType === 'Formone';
  const isForm2Available = formData && formData.formType === 'FormTwo';
  const isFormDataAvailable = formData !== null;

  return (
    <div>
      <h1>Form Details Page</h1>
      <p>User ID: {userId}</p>

      <Link to={`/formOne/${userId}`}>
        {isFormDataAvailable ? (
          <Link to={`/formOneView/${userId}`}>
            <button className="preview-two-button">Preview Form1</button>
          </Link>
        ) : (
          <Link to={`/formOne/${userId}`}>
            <button className="preview-two-button">Form1</button>
          </Link>
        )}
      </Link>

      <Link to={`/formTwo/${userId}`}>
        {isFormDataAvailable ? (
          <Link to={`/formTwoView/${userId}`}>
            <button className="preview-two-button">Preview Form2</button>
          </Link>
        ) : (
          <Link to={`/formTwo/${userId}`}>
            <button className="preview-two-button">Form2</button>
          </Link>
        )}
      </Link>

      {isFormDataAvailable && (
        <Link to={`/preview/${userId}`}>
          <button className="preview-two-button">Preview</button>
        </Link>
      )}
    </div>
  );
};

export default FormDetails;