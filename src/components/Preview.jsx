import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import db from '../firebase';
import '../styles/preview.scss';

const fieldOrderFormOne = [
  'name',
  'age',
  'contact_no',
  'adhaar_no',
  'acc_no',
  'acc_name',
  'ifsc_no',
  'area',
  'location',
  'education',
  'educationLevel',
  'smoking',
  'alcohol',
  'bloodGroup',
  'weight',
  'height',
  // Section 2
  'caesarean',
  'complication',
  'complicationRemarks',
  'gravida',
  'parity',
  'mensuralDate',
  'expectedDeliveryDate',
  'gestationalAge',
  'systolicBP',
  'diastolicBP',
  'haemoglobin',
  'fetalHeartRate',
  'hypertension',
  'highComplication',
  'highComplicationRemarks',
  // Section 3
  'hiv',
  'syphilis',
  'malaria',
  'hepatitisB',
  // Section 4
  'activePlacita',
  'labourInduction',
  'megasulfIinjection',
  'oxytocinInjection',
  'antibiotic',
  'bloodTransfusion',
];

const fieldMappingsFormOne = {
  // Section 1
  name: 'Name',
  age: 'Age',
  contact_no: 'Contact Number',
  adhaar_no: 'Aadhaar Number',
  acc_no: 'Account Number',
  acc_name: 'Account Name',
  ifsc_no: 'IFSC Number',
  area: 'Area',
  location: 'Location',
  education: 'Education',
  educationLevel: 'Education Level',
  smoking: 'Smoking',
  alcohol: 'Alcohol',
  bloodGroup: 'Blood Group',
  weight: 'Weight',
  height: 'Height',
  // Section 2
  caesarean: 'Caesarean',
  complication: 'Complication',
  complicationRemarks: 'Complication Remarks',
  gravida: 'Gravida',
  parity: 'Parity',
  mensuralDate: 'Mensural Date',
  expectedDeliveryDate: 'Expected Delivery Date',
  gestationalAge: 'Gestational Age',
  systolicBP: 'Systolic BP',
  diastolicBP: 'Diastolic BP',
  haemoglobin: 'Haemoglobin',
  fetalHeartRate: 'Fetal Heart Rate',
  hypertension: 'Hypertension',
  highComplication: 'High Complication',
  highComplicationRemarks: 'High Complication Remarks',
  // Section 3
  hiv: 'HIV',
  syphilis: 'Syphilis',
  malaria: 'Malaria',
  hepatitisB: 'Hepatitis B',
  // Section 4
  activePlacita: 'Active Placita',
  labourInduction: 'Labour Induction',
  megasulfIinjection: 'Megasulf Injection',
  oxytocinInjection: 'Oxytocin Injection',
  antibiotic: 'Antibiotic',
  bloodTransfusion: 'Blood Transfusion',
};

const getUserFriendlyNameFormOne = (fieldName) => {
  return fieldMappingsFormOne[fieldName] || fieldName;
};

const fieldOrderFormTwo = [
  'doctorsName',
  'deliveryDateTime',
  'deliveryType',
  'statusOfWomen',
  'numberOfDelivery',
  'birthType',
  'newBornFields',
  'vitaminK1',
  'BCG',
  'OPV',
  'hepatitis',
  'motherComplication',
  'newBornComplication',
];

const fieldMappingsFormTwo = {
  doctorsName: 'Doctor\'s Name',
  deliveryDateTime: 'Delivery Date and Time',
  deliveryType: 'Delivery Type',
  statusOfWomen: 'Status of Women',
  numberOfDelivery: 'Number of Deliveries',
  birthType: 'Birth Type',
  newBornFields: 'Newborn Fields',
  vitaminK1: 'Vitamin K1',
  BCG: 'BCG',
  OPV: 'OPV',
  hepatitis: 'Hepatitis',
  motherComplication: 'Mother\'s Complication',
  newBornComplication: 'Newborn\'s Complication',
};

const getUserFriendlyNameFormTwo = (fieldName) => {
  return fieldMappingsFormTwo[fieldName] || fieldName;
};

const renderObjectFields = (obj, prefix) => {
  return Object.keys(obj).map((key) => (
    <div key={`${prefix}-${key}`}>
      <strong>{getUserFriendlyNameFormOne(key)}:</strong> {obj[key]}
    </div>
  ));
};

const renderFormOne = (formData, formKey) => {
  console.log('Form One Data:', formData);

  return (
    <div key={formKey}>
      <h2>Form One Data</h2>
      <table>
        <tbody>
          {fieldOrderFormOne.map((fieldName) => {
            const value = formData[fieldName];
            const userFriendlyName = getUserFriendlyNameFormOne(fieldName);

            if (value !== undefined) {
              return (
                <tr key={`${formKey}-${fieldName}`}>
                  <td>{userFriendlyName}</td>
                  <td>
                    {typeof value === 'object'
                      ? Array.isArray(value)
                        ? value.map((item, index) => (
                            <div key={index}>{renderObjectFields(item, `${formKey}-${fieldName}-${index}`)}</div>
                          ))
                        : renderObjectFields(value, `${formKey}-${fieldName}`)
                      : value}
                  </td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

const renderFormTwo = (formData, formKey) => {
  console.log('Form Two Data:', formData);

  return (
    <div key={formKey}>
      <h2>Form Two Data</h2>
      <table>
        <tbody>
          {fieldOrderFormTwo.map((fieldName) => {
            const value = formData[fieldName];
            const userFriendlyName = getUserFriendlyNameFormTwo(fieldName);

            if (value !== undefined) {
              return (
                <tr key={`${formKey}-${fieldName}`}>
                  <td>{userFriendlyName}</td>
                  <td>
                    {typeof value === 'object' && !Array.isArray(value)
                      ? Object.keys(value).map((key) => (
                          <div key={key}>{renderObjectFields(value[key], `${formKey}-${fieldName}-${key}`)}</div>
                        ))
                      : Array.isArray(value)
                      ? value.map((item, index) => (
                          <div key={index}>{renderObjectFields(item, `${formKey}-${fieldName}-${index}`)}</div>
                        ))
                      : value}
                  </td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

const Preview = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const dbRefFormOne = ref(db, `${userId}/formOneData`);
    const dbRefFormTwo = ref(db, `${userId}/formTwoData`);

    const unsubscribeFormOne = onValue(dbRefFormOne, (snapshot) => {
      const formOneData = snapshot.val() || {};
      setFormData((prevData) => ({ ...prevData, formOneData }));
    });

    const unsubscribeFormTwo = onValue(dbRefFormTwo, (snapshot) => {
      const formTwoData = snapshot.val() || {};
      setFormData((prevData) => ({ ...prevData, formTwoData }));
    });

    return () => {
      unsubscribeFormOne();
      unsubscribeFormTwo();
    };
  }, [userId]);

  return (
    <div className="preview-container">
      <h1>Data Preview for User: {userId}</h1>
      <div className="data-container">
        {Object.keys(formData).map((formKey) => {
          if (formKey === 'formOneData') {
            return renderFormOne(formData[formKey], formKey);
          } else if (formKey === 'formTwoData') {
            return renderFormTwo(formData[formKey], formKey);
          }
          return null;
        })}
      </div>
      {/* Buttons */}
      <div className="preview-two-buttons">
        <Link to={`/formTwo/${userId}`}>
          <button className="preview-two-button">Go to FormTwo</button>
        </Link>
        <Link to={'/'}>
          <button className="preview-two-button">Exit</button>
        </Link>
      </div>
    </div>
  );
};

export default Preview;