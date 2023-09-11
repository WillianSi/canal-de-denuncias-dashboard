import { Link } from "react-router-dom";
import Chart from "chart.js";
import { BsChevronCompactRight } from "react-icons/bs";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";

import Header from "components/Headers/HeaderHome.js";

const Index = (props) => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
    <AuthenticatedLayout>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Últimos Incidentes</h3>
                <Button
                  color="info"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Acesse o Canal{" "}
                  <BsChevronCompactRight
                    style={{ color: "#fff", fontSize: "15px" }}
                  />
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="text-center thead-light">
                  <tr>
                    <th scope="col">Referência</th>
                    <th scope="col">Data de Criação</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>0</td>
                    <td>0</td>
                    <td className="align-middle text-center">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Aguardando
                      </Badge>
                    </td>
                    <td className="text-center align-middle">
                      <Link to="/admin/seemore">
                        <Button color="default" size="sm">
                          Veja mais +
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      </AuthenticatedLayout>
    </>
  );
};

export default Index;
