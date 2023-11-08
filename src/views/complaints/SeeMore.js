import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header.js";
import CommonLayout from "layouts/CommonLayout.js";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
import AvaliarCaso from "./AvaliarCaso.js";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";

const SeeMore = () => {
  const { id } = useParams();
  const [incidentData, setIncidentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch incident data by ID
  const fetchIncidentData = async (incidentId) => {
    try {
      const db = getFirestore();
      const incidentRef = doc(db, "incident", incidentId);
      const incidentSnapshot = await getDoc(incidentRef);

      if (incidentSnapshot.exists()) {
        const data = incidentSnapshot.data();
        setIncidentData(data);
      } else {
        console.log(`Incident with ID ${incidentId} not found.`);
      }
    } catch (error) {
      console.error("Error fetching incident data:", error);
    }
  };

  useEffect(() => {
    fetchIncidentData(id);
  }, [id]);

  const renderPerguntasERespostas = () => {
    const perguntas = incidentData?.pergunta || [];
    const respostas = incidentData?.resposta || [];
  
    return perguntas.map((pergunta, index) => (
      <tr key={index}>
        <td style={{ whiteSpace: 'normal', textJustify: 'inter-word' }}>{pergunta}</td>
        <td className="text-center align-middle" style={{ whiteSpace: 'normal', textJustify: 'inter-word' }}>
          {respostas[index].startsWith("https://firebasestorage.googleapis.com") ? (
            <a
              href={respostas[index]}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-default btn-sm"
            >
              Abrir arquivo
            </a>
          ) : (
            <span style={{ whiteSpace: 'normal', textAlign: 'justify', textJustify: 'inter-word' }}>{respostas[index]}</span>
          )}
        </td>
      </tr>
    ));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <CommonLayout>
      <AuthenticatedLayout>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
              <Row className="d-flex justify-content-between align-items-center">
      <Col xs="8">
        <h2 className="text-dark px-4">
          Informação do incidente: {incidentData?.referencia}
        </h2>
      </Col>
      <div className="d-flex align-items-center">
        <Button
          color="default"
          href="#pablo"
          onClick={toggleModal}
          style={{ maxWidth: "100%", whiteSpace: "normal" }}
        >
          Avaliar
        </Button>
        <AvaliarCaso
          isOpen={isModalOpen}
          onClose={toggleModal}
          id={id}
          fetchIncidentData={fetchIncidentData}
        />
      </div>
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
                          Data de abertura: {incidentData?.data_criacao}
                        </label>
                      </Col>
                      <Col lg="3">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Status:{" "}
                          <span
                            className={`${
                              incidentData?.status === 0
                                ? "text-danger"
                                : incidentData?.status === 1
                                ? "text-info"
                                : incidentData?.status === 2
                                ? "text-success"
                                : ""
                            }`}
                          >
                            {incidentData?.status === 0
                              ? "Aguardando"
                              : incidentData?.status === 1
                              ? "Analisando"
                              : incidentData?.status === 2
                              ? "Finalizado"
                              : "N/A"}
                          </span>
                        </label>
                      </Col>

                      <Col lg="4">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Dia:{" "}
                          {incidentData?.finalizado
                            ? incidentData.finalizado
                                .toDate()
                                .toLocaleDateString()
                            : "N/A"}
                        </label>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <div className="col">
                        <Card className="shadow">
                          <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Perguntas e Respostas</h3>
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
                              {renderPerguntasERespostas()}
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
      </AuthenticatedLayout>
    </CommonLayout>
  );
};

export default SeeMore;
