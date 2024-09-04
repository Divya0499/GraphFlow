import { useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import GraphListing from "./GraphListing";

// Validation schema
const validationSchema = Yup.object({
  graphs: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required("ID is required"),
        type: Yup.string().required("Type is required"),
        description: Yup.string().required("Description is required"),
        dates: Yup.array().of(Yup.string().required("Date is required")),
        prices: Yup.array().of(Yup.number().required("Price is required")),
      })
    )
    .required("At least one graph is required"),
});

const GraphForm = () => {
  const [graphs, setGraphs] = useState([]);

  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleView = (id) => {
    navigate(`/graph/${id}`); // Redirect to the detail page with the graph ID
  };

  const handleDelete = (index) => {
    setGraphs(graphs.filter((_, i) => i !== index));
  };

  const handleSubmit = (values) => {
    const updatedGraphs = values.graphs.map((graph) => ({
      ...graph,
      id: uuidv4(), // Generate a unique ID for each graph
    }));
    setGraphs(updatedGraphs);
  };

  return (
    <>
      <Formik
        initialValues={{
          graphs: [
            {
              id: uuidv4(), // Automatically generate a UUID when the form is initialized
              type: "",
              description: "",
              dates: [""],
              prices: [""],
            },
          ],
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit }) => {
          const isFormValid = () => {
            return values.graphs.every((graph) => {
              const datesValid = graph.dates.every((date) => date);
              const pricesValid = graph.prices.every((price) => price);
              return (
                graph.type &&
                graph.description &&
                datesValid &&
                pricesValid
              );
            });
          };

          return (
            <Form onSubmit={handleSubmit} className="form-container">
              <FieldArray name="graphs">
                {({ push, remove }) => (
                  <>
                    {values.graphs.map((graph, graphIndex) => (
                      <div key={graphIndex} className="graph-section">
                        <div className="field-container">
                          <Field
                            type="text"
                            name={`graphs.${graphIndex}.type`}
                            placeholder="Type"
                            className="input-field"
                          />
                          <ErrorMessage
                            name={`graphs.${graphIndex}.type`}
                            component="div"
                            className="error"
                          />
                          <Field
                            type="text"
                            name={`graphs.${graphIndex}.description`}
                            placeholder="Description"
                            className="input-field"
                          />
                          <ErrorMessage
                            name={`graphs.${graphIndex}.description`}
                            component="div"
                            className="error"
                          />
                        </div>

                        <FieldArray name={`graphs.${graphIndex}.dates`}>
                          {({ push: pushDate, remove: removeDate }) => (
                            <>
                              {graph.dates.map((date, dateIndex) => (
                                <div key={dateIndex} className="date-row">
                                  <Field
                                    type="date"
                                    name={`graphs.${graphIndex}.dates.${dateIndex}`}
                                    className="input-field"
                                  />
                                  <ErrorMessage
                                    name={`graphs.${graphIndex}.dates.${dateIndex}`}
                                    component="div"
                                    className="error"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeDate(dateIndex)}
                                    disabled={graph.dates.length === 1}
                                    className="remove-button"
                                  >
                                    Remove Date
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => pushDate("")}
                                className="add-button"
                              >
                                Add Date
                              </button>
                            </>
                          )}
                        </FieldArray>

                        <FieldArray name={`graphs.${graphIndex}.prices`}>
                          {({ push: pushPrice, remove: removePrice }) => (
                            <>
                              {graph.prices.map((price, priceIndex) => (
                                <div key={priceIndex} className="price-row">
                                  <Field
                                    type="number"
                                    name={`graphs.${graphIndex}.prices.${priceIndex}`}
                                    className="input-field"
                                  />
                                  <ErrorMessage
                                    name={`graphs.${graphIndex}.prices.${priceIndex}`}
                                    component="div"
                                    className="error"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePrice(priceIndex)}
                                    disabled={graph.prices.length === 1}
                                    className="remove-button"
                                  >
                                    Remove Price
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => pushPrice("")}
                                className="add-button"
                              >
                                Add Price
                              </button>
                            </>
                          )}
                        </FieldArray>

                        <button
                          type="button"
                          onClick={() => remove(graphIndex)}
                          disabled={values.graphs.length === 1}
                          className="remove-graph-button"
                        >
                          Remove Graph
                        </button>
                        <button
                          type="button"
                          onClick={() => handleView(graph.id)} // Redirect on view
                          className="view-button"
                        >
                          View
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: uuidv4(),
                          type: "",
                          description: "",
                          dates: [""],
                          prices: [""],
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
      />
    </>
  );
};

export default GraphForm;
