import { useParams } from "react-router-dom";

const GraphView = ({ graphs }) => {
  console.log('graphs', graphs)
  const { id } = useParams(); // Get the graph ID from the URL
  const graph = graphs.find((g) => g.id === id);

  if (!graph) {
    return <div>Graph not found! Please check the ID or add graphs to the list.</div>;
  }

  const totalAmount = graph.prices.reduce((acc, price) => acc + price, 0);

  return (
    <div className="graph-view-container">
      <div className="graph-details">
        <h2>Graph Details</h2>
        <p><strong>Type:</strong> {graph.type}</p>
        <p><strong>Description:</strong> {graph.description}</p>
        {graph.dates.map((date, index) => (
          <div key={index}>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Price:</strong> {graph.prices[index]}</p>
          </div>
        ))}
      </div>
      <div className="total-amount">
        <h3>Total Amount</h3>
        <p>{totalAmount}</p>
      </div>
    </div>
  );
};

export default GraphView;
