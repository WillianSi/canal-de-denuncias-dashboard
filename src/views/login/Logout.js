import React from "react";
import { Modal, Button } from "reactstrap";
import { Link } from "react-router-dom"; // Import Link for navigation

const Logout = (props) => {
  // Modify the function to handle the logout action
  const handleLogout = () => {
    // Add your logout logic here
    // After logout, you can redirect the user to the login page
    // using the Link component or useHistory hook
  };

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
          onClick={props.toggle}
        >
          Não
        </Button>
      </div>
    </Modal>
  );
};

export default Logout;