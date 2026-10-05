import { useEffect, useState } from "react";
import { getProducts, type Product } from "./api/productsApi";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError("Не удалось загрузить товары");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="shop">
      <header className="header">
        <h1>Интернет-магазин</h1>
      </header>

      <main className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image && (
              <img
                src={`http://26.232.142.16:8000${product.image}`}
                alt={product.title}
              />
            )}

            <div className="product-info">
              <h2>{product.title}</h2>

              <p>{product.description}</p>
              
              <p>Категория: {product.category.name}</p>

              <strong>{product.price} ₸</strong>

              <button>Добавить в корзину</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;