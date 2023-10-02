import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "services/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Auth from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const isFormValid = password.length >= 6 && emailPattern.test(email);

  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (isFormValid) {
      signInWithEmailAndPassword(email, password);
    }  else {
      setAlertColor("danger");
      setAlertTitle("Erro!");
      showErrorMessage("Por favor, insira um email válido e uma senha com pelo menos 6 caracteres.");
    }
  };

  useEffect(() => {
    if (error) {
      setAlertColor("danger");
      setAlertTitle("Erro!");
      showErrorMessage("E-mail ou senha incorretos.");
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      setAlertColor("info");
      setAlertTitle("Aguarde:");
      showErrorMessage("Conectando...");
    }
  }, [loading]);

  if (user) {
    return <AdminLayout />;
  }

  return (
    <>
      <Auth>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="header-body text-center">
                <h1 className="text-muted">Bem-vindo(a)!</h1>
                <p className="text-muted">Faça login para continuar!</p>
                {showAlert && (
                  <Alert color={alertColor}>
                    <strong>{alertTitle}</strong> {errorMessage}
                  </Alert>
                )}
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          className="ni ni-lock-circle-open"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Senha"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-3"
                    color="primary"
                    type="button"
                    onClick={handleSignIn}
                  >
                    Entrar
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link to="/reset" className="text-light">
                <small>Esqueceu sua senha?</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </Auth>
    </>
  );
};

export default Login;
