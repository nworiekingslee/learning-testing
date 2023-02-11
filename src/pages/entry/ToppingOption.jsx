export default function ToppingOption({ name, imagePath }) {
  return (
    <div className="option-card">
      <img src={imagePath} alt={`${name} topping`} />
    </div>
  );
}
