import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import './faq.css'; // Make sure you have the necessary styles imported
import QuestionData from "./QuestionData.json";

function Faq() {
  return (
    <Container className="col">
      <div className="page-parts-label">{`{ 02. FREQUENTLY ASKED QUESTIONS }`}</div>
        <h2 className="page-parts-title">FAQ</h2>
      <Accordion defaultActiveKey={["0"]} flush>
        {QuestionData.map((Data, index) => (
          <div key={index}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header>
                {Data.question}
              </Accordion.Header>
              <Accordion.Body>
                {Data.answer}
              </Accordion.Body>
            </Accordion.Item>
            {index !== QuestionData.length - 1 && <br />} {/* Add a horizontal line between items, excluding the last one */}
          </div>
        ))}
      </Accordion>
    </Container>
  );
}

export default Faq;
