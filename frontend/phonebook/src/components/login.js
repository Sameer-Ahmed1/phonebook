import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleLogin} className="mt-3">
            <Form.Group>
              <Form.Label className="text-muted">Username</Form.Label>
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
              <Form.Label className="text-muted">Password</Form.Label>
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
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
