import React, { useState, useEffect } from 'react';
import { get, query, ref, orderByChild, equalTo } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
function generateUniqueId() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function isIdUniqueInFirebase(id) {
  const usersRef = ref(db, 'users');
  const q = query(usersRef, orderByChild('id'), equalTo(id));
  const snapshot = await get(q);
  return !snapshot.exists();
}

function isIdInRange(id) {
  return id >= 1 && id <= 999999;
}

async function createNewUserId(navigate) {
  let uniqueId;
  let isUnique, isInRange;

  do {
    uniqueId = generateUniqueId();
    isUnique = await isIdUniqueInFirebase(uniqueId);
    isInRange = isIdInRange(uniqueId);
  } while (!isUnique || !isInRange);

  // Use the navigate function to redirect to the formDetails page
  // navigate(`/formDetails/${uniqueId}`);

  return uniqueId;
}

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== '') {
      const formExists = await checkFormExists(searchQuery);

      if (formExists) {
        navigate(`/formDetails/${searchQuery}`);
      } else {
        console.log('Form not found. Please enter a valid form ID.');
      }
    } else {
      console.log('Please enter a valid form ID');
    }
  };

  const checkFormExists = async (formId) => {
    const formRef = ref(db, `${formId}`);

    try {
      const snapshot = await get(formRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking form existence:', error);
      return false;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const newUserId = await createNewUserId(navigate);
      setUserId(newUserId);
    }

    fetchData();
  }, [navigate]);

  return (
    <div className='main'>
      {/* SEARCH BAR */}
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Records"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* NEW ENTRY BUTTON */}
      <div>
        
        <button className="entryButton" onClick={() => navigate(`/formDetails/${userId}`)}>
          Create a new entry
        </button>
      </div>
    </div>
  );
}

export default Home;
