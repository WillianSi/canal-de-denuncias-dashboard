import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, FormGroup } from "reactstrap";
import { getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore";

const AvaliarCaso = (props) => {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (props.isOpen) {
      const currentDate = new Date().toISOString().split("T")[0];
      setDate(currentDate);
    }
  }, [props.isOpen]);

  const handleSave = async () => {
    try {
      if (!props.id) {
        console.error("Incident ID is undefined.");
        return;
      }
  
      const db = getFirestore();
      const incidentRef = doc(db, "incident", props.id);
  
      let statusNumber = -1;
      switch (status) {
        case "0":
          statusNumber = 0;
          break;
        case "1":
          statusNumber = 1;
          break;
        case "2":
          statusNumber = 2;
          break;
        default:
          break;
      }
  
      const timestampDate = new Date(`${date}T00:00:00Z`);
      timestampDate.setDate(timestampDate.getDate() + 1);
      await updateDoc(incidentRef, {
        status: statusNumber,
        finalizado: Timestamp.fromDate(timestampDate),
      });
  
      props.fetchIncidentData(props.id);
      props.onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Modal isOpen={props.isOpen}>
      <div className="modal-header">
        <h2 className="modal-title text-black">Avaliar</h2>
        <button className="close" onClick={props.onClose}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <FormGroup>
            <label className="form-control-label" htmlFor="select-dropdown">
              Status
            </label>
            <select
              className="form-control form-control-alternative"
              id="select-dropdown"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Selecione uma opção</option>
              <option value="0">Aguardando</option>
              <option value="1">Analisando</option>
              <option value="2">Finalizado</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label className="form-control-label" htmlFor="input-data">
              Data
            </label>
            <Input
              type="date"
              id="input-data"
              name="data"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
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

export default AvaliarCaso;