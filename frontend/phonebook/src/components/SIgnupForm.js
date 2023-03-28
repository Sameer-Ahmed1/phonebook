import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SignupForm = ({
  handleSignup,
  setUsername,
  setPassword,
  username,
  password,
  handleBack,
}) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleSignup} className="mt-3">
            <Form.Group>
              <Form.Label className="text-muted">Create username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                className="rounded-pill"
                style={{ backgroundColor: "#F8F8F8", border: "none" }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-muted">Create password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                className="rounded-pill"
                style={{ backgroundColor: "#F8F8F8", border: "none" }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="rounded-pill w-100 mt-3"
            >
              signup
            </Button>
            <Button
              onClick={handleBack}
              variant="secondary"
              className="rounded-pill w-100 mt-3"
            >
              go back
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
