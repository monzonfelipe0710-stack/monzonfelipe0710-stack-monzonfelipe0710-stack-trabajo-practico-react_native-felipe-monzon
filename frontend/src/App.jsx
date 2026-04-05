import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // GET
  const obtenerItems = () => {
    fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    obtenerItems();
  }, []);

  // POST
  const crearItem = () => {
    if (!nombre) return;

    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    })
      .then(() => {
        setNombre('');
        obtenerItems();
      });
  };

  // DELETE
  const eliminarItem = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE'
    })
      .then(() => obtenerItems());
  };

  // PUT
  const actualizarItem = () => {
    fetch(`http://localhost:3000/items/${editandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    })
      .then(() => {
        setNombre('');
        setEditandoId(null);
        obtenerItems();
      });
  };

  // Cargar datos en input para editar
  const iniciarEdicion = (item) => {
    setNombre(item.nombre);
    setEditandoId(item.id);
  };

  return (
    <div>
      <h1>CRUD Items</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      {editandoId ? (
        <button onClick={actualizarItem}>Actualizar</button>
      ) : (
        <button onClick={crearItem}>Crear</button>
      )}

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.nombre}
            <button onClick={() => iniciarEdicion(item)}>Editar</button>
            <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;