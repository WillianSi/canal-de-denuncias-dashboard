import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js";
import { chartOptions, parseOptions } from "variables/charts.js";
import FilterButton from "./FilterButton.js";
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
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { app } from "services/firebaseConfig.js";

import Header from "components/Headers/Header.js";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";

const Companies = (props) => {
  const [questions, setQuestions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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
  
      setQuestions(questionsData);
    });  

    return () => {
      unsubscribe();
    };
  }, []);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
    <AuthenticatedLayout>
      <Header />
      <Container className="mt--7" fluid>
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
                            backgroundColor: "#8965e0",
                            borderColor: "#8965e0",
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
                        style={{ borderColor: "#8965e0", color: "black" }}
                        className="placeholder-black"
                        value={searchValue}
                        onChange={handleSearchChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <FilterButton handleStatusChange={handleStatusChange} />
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
                  {questions
                    .filter((question) => {
                      const lowerCaseSearchValue = searchValue.toLowerCase();
                      return (
                        (selectedStatus === null ||
                          question.status === selectedStatus) &&
                        ((typeof question.referencia === "string" &&
                          (question.referencia
                            .toLowerCase()
                            .includes(lowerCaseSearchValue) ||
                            question.data_criacao
                              .toLowerCase()
                              .includes(lowerCaseSearchValue))) ||
                          (typeof question.data_criacao === "string" &&
                            question.data_criacao
                              .toLowerCase()
                              .includes(lowerCaseSearchValue)))
                      );
                    })
                    .map((question) => (
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

export default Companies;
