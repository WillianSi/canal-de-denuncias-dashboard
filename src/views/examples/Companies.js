import { Link } from "react-router-dom";
import { BiFilterAlt } from "react-icons/bi";
import Chart from "chart.js";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Companies = (props) => {
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
                <h3 className="mb-0">Incidentes</h3>
                <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText
                          style={{
                            backgroundColor: "#11cdef",
                            borderColor: "#11cdef",
                          }}
                        >
                          <i
                            className="fas fa-search"
                            style={{ color: "white" }}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        style={{ borderColor: "#11cdef", color: "black"}}
                        className="placeholder-black"
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Button
                  color="info"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Filtrar por Status{" "}
                  <BiFilterAlt style={{ color: "#fff", fontSize: "18px" }} />
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
                      <Link to="/admin/SeeMore">
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
    </>
  );
};

export default Companies;
