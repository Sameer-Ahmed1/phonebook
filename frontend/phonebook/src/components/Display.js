import { Container, Row, Col } from "react-bootstrap";

const Display = ({ message }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="bg-light p-2 rounded text-center">
            <p className="fs-6">{message}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Display;
