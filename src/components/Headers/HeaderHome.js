import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { app } from "services/firebaseConfig.js";
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const Header = () => {
  const [, setQuestions] = useState([]);
  const [totalStatus0, setTotalStatus0] = useState(0);
  const [totalStatus1, setTotalStatus1] = useState(0);
  const [totalStatus2, setTotalStatus2] = useState(0);

  const fetchFirestoreData = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "incident"));
      const questionsData = [];
      let countStatus0 = 0;
      let countStatus1 = 0;
      let countStatus2 = 0;

      querySnapshot.forEach((doc) => {
        const questionData = {
          id: doc.id,
          ...doc.data(),
        };
        questionsData.push(questionData);

        switch (questionData.status) {
          case 0:
            countStatus0++;
            break;
          case 1:
            countStatus1++;
            break;
          case 2:
            countStatus2++;
            break;
          default:
            break;
        }
      });

      setQuestions(questionsData);

      // Atualizar os estados dos totais
      setTotalStatus0(countStatus0);
      setTotalStatus1(countStatus1);
      setTotalStatus2(countStatus2);
    } catch (error) {
      console.error("Erro ao buscar dados do Firestore: ", error);
    }
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row className="justify-content-center">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total de incidentes ocorridos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalStatus0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Incidentes em análise
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalStatus1}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-5 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Incidentes finalizados
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalStatus2}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
