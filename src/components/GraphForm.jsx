import { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import GraphListing from "./GraphListing";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

// Validation schema
const validationSchema = Yup.object({
  graphs: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required("ID is required"),
        type: Yup.string().required("Type is required"),
        description: Yup.string().required("Description is required"),
        dataPoints: Yup.array()
          .of(
            Yup.object({
              date: Yup.string().required("Date is required"),
              price: Yup.number().required("Price is required"),
            })
          )
          .required("At least one data point is required"),
      })
    )
    .required("At least one graph is required"),
});

const GraphForm = () => {
  const [graphs, setGraphs] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState(null);

  const handleView = (index) => {
    setSelectedGraph(graphs[index]);
  };

  const handleDelete = (index) => {
    setGraphs(graphs.filter((_, i) => i !== index));
    if (selectedGraph && selectedGraph.id === graphs[index].id) {
      setSelectedGraph(null);
    }
  };

  const handleSubmit = (values) => {
    const updatedGraphs = values.graphs.map((graph) => ({
      ...graph,
      id: uuidv4(),
    }));
    setGraphs(updatedGraphs);
  };

  return (
    <>
      <Formik
        initialValues={{
          graphs: [
            {
              id: uuidv4(),
              type: "",
              description: "",
              dataPoints: [
                { date: "", price: "" },
              ],
            },
          ],
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const isFormValid = () => {
            return values.graphs.every((graph) => {
              const dataPointsValid = graph.dataPoints.every(
                (dataPoint) => dataPoint.date && dataPoint.price
              );
              return graph.type && graph.description && dataPointsValid;
            });
          };

          return (
            <Form className="form-container">
              <FieldArray name="graphs">
                {({ push, remove }) => (
                  <>
                    {values.graphs.map((graph, graphIndex) => (
                      <div key={graphIndex} className="graph-section">
                        <div className="form-row">
                          <Field
                            type="text"
                            name={`graphs.${graphIndex}.type`}
                            placeholder="Type"
                            className="input-field"
                          />
                          <Field
                            type="text"
                            name={`graphs.${graphIndex}.description`}
                            placeholder="Description"
                            className="input-field"
                          />
                        </div>
                        <FieldArray name={`graphs.${graphIndex}.dataPoints`}>
                          {({ push: pushDataPoint, remove: removeDataPoint }) => (
                            <>
                              {graph.dataPoints.map((dataPoint, dataIndex) => (
                                <div key={dataIndex} className="data-point-row">
                                  <Field
                                    type="date"
                                    name={`graphs.${graphIndex}.dataPoints.${dataIndex}.date`}
                                    className="input-field"
                                  />
                                  <Field
                                    type="number"
                                    name={`graphs.${graphIndex}.dataPoints.${dataIndex}.price`}
                                    placeholder="Price"
                                    className="input-field"
                                  />
                                  <div className="button-icons">
                                    <button
                                      type="button"
                                      onClick={() => removeDataPoint(dataIndex)}
                                      disabled={graph.dataPoints.length === 1}
                                      className="icon-button"
                                    >
                                      <FontAwesomeIcon icon={faMinusCircle} />
                                    </button>
                                    {dataIndex === graph.dataPoints.length - 1 && (
                                      <button
                                        type="button"
                                        onClick={() => pushDataPoint({ date: "", price: "" })}
                                        className="icon-button"
                                      >
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                        <div className="button-row">
                          <button
                            type="button"
                            onClick={() => remove(graphIndex)}
                            disabled={values.graphs.length === 1}
                            className="remove-graph-button"
                          >
                            Remove Graph
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: uuidv4(),
                          type: "",
                          description: "",
                          dataPoints: [{ date: "", price: "" }],
                        })
                      }
                      disabled={!isFormValid()}
                      className="add-graph-button"
                    >
                      Add Graph
                    </button>
                  </>
                )}
              </FieldArray>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      <GraphListing
        graphs={graphs}
        onView={handleView}
        onDelete={handleDelete}
        selectedGraph={selectedGraph}
      />
    </>
  );
};

export default GraphForm;
