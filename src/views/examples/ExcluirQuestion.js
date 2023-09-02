import React from "react";
import { Modal, Button } from "reactstrap";

const ExcluirQuestion = (props) => {

  return (
    <Modal
      isOpen={props.isOpen}
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
    >
      <div className="modal-header">
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={props.toggle}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">Você tem certeza que quer excluir essa pergunta!</h4>
          <p>
            Se você a excluir não poderá recupera-lá.
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <Button className="btn-white" color="default" type="button">
          Sim
        </Button>
        <Button
          className="btn-white ml-auto"
          color="default"
          data-dismiss="modal"
          type="button"
          onClick={props.toggle}
        >
          Não
        </Button>
      </div>
    </Modal>
  );
};

export default ExcluirQuestion;