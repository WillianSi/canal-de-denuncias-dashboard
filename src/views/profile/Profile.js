import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useUpdateEmail, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firebaseConfig";
import { useEffect, useState } from "react";

const Profile = () => {

  const [email, setEmail] = useState('');
  const [updateEmail, updating, error] = useUpdateEmail(auth);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormValid = newPassword.length >= 6;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    }, 4000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setAlertColor("danger");
      setAlertTitle("Erro!");
      showErrorMessage("Por favor, insira um email.");
    } else if (!emailPattern.test(email)) {
      setAlertColor("danger");
      setAlertTitle("Erro!");
      showErrorMessage("Por favor, insira um email válido.");
    }  else {
      try {
        // Tenta atualizar o email usando a função updateEmail
        const success = await updateEmail(email);

        if (success) {
          setAlertColor("success");
          setAlertTitle("Sucesso!");
          showErrorMessage("Email alterado com sucesso.");
        } else {
          console.error("Erro ao atualizar o email: atualização mal-sucedida");
          setAlertColor("danger");
          setAlertTitle("Erro!");
          showErrorMessage("Erro ao atualizar o email 3433.");
        }
      } catch (error) {
        setAlertColor("danger");
        setAlertTitle("Erro!");
        showErrorMessage(error.message);
      }
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();

    if (isFormValid) {
      if (newPassword === confirmPassword) {
        setShowPassword("");
        setConfirmPassword("");
      } else {
        setAlertColor("danger");
        setAlertTitle("Erro!");
        showErrorMessage("As senhas não coincidem.");
      }
    } else {
      setAlertColor("danger");
      setAlertTitle("Erro!");
      showErrorMessage(
        "Por favor, insira uma senha com pelo menos 6 caracteres."
      );
    }
  };

  const [oldEmail, setOldEmail] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setOldEmail(user.email);
    }
  }, [user]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="4">
                    <h3 className="mb-0">Minha conta</h3>
                  </Col>
                  <Col xs="8">
                    {showAlert && (
                      <Alert color={alertColor} className="mt-2">
                        <strong>{alertTitle}</strong> {errorMessage}
                      </Alert>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informação do usuário
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Endereço de email atual
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            type="email"
                            value={oldEmail}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-new-email"
                          >
                            Novo endereço de email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-new-email"
                            placeholder="email@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="info" onClick={handleEmail}>
                      Mudar email
                    </Button>
                  </div>
                </Form>
                <Form>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">Senha</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Nova senha
                          </label>
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
                              placeholder="Nova senha"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Confirmar nova senha
                          </label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirmar senha"
                              type={"password"}
                              autoComplete="new-password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="info" onClick={handlePassword}>
                      Mudar senha
                    </Button>
                  </div>
                  <hr className="my-2" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
