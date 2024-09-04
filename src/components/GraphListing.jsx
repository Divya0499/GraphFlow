import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import GraphView from './GraphView';
// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GraphListing = ({ graphs, onView, onDelete }) => {
  return (
    <div>
      {graphs?.map((graph, index) => (
        <div key={graph.id} className="graph-listing">
          <h3>{graph.type}</h3>
          <p>{graph.description}</p>
          <Line
            data={{
              labels: graph.dates,
              datasets: [{
                label: 'Prices',
                data: graph.prices,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
              }]
            }}
            options={{ responsive: true }}
          />
          <button onClick={() => onView(index)}>View</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
      <GraphView graphs={graphs}/>
    </div>
  );
};

export default GraphListing;
