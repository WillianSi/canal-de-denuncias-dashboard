import { Link } from "react-router-dom";
import Chart from "chart.js";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Button, Card, CardHeader, Table, Container, Row } from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Forms = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

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
                <Link to="/admin/fromQuestions">
                  <Button color="info">Adicionar Pregunta +</Button>
                </Link>
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
                        onClick={(e) => e.preventDefault()}
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
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                        className="bg-transparent border-0"
                      >
                        <BsFillTrashFill
                          style={{ color: "#525f7f", fontSize: "15px" }}
                        />
                      </Button>
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
