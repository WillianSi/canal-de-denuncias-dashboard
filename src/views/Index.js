import React, { useEffect, useState } from "react";
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
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "services/firebaseConfig.js";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";

import Header from "components/Headers/HeaderHome.js";

const Index = (props) => {

  const [questions, setQuestions] = useState([]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const fetchFirestoreData = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "incident"));
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
    const unsubscribe = onSnapshot(collection(db, "incident"), (snapshot) => {
      const questionsData = [];
      snapshot.forEach((doc) => {
        const questionData = {
          id: doc.id,
          ...doc.data(),
        };
        questionsData.push(questionData);
      });
  
      questionsData.sort((a, b) => {
        const dateA = new Date(a.data_criacao);
        const dateB = new Date(b.data_criacao);
        return dateB - dateA;
      });
  
      const limitedQuestions = questionsData.slice(0, 5);
  
      setQuestions(limitedQuestions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    href="https://canal-de-denucia-williansi.vercel.app/"
    target="_blank"
    style={{ whiteSpace: "nowrap" }}
  >
    Acesse o Canal{" "}
    <BsChevronCompactRight
      style={{ color: "#fff", fontSize: "13px" }}
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
                {questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.referencia}</td>
                      <td>{question.data_criacao}</td>
                      <td className="align-middle text-center">
                        {question.status === 0 && (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-danger" />
                            Aguardando
                          </Badge>
                        )}
                        {question.status === 1 && (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-primary" />
                            Analisando
                          </Badge>
                        )}
                        {question.status === 2 && (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            Finalizado
                          </Badge>
                        )}
                      </td>
                      <td className="text-center align-middle">
                      <Link to={`/admin/SeeMore/${question.id}`}>
                            <Button color="default" size="sm">
                              Veja mais +
                            </Button>
                          </Link>
                      </td>
                    </tr>
                  ))}
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
