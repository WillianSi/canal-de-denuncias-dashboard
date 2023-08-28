import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import CommonLayout from "layouts/CommonLayout.js";

const SeeMore = (props) => {
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
                    <h2 className=" text-dark  px-4">
                      Informação do incidente: #33
                    </h2>
                  </Col>
                  <Button
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Avaliar
                  </Button>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="3">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Data de abertura: 22/08/2023
                        </label>
                      </Col>
                      <Col lg="3">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Status: Aguardando
                        </label>
                      </Col>
                      <Col lg="4">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Finalizado: 22/08/2023
                        </label>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    {/* Table */}
                    <Row>
                      <div className="col">
                        <Card className="shadow">
                          <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Respostas do Formulário</h3>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="text-center thead-light">
                              <tr>
                                <th scope="col">Pergunta</th>
                                <th scope="col">Resposta</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              <tr>
                                <td>Qual a sua relação com o Grupo Dínamo?</td>
                                <td>Fornecedor</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </div>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default SeeMore;
