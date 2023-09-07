import { Link } from "react-router-dom";
import Auth from "layouts/Auth.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "services/firebaseConfig";
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
import { useState } from "react";

const PasswordReset = () => {

  const [email, setEmail] = useState("");
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const isFormValid = emailPattern.test(email);

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

  const resetPassword = (e) => {

    if (isFormValid) {
      e.preventDefault();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setAlertColor("info");
          setAlertTitle("Sucesso!");
          showErrorMessage("Verifique seu e-mail para obter instruções de redefinição de senha.");
          setEmail("");
        })
        .catch(() => {
          setAlertColor("danger");
          setAlertTitle("Erro!");
          showErrorMessage("Por favor, insira um email válido.");
        });
    }  else {
      setAlertColor("danger");
      setAlertTitle("Erro!");
      showErrorMessage("Por favor, insira um email válido.");
    }
  };

  return (
    <>
    <Auth>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="header-body text-center">
              <h1 className="text-muted">Esqueceu sua senha?</h1>
              <p className="text-muted"> Insira o seu email cadastrado para redefinir sua senha!</p>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-3"
                  color="primary"
                  type="button"
                  onClick={resetPassword}
                >
                  Redefinir senha
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
          <Link to="/login" className="text-light">
              <small>Ja possui uma conta?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/register" className="text-light">
              <small>Criar nova conta</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </Auth>
  </>
  );
};

export default PasswordReset;