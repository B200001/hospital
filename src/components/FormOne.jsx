import React, { useState } from 'react';
import "../styles/formOne.scss";
import db from "../firebase";
import { ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const FormOne = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const heartRateDropDown = [
        "100-109",
        "110-119",
        "120-129",
        "130-139",
        "140-149",
        "150-159",
        "160-170",
    ];
    const gravidaDropDown = [
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "G9",
        "G10",
    ];
    const bloodGroupDropDown = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    const parityDropDown = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [formData, setFormData] = useState({
        // Section 1
        name: "",
        age: "",
        contact_no: "",
        adhaar_no: "",
        acc_no: "",
        acc_name: "",
        ifsc_no: "",
        area: "",
        location: "",
        education: "",
        educationLevel: "",
        smoking: "",
        alcohol: "",
        bloodGroup: "",
        weight: "",
        height: "",
        // Section 2
        caesarean: "",
        complication: "",
        complicationRemarks: "",
        gravida: "",
        parity: "",
        mensuralDate: "",
        expectedDeliveryDate: "",
        gestationalAge: "",
        systolicBP: "",
        diastolicBP: "",
        haemoglobin: "",
        fetalHeartRate: "",
        hypertension: "",
        highComplication: "",
        highComplicationRemarks: "",
        // Section 3
        hiv: "",
        syphilis: "",
        maleria: "",
        hepatitisB: "",
        // Section 4
        activePlacita: "",
        labourInduction: "",
        megasulfIinjection: "",
        oxytocinInjection: "",
        antibiotic: "",
        bloodTransfusion: "",
    });

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const initialFormData = {
        // Section 1
        name: "",
        age: "",
        contact_no: "",
        adhaar_no: "",
        acc_no: "",
        acc_name: "",
        ifsc_no: "",
        area: "",
        location: "",
        education: "",
        educationLevel: "",
        smoking: "",
        alcohol: "",
        bloodGroup: "",
        weight: "",
        height: "",
        // Section 2
        caesarean: "",
        complication: "",
        complicationRemarks: "",
        gravida: "",
        parity: "",
        mensuralDate: "",
        expectedDeliveryDate: "",
        gestationalAge: "",
        systolicBP: "",
        diastolicBP: "",
        haemoglobin: "",
        fetalHeartRate: "",
        hypertension: "",
        highComplication: "",
        highComplicationRemarks: "",
        // Section 3
        hiv: "",
        syphilis: "",
        maleria: "",
        hepatitisB: "",
        // Section 4
        activePlacita: "",
        labourInduction: "",
        megasulfIinjection: "",
        oxytocinInjection: "",
        antibiotic: "",
        bloodTransfusion: "",
    };
    const notify = () => toast("Contact Added Successfully");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('Invalid userId:', userId);
            // Handle the error or return
            return;
        }

        set(ref(db, userId), {
            formOneData: formData
        })
            .then(() => {
                notify();
                // navigate(`/formOneView/${userId}`);
                navigate(`/formOneView/${userId}`);
            })
            .catch((error) => {
                toast(error);
            });
    };


    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <div className='formOne'>
            <form onSubmit={handleSubmit}>
                {/* Section 1 */}
                <div className='section_1'>
                    <label className='label__div__notRadio'>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Age: <input type="text" name="age" value={formData.age} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Contact Number: <input type="text" name="contact_no" value={formData.contact_no} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Adhaar Number: <input type="text" name="adhaar_no" value={formData.adhaar_no} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Bank Account Number: <input type="text" name="acc_no" value={formData.acc_no} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Account Holder Name: <input type="text" name="acc_name" value={formData.acc_name} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>IFSC Code: <input type="text" name="ifsc_no" value={formData.ifsc_no} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>
                        Area:
                        <select name="area" value={formData.area} onChange={handleDropdownChange} required>
                            <option value="">Select Area</option>
                            <option value="Rural Area">Rural Area</option>
                            <option value="Urban Area">Urban Area</option>
                        </select>
                    </label>
                    <label className='label__div__notRadio'>Location: <input type="text" name="location" value={formData.location} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>
                        Education:
                        <select name="education" value={formData.education} onChange={handleDropdownChange} required>
                            <option value="">Select Education</option>
                            <option value="Literate">Literate</option>
                            <option value="Illiterate">Illiterate</option>
                        </select>
                    </label>
                    {formData.education === "Literate" && (
                        <label className='label__div__notRadio'>
                            Education Level:
                            <input
                                type="text"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                            />
                        </label>
                    )}
                    <label classname = 'label__div__radio'>
                        Smoking:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="smoking"
                                value="Yes"
                                checked={formData.smoking === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="smoking"
                                value="No"
                                checked={formData.smoking === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>
                    
                    <label classname = 'label__div__radio'>
                        Alcohol:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="alcohol"
                                value="Yes"
                                checked={formData.alcohol === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="alcohol"
                                value="No"
                                checked={formData.alcohol === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>
                   
                    <label className='label__div__notRadio'>
                        Blood Group:
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleDropdownChange} required>
                            <option value="">Select Blood Group</option>
                            {bloodGroupDropDown.map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </label>
                    
                    <label className='label__div__notRadio'>Weight: <input type="text" name="weight" value={formData.weight} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Height: <input type="text" name="height" value={formData.height} onChange={handleChange} autoComplete="off" required /></label>
                </div>
                
                <hr />
                {/* Section 2 */}
           
                <div className='section_2'>
                    <label classname = 'label__div__radio'>
                        Caesarean:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="caesarean"
                                value="Yes"
                                checked={formData.caesarean === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="caesarean"
                                value="No"
                                checked={formData.caesarean === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>
                  
                    <label classname = 'label__div__radio'>
                        Complication:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="complication"
                                value="Yes"
                                checked={formData.complication === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="complication"
                                value="No"
                                checked={formData.complication === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>
                   
                    <label className='label__div__notRadio'>Complication Remarks: <input type="text" name="complicationRemarks" value={formData.complicationRemarks} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>
                        Gravida:
                        <select name="gravida" value={formData.gravida} onChange={handleDropdownChange} required>
                            <option value="">Select Gravida</option>
                            {gravidaDropDown.map((gravida) => (
                                <option key={gravida} value={gravida}>
                                    {gravida}
                                </option>
                            ))} 
                        </select>
                    </label>
                 
                    <label className='label__div__notRadio'>
                        Parity:
                        <select name="parity" value={formData.parity} onChange={handleDropdownChange} required>
                            <option value="">Select Parity</option>
                            {parityDropDown.map((parity) => (
                                <option key={parity} value={parity}>
                                    {parity}
                                </option>
                            ))}
                        </select>
                    </label>
                  
                    <label className='label__div__notRadio'>Mensural Date: <input type="date" name="mensuralDate" value={formData.mensuralDate} onChange={handleDateChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Expected Delivery Date: <input type="date" name="expectedDeliveryDate" value={formData.expectedDeliveryDate} onChange={handleDateChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Gestational Age: <input type="text" name="gestationalAge" value={formData.gestationalAge} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Systolic BP: <input type="text" name="systolicBP" value={formData.systolicBP} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Diastolic BP: <input type="text" name="diastolicBP" value={formData.diastolicBP} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Haemoglobin: <input type="text" name="haemoglobin" value={formData.haemoglobin} onChange={handleChange} autoComplete="off" required /></label>
                    <label className='label__div__notRadio'>Fetal Heart Rate:
                        <select name="fetalHeartRate" value={formData.fetalHeartRate} onChange={handleDropdownChange} required>
                            {heartRateDropDown.map((rate) => (
                                <option key={rate} value={rate}>
                                    {rate}
                                </option>
                            ))}
                        </select>
                    </label>
                   
                    <label classname = 'label__div__radio'>
                        Hypertension:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="hypertension"
                                value="Yes"
                                checked={formData.hypertension === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="hypertension"
                                value="No"
                                checked={formData.hypertension === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>
                 
                    <label classname = 'label__div__radio'>
                        High Complication:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="highComplication"
                                value="Yes"
                                checked={formData.highComplication === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="highComplication"
                                value="No"
                                checked={formData.highComplication === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>
                   
                    <label>High Complication Remarks: <input type="text" name="highComplicationRemarks" value={formData.highComplicationRemarks} onChange={handleChange} autoComplete="off" required /></label>
                </div>


                <hr />

                {/* Section 3 */}
                
                <div className='section_3'>
                    <label classname = 'label__div__radio'>
                        HIV:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="hiv"
                                value="Yes"
                                checked={formData.hiv === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="hiv"
                                value="No"
                                checked={formData.hiv === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Syphilis:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="syphilis"
                                value="Yes"
                                checked={formData.syphilis === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="syphilis"
                                value="No"
                                checked={formData.syphilis === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Malaria:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="maleria"
                                value="Yes"
                                checked={formData.maleria === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="maleria"
                                value="No"
                                checked={formData.maleria === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Hepatitis B:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="hepatitisB"
                                value="Yes"
                                checked={formData.hepatitisB === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="hepatitisB"
                                value="No"
                                checked={formData.hepatitisB === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                </div>
                <hr />

                {/* Section 4 */}
                <div className='section_4'>
                    <label classname = 'label__div__radio'>
                        Active Placita:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="activePlacita"
                                value="Yes"
                                checked={formData.activePlacita === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="activePlacita"
                                value="No"
                                checked={formData.activePlacita === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Labour Induction:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="labourInduction"
                                value="Yes"
                                checked={formData.labourInduction === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="labourInduction"
                                value="No"
                                checked={formData.labourInduction === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        MegasulfIinjection:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="megasulfIinjection"
                                value="Yes"
                                checked={formData.megasulfIinjection === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="megasulfIinjection"
                                value="No"
                                checked={formData.megasulfIinjection === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Oxytocin Injection:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="oxytocinInjection"
                                value="Yes"
                                checked={formData.oxytocinInjection === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="oxytocinInjection"
                                value="No"
                                checked={formData.oxytocinInjection === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Antibiotic:
                        <div className='radio__div'> 
                            <input
                                type="radio"
                                name="antibiotic"
                                value="Yes"
                                checked={formData.antibiotic === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="antibiotic"
                                value="No"
                                checked={formData.antibiotic === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                    <label classname = 'label__div__radio'>
                        Blood Transfusion:
                        <div className='radio__div'>
                            <input
                                type="radio"
                                name="bloodTransfusion"
                                value="Yes"
                                checked={formData.bloodTransfusion === "Yes"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>Yes</span>
                            <input
                                type="radio"
                                name="bloodTransfusion"
                                value="No"
                                checked={formData.bloodTransfusion === "No"}
                                onChange={handleRadioChange}
                                required
                            />
                            <span>No</span>
                        </div>
                    </label>

                </div>



                <button type="submit">Submit</button>
                <ToastContainer autoClose={3000} />
            </form>
        </div>

    );
}
export default FormOne;
