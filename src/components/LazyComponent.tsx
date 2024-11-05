const LazyComponent = () => {
  return (
    <div className="bg-[rgb(183,236,236)] p-4 rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-2">Este es el Lazy Component</h2>
      <p>Este contenido se carga de manera diferida cuando es necesario.</p>
    </div>
  );
};

export default LazyComponent;
