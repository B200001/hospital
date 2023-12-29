import React, { useState } from 'react';
import db from "../firebase";
// import { ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import '../styles/formTwo.scss';
import { useParams } from 'react-router-dom';
import { ref, get, update } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const NewForm = () => {

    const { userId } = useParams();
    const [isfilled, setIsFilled ] = useState(false);
    const navigate = useNavigate();
    const initialFormData = {
        doctorsName: '',
        deliveryDateTime: '',
        deliveryType: '',
        statusOfWomen: '',
        numberOfDelivery: '',
        birthType: '',
        newBornFields: Array.from({ length: 1 }, () => ({
            newBornGender: '',
            newBornWeight: '',
            lowBirthWeight: '',
            newBornStatus: '',
        })),
        vitaminK1: '',
        BCG: '',
        OPV: '',
        hepatitis: '',
        motherComplication: '',
        newBornComplication: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userRef = ref(db, userId);

        // Fetch the existing data
        const snapshot = await get(userRef);
        const existingData = snapshot.val() || {};

        // Merge the existing data with the new form data
        const mergedData = {
            ...existingData,
            formTwoData: formData,
        };
        setIsFilled(true);

        // Update the data in Firebase
        update(userRef, mergedData)
            .then(() => {
                notify();
                navigate(`/formTwoView/${userId}`);

            })
            .catch((error) => {
                toast(error);
            });

        // resetForm();
    };

    const handleNewBornChange = (index, field, value) => {
        setFormData((prevData) => {
            const newBornFields = [...prevData.newBornFields];
            newBornFields[index] = {
                ...newBornFields[index],
                [field]: value,
            };
            return {
                ...prevData,
                newBornFields,
            };
        });
    };

    const notify = () => toast('Contact Added Successfully');

    const renderNewBornFields = () => {
        return Array.from({ length: parseInt(formData.numberOfDelivery) }, (_, index) => {
            const newBornItem = formData.newBornFields[index] || {};
            return (
                <div key={index}>
                    <h3>Newborn {index + 1}</h3>
                    <label>Newborn Gender:</label>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name={`newBornGender_${index}`}
                                value="Male"
                                checked={newBornItem.newBornGender === 'Male'}
                                onChange={() => handleNewBornChange(index, 'newBornGender', 'Male')}
                                required
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`newBornGender_${index}`}
                                value="Female"
                                checked={newBornItem.newBornGender === 'Female'}
                                onChange={() => handleNewBornChange(index, 'newBornGender', 'Female')}
                                required
                            />
                            Female
                        </label>
                    </div>

                    <label>Newborn Weight: <input type="text" name={`newBornWeight_${index}`} value={newBornItem.newBornWeight} onChange={(e) => handleNewBornChange(index, 'newBornWeight', e.target.value)} required /></label>

                    <label>Low Birth Weight:</label>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name={`lowBirthWeight_${index}`}
                                value="Yes"
                                checked={newBornItem.lowBirthWeight === 'Yes'}
                                onChange={() => handleNewBornChange(index, 'lowBirthWeight', 'Yes')}
                                required
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`lowBirthWeight_${index}`}
                                value="No"
                                checked={newBornItem.lowBirthWeight === 'No'}
                                onChange={() => handleNewBornChange(index, 'lowBirthWeight', 'No')}
                                required
                            />
                            No
                        </label>
                    </div>

                    <label>Newborn Status:</label>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name={`newBornStatus_${index}`}
                                value="Alive"
                                checked={newBornItem.newBornStatus === 'Alive'}
                                onChange={() => handleNewBornChange(index, 'newBornStatus', 'Alive')}
                                required
                            />
                            Alive
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`newBornStatus_${index}`}
                                value="Not Alive"
                                checked={newBornItem.newBornStatus === 'Not Alive'}
                                onChange={() => handleNewBornChange(index, 'newBornStatus', 'Not Alive')}
                                required
                            />
                            Not Alive
                        </label>
                    </div>
                </div>
            );
        });
    };


    return (
        <div className='formTwo'><form autoComplete="off" onSubmit={handleSubmit}>
            <div className="section_1">
                {/* Section 1 */}
                <label>Doctor's Name: <input type="text" name="doctorsName" value={formData.doctorsName} onChange={handleChange} required /></label>
                <label>
                    Delivery Date and Time:-
                    <input
                        type="datetime-local"
                        name="deliveryDateTime"
                        value={formData.deliveryDateTime}
                        onChange={handleChange}
                        required
                    />
                </label>
                {/* <label>Delivery Type: <input type="text" name="deliveryType" value={formData.deliveryType} onChange={handleChange} required /></label> */}

                <div className='radio'>
                    <label>Status of Women:</label>
                    <label>
                        <input
                            type="radio"
                            name="statusOfWomen"
                            value="Alive"
                            checked={formData.statusOfWomen === 'Alive'}
                            onChange={handleChange}
                            required
                        />
                        Alive
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="statusOfWomen"
                            value="Not Alive"
                            checked={formData.statusOfWomen === 'Not Alive'}
                            onChange={handleChange}
                            required
                        />
                        Not Alive
                    </label>
                </div>
                <label>
                    Delivery Type:
                    <select
                        className='select_dropDown'
                        name="deliveryType"
                        value={formData.deliveryType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Delivery Type</option>
                        <option value="Normal">Normal</option>
                        <option value="LSCS">LSCS</option>
                    </select>
                </label>
                <label>
                    Birth Type:
                    <select
                        className='select_dropDown'
                        name="birthType"
                        value={formData.birthType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Birth Type</option>
                        <option value="preterm">Preterm</option>
                        <option value="non-preterm">Non-Preterm</option>
                    </select>
                </label>
            </div>
            <label>Number of Delivery <input type="text" name="numberOfDelivery" value={formData.numberOfDelivery} onChange={handleChange} required /></label>


            {/* Newborn Fields */}
            <div className="section_2">
                {parseInt(formData.numberOfDelivery) > 0 && renderNewBornFields()}
            </div>


            {/* Section 3 */}
            <div className="section_3">
                <label>Vitamin K1:</label>
                <div className='radio'>
                    <label>
                        <input
                            type="radio"
                            name="vitaminK1"
                            value="Yes"
                            checked={formData.vitaminK1 === 'Yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="vitaminK1"
                            value="No"
                            checked={formData.vitaminK1 === 'No'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>

                <label>BCG:</label>
                <div className='radio'>
                    <label>
                        <input
                            type="radio"
                            name="BCG"
                            value="Yes"
                            checked={formData.BCG === 'Yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="BCG"
                            value="No"
                            checked={formData.BCG === 'No'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>

                <label>OPV:</label>
                <div className='radio'>
                    <label>
                        <input
                            type="radio"
                            name="OPV"
                            value="Yes"
                            checked={formData.OPV === 'Yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="OPV"
                            value="No"
                            checked={formData.OPV === 'No'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>

                <label>Hepatitis:</label>
                <div className='radio'>
                    <label>
                        <input
                            type="radio"
                            name="hepatitis"
                            value="Yes"
                            checked={formData.hepatitis === 'Yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="hepatitis"
                            value="No"
                            checked={formData.hepatitis === 'No'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
            </div>


            {/* Section 4 */}
            <div className="section_4">
                <label>Mother Complication: <input type="text" name="motherComplication" value={formData.motherComplication} onChange={handleChange} /></label>
                <label>Newborn Complication: <input type="text" name="newBornComplication" value={formData.newBornComplication} onChange={handleChange} /></label>
            </div>


            <div>
                <button type="submit">Submit</button>
            </div>
            <ToastContainer autoClose={3000} />
        </form></div>
    );
};

export default NewForm;

