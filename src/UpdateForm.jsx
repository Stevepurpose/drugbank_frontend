import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar2 from './Navbar2';
import BACKENDURL from './Back';

const UpdateForm = ({ user, error, drugs, setDrugs }) => {
  let { _id } = useParams();
  const navigate = useNavigate();
  //const [drug, setDrug] = useState(null);
  const [drugName, setDrugName] = useState('');
  const [brand, setBrand] = useState('');
  const [numOfPacks, setNumOfPacks] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if(drugs){
    const drugToUpdate = drugs.find(drug => drug._id === _id);
    if (drugToUpdate) {
      setDrugName(drugToUpdate.drugName);
      setBrand(drugToUpdate.brand);
      setNumOfPacks(drugToUpdate.numOfPacks);
      setExpiryDate(drugToUpdate.expiryDate);
    }
  }
  }, [_id, drugs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    };

    const updatedDrug = { drugName, brand, numOfPacks, expiryDate };

    try {
      const res = await BACKENDURL.put(`/api/drugs/${_id}`, updatedDrug, { headers });
      if (res.status === 200) {
        alert("Drug updated!");
        const updatedDrugs = drugs.map(drug => (drug._id === _id ? res.data : drug));
        setDrugs(updatedDrugs);
        navigate('/');
      } else {
        alert("Failed to update drug.");
      }
    } catch (error) {
      console.log(error);
      alert("failed to update drugs")
    }
  };

  return (
    <div className='form-zone'>
      <Navbar2 />
      <h1>Update Drug</h1>
      <form className='form-div' onSubmit={handleSubmit} id='inner-form'>
        <input
          type="text"
          onChange={(e) => setDrugName(e.target.value)}
          value={drugName}
          placeholder='DRUG NAME'
          className='form-input2'
        />
        <input
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          placeholder='BRAND'
          className='form-input2'
        />
        <input
          type="number"
          onChange={(e) => setNumOfPacks(e.target.value)}
          value={numOfPacks}
          placeholder='NUM OF PACKS'
          className='form-input2'
        />
        <input
          type="date"
          onChange={(e) => setExpiryDate(e.target.value)}
          value={expiryDate}
          placeholder='EXPIRY DATE'
          className='form-input2'
        />
        <button id="tosubmit">UPDATE</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default UpdateForm;
