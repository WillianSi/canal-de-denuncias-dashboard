import React, { useState } from "react";
import Chart from "chart.js";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Button, Card, CardHeader, Table, Container, Row } from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import Header from "components/Headers/Header.js";
import FromQuestions from "./FromQuestions.js";
import ExcluirQuestion from "./ExcluirQuestion.js";

const Forms = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleExcluirModal = () => {
    setIsExcluirModalOpen(!isExcluirModalOpen);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Formulário</h3>
                {/* Botão para abrir o modal */}
                <Button color="info" onClick={toggleModal}>
                  Adicionar Pregunta +
                </Button>
                <FromQuestions isOpen={isModalOpen} onClose={toggleModal} />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="text-center thead-light">
                  <tr>
                    <th scope="col">Pergunta</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>Qual a sua relação com o Grupo Dínamo?</td>
                    <td>Dropdown</td>

                    <td className="text-center align-middle">
                      <Button
                        color="default"
                        href="#pablo"
                        onClick={toggleModal}
                        size="sm"
                        className="bg-transparent border-0"
                      >
                        <BsFillPencilFill
                          style={{ color: "#525f7f", fontSize: "15px" }}
                        />
                      </Button>
                      <Button
                        color="default"
                        href="#pablo"
                        onClick={toggleExcluirModal}
                        size="sm"
                        className="bg-transparent border-0"
                      >
                        <BsFillTrashFill
                          style={{ color: "#525f7f", fontSize: "15px" }}
                        />
                      </Button>
                      <ExcluirQuestion isOpen={isExcluirModalOpen} toggle={toggleExcluirModal}/>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Forms;
