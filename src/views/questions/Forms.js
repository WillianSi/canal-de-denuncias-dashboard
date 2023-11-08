import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import {
  Alert,
  Badge,
  Button,
  Col,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
import { chartOptions, parseOptions } from "variables/charts.js";
import Header from "components/Headers/Header.js";
import FromQuestions from "./FromQuestions.js";
import ExcluirQuestion from "./ExcluirQuestion.js";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "services/firebaseConfig.js";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";

const Forms = (props) => {
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [excluirModalOpen, setExcluirModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const handleAlert = (message, color, title) => {
    setErrorMessage(message);
    setAlertColor(color);
    setAlertTitle(title);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleModal = (question) => {
    setSelectedQuestion(question);
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = (question) => {
    setSelectedQuestion(question);
    setEditModalOpen(!editModalOpen);
  };

  const toggleExcluirModal = (questionId) => {
    setExcluirModalOpen(!excluirModalOpen);
    setSelectedQuestionId(questionId);
  };

  const fetchFirestoreData = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "forms"));
      const questionsData = [];
      querySnapshot.forEach((doc) => {
        const questionData = {
          id: doc.id,
          ...doc.data(),
        };
        questionsData.push(questionData);
      });
      setQuestions(questionsData);
    } catch (error) {
      console.error("Erro ao buscar dados do Firestore: ", error);
    }
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  useEffect(() => {
    const db = getFirestore(app);
    const unsubscribe = onSnapshot(collection(db, "forms"), (snapshot) => {
      const questionsData = [];
      snapshot.forEach((doc) => {
        const questionData = {
          id: doc.id,
          ...doc.data(),
        };
        questionsData.push(questionData);
      });
      setQuestions(questionsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <AuthenticatedLayout>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Formulário</h3>
                  <Button color="default" onClick={() => toggleModal(null)}>
                    Adicionar +
                  </Button>
                </CardHeader>
                <Col xs="8">
                  {showAlert && (
                    <Alert color={alertColor} className="mt-2">
                      <strong>{alertTitle}</strong> {errorMessage}
                    </Alert>
                  )}
                </Col>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="text-center thead-light">
                    <tr>
                      <th scope="col">Pergunta</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {questions.map((question, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            whiteSpace: "normal",
                            textJustify: "inter-word",
                          }}
                        >
                          {question.titulo}
                        </td>
                        <td>
                          {question.validation ? (
                            <Badge color="danger" className="badge-dot ml-2">
                              <i className="bg-danger" />
                            </Badge>
                          ) : (
                            <Badge color="success" className="badge-dot ml-2">
                              <i className="bg-success" />
                            </Badge>
                          )}
                          {question.tipo}
                        </td>
                        <td className="text-center align-middle">
                          <Button
                            color="default"
                            onClick={() => toggleEditModal(question)}
                            size="sm"
                            className="bg-transparent border-0"
                          >
                            <BsFillPencilFill
                              style={{ color: "#525f7f", fontSize: "15px" }}
                            />
                          </Button>
                          <Button
                            color="default"
                            onClick={() => {
                              toggleExcluirModal(question.id);
                            }}
                            size="sm"
                            className="bg-transparent border-0"
                          >
                            <BsFillTrashFill
                              style={{ color: "#525f7f", fontSize: "15px" }}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
        <FromQuestions
          isOpen={modalOpen}
          onClose={() => toggleModal(null)}
          question={selectedQuestion}
        />
        <FromQuestions
          isOpen={editModalOpen}
          onClose={() => toggleEditModal(null)}
          question={selectedQuestion}
          handleAlert={handleAlert}
        />
        <ExcluirQuestion
          isOpen={excluirModalOpen}
          toggle={toggleExcluirModal}
          questionId={selectedQuestionId}
          handleAlert={handleAlert}
        />
      </AuthenticatedLayout>
    </>
  );
};

export default Forms;
