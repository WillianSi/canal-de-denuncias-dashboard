import React from "react";
import { Modal, Button } from "reactstrap";
import { app } from "services/firebaseConfig.js";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import AuthenticatedLayout from "services/AuthenticatedLayout.js";

const ExcluirQuestion = (props) => {
  const handleExcluir = () => {
    if (props.questionId) {
      const db = getFirestore(app);
      const questionRef = doc(db, "forms", props.questionId);
      deleteDoc(questionRef)
        .then(() => {
          props.handleAlert(
            "Pergunta excluída com sucesso!",
            "success",
            "Sucesso"
          );
          props.toggle();
        })
        .catch((error) => {
          props.handleAlert("Erro ao excluir pergunta!", "danger", "Erro");
          props.toggle();
        });
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
    >
      <AuthenticatedLayout>
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
          <h4 className="heading mt-4">
            Você tem certeza que quer excluir essa pergunta!
          </h4>
          <p>Se você a excluir não poderá recupera-lá.</p>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          className="btn-white"
          color="default"
          type="button"
          onClick={handleExcluir}
        >
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
      </AuthenticatedLayout>
    </Modal>
  );
};

export default ExcluirQuestion;
