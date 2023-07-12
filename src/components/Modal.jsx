import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import CloseBtn from "../img/cerrar.svg";
import Message from "./Message";

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  onSaveExpense,
  editExpense,
  setEditExpense
}) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ammount, setAmmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setName(editExpense.name)
      setAmmount(editExpense.ammount)
      setCategory(editExpense.category)
      setId(editExpense.id)
      setDate(editExpense.date)
    }
  }, [editExpense])


  const closeModal = () => {
    setAnimateModal(false);
    setEditExpense = ({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, ammount, category].includes("")) {
      setMessage("Todos los campos son obligatorios");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    onSaveExpense({ name, ammount, category, id, date });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CloseBtn} alt="close modal" onClick={closeModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
      >
        <legend>{editExpense.name ? 'EditarGasto' : 'Nuevo gasto'}</legend>
        {message && <Message type="error">{message}</Message>}
        <div className="campo">
          <label htmlFor="name">Nombre del gasto</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Añade el nombre del gasto"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="ammount">Cantidad</label>
          <input
            type="number"
            id="ammount"
            value={ammount}
            placeholder="Añade la cantidad del gasto ej. 300"
            onChange={(e) => setAmmount(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Hogar</option>
            <option value="gastos">Gastos varios</option>
            <option value="suscripciones">Subscripciones</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
          </select>
        </div>
        <input type="submit" value={editExpense ? "Guardar cambios" : "Guardar Gasto"} />
      </form>
    </div>
  );
};

Modal.propTypes = {
  setModal: PropTypes.func,
  animateModal: PropTypes.bool,
  setAnimateModal: PropTypes.func,
  onSaveExpense: PropTypes.func,
  editExpense: PropTypes.object,
  setEditExpense: PropTypes.func,
}

export default Modal;
