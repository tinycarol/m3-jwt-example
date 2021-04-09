import { useEffect, useState } from "react";

import { getProducts } from "../services/api.service";

export default function Products({ user }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);
  return (
    <div className="products">
      <h1>💰 {user.username}, check out our selection of products 💰</h1>
      <div className="products__wrapper">
        {products.length > 0
          ? products.map((p, i) => (
              <h2 key={p.id}>
                {p.name}, sold by {p.user.username} for {p.price / 100}€
              </h2>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}
