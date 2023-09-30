import React, { useState, useEffect } from "react";
import { Alert, Modal, Button, Form, Input, FormGroup } from "reactstrap";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app } from "services/firebaseConfig.js";

const FromQuestions = (props) => {
  const [titulo, setTitulo] = useState("");
  const [questoes, setQuestoes] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  const [mostrarCamposQuestao, setMostrarCamposQuestao] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // Verifica se estamos editando uma pergunta existente
  const isEditing = !!props.question;

  useEffect(() => {
    if (isEditing && props.question) {
      // Preencha os campos com os dados da pergunta existente
      setTitulo(props.question.titulo || "");
      setTipoSelecionado(props.question.tipo || "");
      setQuestoes(
        props.question.questoes ? props.question.questoes.join("\n") : ""
      );
      setMostrarCamposQuestao(
        props.question.tipo === "Dropdown" && !!props.question.questoes
      );
    } else {
      // Se não estamos editando, limpe os campos
      setTitulo("");
      setQuestoes("");
      setTipoSelecionado("");
      setMostrarCamposQuestao(false);
    }
  }, [isEditing, props.question]);

  const handleAlert = (message, color, title) => {
    setErrorMessage(message);
    setAlertColor(color);
    setAlertTitle(title);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleTipoChange = (event) => {
    const novoTipo = event.target.value;
    setTipoSelecionado(novoTipo);
    setMostrarCamposQuestao(novoTipo === "Dropdown");
  };

  const handleSave = async () => {
    if (!titulo || !tipoSelecionado) {
      handleAlert("Preencha todos os campos obrigatórios.", "danger", "Erro");
      return;
    }
    if (tipoSelecionado === "Dropdown" && !questoes) {
      handleAlert("Preencha todos os campos obrigatórios.", "danger", "Erro");
      return;
    }

    const formData = {
      titulo,
      tipo: tipoSelecionado,
      questoes:
        tipoSelecionado === "Dropdown"
          ? questoes.split("\n").map((questao) => questao.trim())
          : [],
    };

    try {
      const db = getFirestore(app);
      if (isEditing) {
        await updateDoc(doc(db, "forms", props.question.id), formData);
        props.handleAlert("Pergunta editada com sucesso.", "success", "Salvo!");
        props.onClose();
      } else {
        await addDoc(collection(db, "forms"), formData);
        setTitulo("");
        setTipoSelecionado("");
        setQuestoes("");
        handleAlert("Pergunta salva com sucesso.", "success", "Salvo!");
      }
    } catch (error) {
      handleAlert("Erro ao salvar pergunta!", "danger", "Erro");
    }
  };

  return (
    <Modal isOpen={props.isOpen}>
      <div className="modal-header">
        <h2 className="modal-title text-black">
          {isEditing ? "Editar Pregunta" : "Adicionar Pregunta"}
        </h2>
        <button className="close" onClick={props.onClose}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          {showAlert && (
            <Alert color={alertColor}>
              <strong>{alertTitle}</strong> {errorMessage}
            </Alert>
          )}
          <FormGroup>
            <label className="form-control-label text-black" htmlFor="input-text">
              Titulo
            </label>
            <Input
              className="form-control-alternative text-black"
              id="input-text"
              placeholder="exemplo: Qual a sua relação com o Grupo?"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label className="form-control-label" htmlFor="select-dropdown">
              Tipo
            </label>
            <select
              className="form-control form-control-alternative"
              id="select-dropdown"
              name="tipo"
              value={tipoSelecionado}
              onChange={handleTipoChange}
            >
              <option value="">Selecione uma opção</option>
              <option value="Dropdown">Dropdown</option>
              <option value="Arquivo">Arquivo</option>
              <option value="PerguntaAberta">Pergunta aberta</option>
            </select>
          </FormGroup>

          {mostrarCamposQuestao && tipoSelecionado === "Dropdown" && (
            <FormGroup>
              <label className="form-control-label" htmlFor="input-questoes">
                Questões do Dropdown
              </label>
              <textarea
                className="form-control form-control-alternative"
                id="input-questoes"
                name="questoes"
                placeholder="Cada linha representa uma pergunta..."
                value={questoes}
                onChange={(e) => setQuestoes(e.target.value)}
              />
            </FormGroup>
          )}
        </Form>
      </div>
      <div className="modal-footer">
        <Button color="success" onClick={handleSave}>
          Salvar
        </Button>
        <Button color="danger" onClick={props.onClose}>
          Fechar
        </Button>
      </div>
    </Modal>
  );
};

export default FromQuestions;