import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Auth from "layouts/Auth.js";
import { useState, useEffect } from 'react';
import { auth } from 'services/firebaseConfig';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const isFormValid = email.length >= 6 && password.length >= 6;
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      signInWithEmailAndPassword(email, password);
    } else {
      setErrorMessage('E-mail ou senha incorretos.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

  if (error) {
    return (
      <Login />
    );
  }

  if (user) {
    return (
      <AdminLayout />
    );
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
                  <Alert color="danger">
                    <strong>Erro!</strong> {errorMessage}
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
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Senha"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-3" color="primary" type="button" onClick={handleSignIn}>
                    Entrar
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Esqueceu sua senha?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Criar nova conta</small>
              </a>
            </Col>
          </Row>
        </Col>
      </Auth>
    </>
  );
};

export default Login;
