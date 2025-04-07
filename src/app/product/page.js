'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://ascinate.in/demo/nextapi/products.php')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <Link href={`/product/${p.id}`}>
            <div>
              <h3>{p.title}</h3>
              <p>Price: ${p.price}</p>
              <img src={p.image_url} width="150" alt={p.title} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
