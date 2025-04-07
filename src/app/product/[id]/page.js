"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:70/nextapi/product-details.php?id=${id}`)
        .then(res => setProduct(res.data));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image_url} width="200" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
