import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
const FormProduct = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState([])
  useEffect(() => {
    loadData()

  }, [])

  const loadData = async () => {
    axios.get(process.env.REACT_APP_API + `/product`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }

  const handleChange = (e) => {
    console.log(e.target.name)
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    await axios.post(process.env.REACT_APP_API + `/product`, form)
      .then((res) => {
        console.log(res.data)
        loadData();
      })
      .catch((err) => console.log(err))
  }

  const handleRemove = async (id) => {
    console.log('id:', id)
    await axios.delete(process.env.REACT_APP_API + `/product/` + id)
      .then((res) => {
        console.log(res.data)
        loadData();
      })
      .catch((err) => console.log(err))
  }
  return (

    <div>
      <h1>Form</h1>
      <form onSubmit={handelSubmit}>
        <input type='text'
          name='name'
          placeholder='Name'
          onChange={(e) => handleChange(e)} /> <br
        />
        <input type='text'
          name='detail'
          placeholder='Detail'
          onChange={(e) => handleChange(e)}
        /> <br />
        <input type='text'
          name='price'
          placeholder='Price'
          onChange={(e) => handleChange(e)}
        /> <br />
        <button type='submit'>Submit</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%' }}>
          <thead>
            <tr >
              <th >#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Deatail</th>
              <th>Pirce</th>
              <th>action</th>

            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.detail}</td>
                <td>{item.price ? item.price : 'null'}</td>
                <td>
                  <button onClick={() => handleRemove(item._id)}>Delete</button>
                  <Link to={`/edit/${item._id}`}>
                    <button >Edit</button>
                  </Link>

                </td>


              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FormProduct