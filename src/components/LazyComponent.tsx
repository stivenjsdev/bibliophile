const LazyComponent = () => {
  return (
    <div className="bg-blue-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Este es el Lazy Component</h2>
      <p>Este contenido se carga de manera diferida cuando es necesario.</p>
    </div>
  );
};

export default LazyComponent;
