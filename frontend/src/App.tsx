import { useEffect, useState } from "react";
import { getProducts, type Product } from "./api/productsApi";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
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

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    const index = cart.findIndex((product) => product.id === id);

    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const total = cart.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  if (loading) {
    return (
      <div className="message">
        <h1>Загрузка товаров...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message">
        <h1>{error}</h1>
        <button onClick={() => window.location.reload()}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="shop">
      <header className="header">
        <h1>Интернет-магазин</h1>

        <div className="cart-info">
          Корзина: {cart.length} | {total} ₸
        </div>
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

              <p className="category">
                Категория: {product.category.name}
              </p>

              <strong>{product.price} ₸</strong>

              <button onClick={() => addToCart(product)}>
                Добавить в корзину
              </button>

              {cart.some((item) => item.id === product.id) && (
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(product.id)}
                >
                  Убрать из корзины
                </button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;