import React from "react";
import { Modal, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { auth } from "services/firebaseConfig";

const Logout = (props) => {
  const { isOpen, toggle } = props;

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Faz logout usando o Firebase
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen} // Use a prop isOpen para controlar a visibilidade
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
    >
      <div className="modal-header">
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggle} // Use a função toggle para fechar o modal
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">Você tem certeza que quer sair?</h4>
          <p>Se você sair, precisará fazer login novamente.</p>
        </div>
      </div>
      <div className="modal-footer">
        <Link to="/logout">
          <Button className="btn-white" color="default" type="button" onClick={handleLogout}>
            Sim
          </Button>
        </Link>
        <Button
          className="btn-white ml-auto"
          color="default"
          data-dismiss="modal"
          type="button"
          onClick={toggle} // Use a função toggle para fechar o modal
        >
          Não
        </Button>
      </div>
    </Modal>
  );
};

export default Logout;