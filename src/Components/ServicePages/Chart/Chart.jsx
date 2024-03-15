import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ChartLogs } from "../../Utils/axios";
import Chart from "chart.js/auto";

function EmailChart() {
  const currentMontheFirstDay = new Date();
  currentMontheFirstDay.setDate(1);
  const [emailData, setEmailData] = useState([]);
  const [startDate, setStartDate] = useState(currentMontheFirstDay);
  const [endDate, setEndDate] = useState(new Date());

  console.log(emailData);
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = () => {
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    const values = { startDate: formattedStartDate, endDate: formattedEndDate };

    ChartLogs(values)
      .then((res) => {
        // console.log(res.data.data)
        // console.log(res.data.mails)
        if (res.data) {
          const groupedData = res.data.data.reduce((acc, curr) => {
            const date = new Date(curr.time).toLocaleDateString();
            acc[date] = acc[date] ? acc[date] + 1 : 1;
            return acc;
          }, {});
          const chartData = Object.entries(groupedData).map(
            ([date, count]) => ({ date, count })
          );
          setEmailData(chartData);
        } else {
          console.error("Invalid response data:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching email data:", error);
      });
  };

  const scale = {
    x: {
      display: true,
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Count",
      },
      suggestedMin: -10,
      suggestedMax: 200,
    },
  };

  useEffect(() => {
    const ctx = document.getElementById("emailChart-1");
    if (ctx) {
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: emailData.map((data) => {
            const lable = data.date.split("/");
            return `${lable[1]}/${lable[0]}`;
          }),
          datasets: [
            {
              label: "Emails Sent",
              data: emailData.map((data) => data.count),
              backgroundColor: "rgba(87, 252, 112, 0.74)",
              borderColor: "#d61753",
              borderWidth: 2,
              borderRadius: 5,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date/month",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [emailData]);

  useEffect(() => {
    const ctx = document.getElementById("emailChart-2");
    if (ctx) {
      const chart = new Chart(ctx, {
        type: "radar",
        data: {
          // labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
          labels: emailData.map((data) => data.date),
          datasets: [
            {
              label: "Emails Sent",
              data: emailData.map((data) => data.count),
              backgroundColor: "rgba(211, 23, 248, 0.2)",
              borderColor: "#d61753",
              borderWidth: 2,
              borderRadius: 5,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [emailData]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>Chart</h3>
          <Form>
            <Row className="mb-3 align-items-end">
              <Form.Group as={Col} controlId="startDate">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate.toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="endDate">
                <Form.Label>End Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate.toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="Count">
                {" "}
                <Form.Text>
                  <span className="h2 text-black">
                    Count:{"  "}
                    <span className="text-primary">
                      {emailData.reduce((acc, data) => acc + data.count, 0)}
                    </span>
                  </span>
                </Form.Text>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center h4">Date<span>{" / "}</span>Count</div>
            <canvas id="emailChart-1" width="400" height="200"></canvas>
          </Form>
        </Col>
        {/* <Col md={6}>
        <canvas id="emailChart-2" width="400" height="200"></canvas>
        </Col> */}
      </Row>
    </Container>
  );
}

export default EmailChart;
