import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  FormGroup,
} from "reactstrap";

const FromQuestions = (props) => {
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [mostrarCamposQuestao, setMostrarCamposQuestao] = useState(false);

  const handleTipoChange = (event) => {
    const novoTipo = event.target.value;
    setTipoSelecionado(novoTipo);

    // Mostrar campos de questão apenas se o tipo for "Dropdown"
    setMostrarCamposQuestao(novoTipo === "Dropdown");
  };

  return (
    <Modal isOpen={props.isOpen}>
      <div className="modal-header">
        <h2 className="modal-title text-black">Adicionar Pregunta</h2>
        <button className="close" onClick={props.onClose}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <FormGroup>
            <label className="form-control-label text-black" htmlFor="input-text">
              Titulo
            </label>
            <Input
              className="form-control-alternative text-black"
              id="input-text"
              placeholder="exemplo: Qual a sua relação com o Grupo?"
              type="text"
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
                placeholder="Digite as questões aqui..."
              />
            </FormGroup>
          )}
        </Form>
      </div>
      <div className="modal-footer">
        <Button color="danger" onClick={props.onClose}>
          Fechar
        </Button>
        <Button color="success">Salvar</Button>
      </div>
    </Modal>
  );
};

export default FromQuestions;
