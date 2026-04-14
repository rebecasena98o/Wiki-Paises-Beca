import '../style/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <span className="loader"></span>
      <p className="loader-text">Consultando o Atlas...</p>
    </div>
  );
};

export default Loader;