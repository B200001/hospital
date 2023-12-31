import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import db from '../firebase';
import '../styles/previewOne.scss';

const PreviewOne = () => {
    const { userId } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const dbRef = ref(db, userId);

        const unsubscribe = onValue(dbRef, (snapshot) => {
            const dataFromDb = snapshot.val();
            setData(dataFromDb || {});
        });

        return () => {
            unsubscribe();
        };
    }, [userId]);
    
    const renderData = () => {
        const formOneData = data.formOneData || {}; // Access Form 1 data

        return Object.entries(formOneData).map(([fieldName, value]) => (
            <tr key={fieldName}>
                <td>{fieldName}</td>
                <td>{typeof value === 'object' ? renderData(value) : value}</td>
            </tr>
        ));
    };

    const isDataFilled = () => {
        // Check if formTwoData exists in the data object
        return data && data.formTwoData;
    };

    const FormTwoComponent = isDataFilled() ? 'FormTwoView' : 'FormTwo';
    

    return (
        <div className="preview-container">
            <h1>Data Preview for User: {userId}</h1>
            <div className="data-container">
                <table>
                    <tbody>
                        {renderData(data)}
                    </tbody>
                </table>
            </div>
            {/* Buttons */}
            <div className="preview-two-buttons">
                <Link to={`/${FormTwoComponent}/${userId}`}>
                    <button className="preview-two-button">Go to FormTwo</button>
                </Link>
                <Link to={'/Hospital/'}>
                    <button className="preview-two-button">Exit</button>
                </Link>
                
            </div>
        </div>
    );

};

export default PreviewOne;



