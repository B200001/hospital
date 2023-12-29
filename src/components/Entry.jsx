// Entry.jsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormOne from './FormOne';
import FormTwo from './FormTwo';

const Entry = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    // State to manage the form data for Form One
    const [formOneData, setFormOneData] = useState(null);
    const [formTwoData, setFormTwoData] = useState(null);

    const isFormTwoFilled = () => {
        return (
            formTwoData &&
            formTwoData.doctorsName &&
            formTwoData.deliveryDateTime &&
            formTwoData.deliveryType &&
            formTwoData.statusOfWomen &&
            formTwoData.numberOfDelivery &&
            formTwoData.birthType &&
            formTwoData.newBornFields &&
            formTwoData.newBornFields.every(newBorn => (
                newBorn.newBornGender &&
                newBorn.newBornWeight &&
                newBorn.lowBirthWeight &&
                newBorn.newBornStatus
            )) &&
            formTwoData.vitaminK1 &&
            formTwoData.BCG &&
            formTwoData.OPV &&
            formTwoData.hepatitis &&
            formTwoData.motherComplication &&
            formTwoData.newBornComplication
        );
    };

    // Function to check if Form One is filled
    const isFormOneFilled = () => {
        return formOneData &&
            formOneData.name &&
            formOneData.age &&
            formOneData.area &&
            formOneData.location &&
            formOneData.education &&
            formOneData.educationLevel &&
            formOneData.smoking &&
            formOneData.alcohol &&
            formOneData.bloodGroup &&
            formOneData.weight &&
            formOneData.height &&
            formOneData.caesarean &&
            formOneData.complication &&
            formOneData.complicationRemarks &&
            formOneData.gravida &&
            formOneData.parity &&
            formOneData.mensuralDate &&
            formOneData.expectedDeliveryDate &&
            formOneData.gestationalAge &&
            formOneData.systolicBP &&
            formOneData.diastolicBP &&
            formOneData.haemoglobin &&
            formOneData.fetalHeartRate &&
            formOneData.hypertension &&
            formOneData.highComplication &&
            formOneData.highComplicationRemarks &&
            formOneData.hiv &&
            formOneData.syphilis &&
            formOneData.maleria &&
            formOneData.hepatitisB &&
            formOneData.activePlacita &&
            formOneData.labourInduction &&
            formOneData.megasulfIinjection &&
            formOneData.oxytocinInjection &&
            formOneData.antibiotic &&
            formOneData.bloodTransfusion;
    };

    // Function to update form data in state for Form One
    const updateFormOneData = (data) => {
        setFormOneData(data);
    };

    // Function to check if Form Two is filled
    const updateFormTwoData = (data) => {
        setFormTwoData(data);
    };

    const clickOne = () => {
        if (isFormOneFilled()) {
            // If Form One is filled, navigate to the preview page
            navigate(`/formOneView/${userId}`);
        } else {
            // If Form One is not filled, navigate to the form
            navigate(`/formOne/${userId}`);
        }
    };

    const clickTwo = () => {
        if (isFormTwoFilled()) {
            // If Form Two is filled, navigate to the preview page
            navigate(`/formTwoView/${userId}`);
        } else {
            // If Form Two is not filled, navigate to the form
            navigate(`/formTwo/${userId}`);
        }
    };

    return (
        <div className='main'>
            <h2>Create a new entry for User ID: {userId}</h2>

            {/* FormOne component receives updateFormOneData function to update the state */}
            {/* <FormOne updateFormOneData={updateFormOneData} /> */}

            {/* Add FormTwo component here, if applicable */}
            {/* <FormTwo /> */}

            <div>
                <button onClick={clickOne}>Form One</button>
            </div>
            <div>
                <button onClick={clickTwo}>Form Two</button>
            </div>
        </div>
    );
};

export default Entry;
