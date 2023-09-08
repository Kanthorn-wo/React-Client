import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    detail: '',
    price: ''
  });

  useEffect(() => {
    loadData(id);
  }, [id]);

  const loadData = async (id) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `/product/${id}`); // Construct the correct API endpoint URL
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(process.env.REACT_APP_API + `/product/${id}`, data);
      loadData(id);
      navigate('/');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <div>FormEditProduct</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => handleChange(e)}
          value={data.name}
        />
        <br />
        <input
          type="text"
          name="detail"
          placeholder="Detail"
          onChange={(e) => handleChange(e)}
          value={data.detail}
        />
        <br />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={(e) => handleChange(e)}
          value={data.price ? data.price : 'null'}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormEditProduct;
