
const GraphView = ({ graph }) => {
  console.log('graph', graph);
  if (!graph) {
    return <div className="graph-view-container">Graph not found! Please check the ID or add graphs to the list.</div>;
  }

  // Derive dates and prices from the graph dataPoints
  const dates = graph.dataPoints.map(dp => dp.date);
  const prices = graph.dataPoints.map(dp => dp.price);

  // Calculate total amount
  const totalAmount = prices.reduce((acc, price) => acc + price, 0);

  return (
    <div className="graph-view-container">
      <div className="graph-details">
        <h2>Graph Details</h2>
        <p><strong>Type:</strong> {graph.type}</p>
        <p><strong>Description:</strong> {graph.description}</p>
        <p><strong>Dates:</strong> {dates.join(", ")}</p>
        <p><strong>Prices:</strong> {prices.join(", ")}</p>
      </div>
      <div className="total-amount">
        <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default GraphView;
