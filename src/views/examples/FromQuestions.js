import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Input,
  FormGroup,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import CommonLayout from "layouts/CommonLayout.js";

const FromQuestions = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [mostrarCamposQuestao, setMostrarCamposQuestao] = useState(false);

  const handleTipoChange = (event) => {
    const novoTipo = event.target.value;
    setTipoSelecionado(novoTipo);

    // Mostrar campos de questão apenas se o tipo for "Dropdown"
    setMostrarCamposQuestao(novoTipo === "Dropdown");
  };
  return (
    <CommonLayout>
      <Header />

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="border-0 d-flex justify-content-between ">
                  <Col xs="8">
                    <h2 className=" text-dark  px-4">Pergunta:</h2>
                  </Col>
                </Row>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-text"
                          >
                            Titulo
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-text"
                            placeholder="exemplo: Qual a sua relação com o Grupo?"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="select-dropdown"
                          >
                            Tipo
                          </label>
                          <select
                            className="form-control form-control-alternative"
                            id="select-dropdown"
                            name="tipo"
                            value={tipoSelecionado}
                            onChange={handleTipoChange}
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="Dropdown">Dropdown</option>
                            <option value="Arquivo">Arquivo</option>
                            <option value="PerguntaAberta">
                              Pergunta aberta
                            </option>
                          </select>
                        </FormGroup>

                        {mostrarCamposQuestao &&
                          tipoSelecionado === "Dropdown" && (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-questoes"
                              >
                                Questões do Dropdown
                              </label>
                              <textarea
                                className="form-control form-control-alternative"
                                id="input-questoes"
                                name="questoes"
                                placeholder="Digite as questões aqui..."
                              />
                            </FormGroup>
                          )}
                      </Col>
                    </Row>
                    <Button
                      color="success"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Finalizar
                    </Button>
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              </CardHeader>
              <CardBody>
                <Form></Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default FromQuestions;
