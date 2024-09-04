import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import GraphView from './GraphView';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GraphListing = ({ graphs, onView, onDelete, selectedGraph }) => {
  console.log(graphs, 'selectedGraph', selectedGraph);

  const formatDataForChart = (dataPoints) => {
    const dates = dataPoints.map(point => point.date);
    const prices = dataPoints.map(point => point.price);

    return {
      labels: dates,
      datasets: [{
        label: 'Prices',
        data: prices,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        borderWidth: 2
      }]
    };
  };

  return (
    <div className="graph-listing-container">
      <div className="graph-listing">
        {graphs?.map((graph, index) => (
          <div key={graph.id} className="graph-item">
            <div className="graph-header">
              <h3>{graph.type}</h3>
              <p>{graph.description}</p>
            </div>
            <div className="graph-chart">
              <Line
                data={formatDataForChart(graph.dataPoints)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return `Price: $${tooltipItem.raw}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            <div className="button-group">
              <button onClick={() => onView(index)} className="view-button">
                View
              </button>
              <button onClick={() => onDelete(index)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedGraph && (
        <div className="graph-view">
          <GraphView graph={selectedGraph} />
        </div>
      )}
    </div>
  );
};

export default GraphListing;
