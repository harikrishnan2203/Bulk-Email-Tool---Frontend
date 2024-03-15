import { Container, Row, Col } from 'react-bootstrap';
import { htmlToText } from "html-to-text";

const ExpandedComponent = ({ data }) => {
  // Assuming htmlToText is a function that converts HTML to plain text
  const plainTextBody = htmlToText(data.body, { wordwrap: 130 });
    console.log(plainTextBody)
  return (
    <Container className="d-flex justify-content-start m-3">
      <Row>
        <Col className="">
          <p>
            <strong>From:</strong> {data.from}
          </p>
          <p>
            <strong>Recipients:</strong>{" "}
            {data.recipients.map((res, index) => {
              return <li key={index}>{res}</li>;
            })}
          </p>
          <p>
            <strong>Subject:</strong> {data.subject}
          </p>
          <p>
            <strong>Body:</strong> <div></div> {plainTextBody}
          </p>
          <p>
            <strong>Accepted:</strong>{" "}
            {data.accepted.map((res, index) => {
              return <li key={index}>{res}</li>;
            })}
          </p>
          <p>
            <strong>Rejected: {" "}</strong>
            {data.rejected && data.rejected.length > 0 ? (
              <ul>
                {data.rejected.map((res, index) => (
                  <li key={index}>{res}</li>
                ))}
              </ul>
            ) : (
              "No Rejections"
            )}
          </p>
          <p>
            <strong>Time:</strong> {new Date(data.time).toLocaleString()}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpandedComponent;
