import React, { useState, useEffect } from 'react';

function Application() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/?search=${searchTerm}`);
    
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }

    //Clean Up Function which clean when compo is unmounted

    return cleanUp

  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const cleanUp = () =>{
    setProducts([]);
  }
  return (
    <div className='main-div' style={{width:"45vw"}}>
      <h1>Product Search</h1>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder='Type here' />
      <button onClick={cleanUp}>Clean Up</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>Product Title: {product.title}</h3>
              <p>Product Descrition: {product.description}</p>
              <img src={product.image} alt="" style={{width:"100px", height:"100px"}}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Application;