const ScoopOptions = ({ name, imagePath }) => {
  return (
    <div className="option-card">
      <img src={imagePath} alt={`${name} scoop`} />
    </div>
  );
};

export default ScoopOptions;
