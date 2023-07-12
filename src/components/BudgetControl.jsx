import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PropTypes from "prop-types";

const BudgetControl = ({ expenses, setExpenses, budget, setBudget ,setIsValidBudget }) => {
  const [percentage, setPercentage] = useState(0);

  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, spent) => spent.ammount + total,
      0
    );
    const totalAvailable = budget - totalSpent;

    // Calculando el porcentaje gastado

    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );

    setSpent(totalSpent);
    setAvailable(totalAvailable);
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1000);
  }, [budget, expenses]);

  const formatCurrency = (currency) =>
    currency.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const handleResetApp = () => {
    const result = confirm("¿Deseas reiniciar presupuesto y gastos?");
    if (result) {
      // localStorage.clear(); window.location.reload();
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false)
    } else {
      return false;
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          trailColor: "F5F5F5",
          textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
        })}
        value={percentage}
        text={`${percentage}% Gastado`}
      />
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear APP
        </button>
        <p>
          <span>Presupuesto:</span> {formatCurrency(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span> {formatCurrency(available)}
        </p>
        <p>
          <span>Gastado:</span> {formatCurrency(spent)}
        </p>
      </div>
    </div>
  );
};

BudgetControl.propTypes = {
  expenses: PropTypes.arrayOf(Object),
  setExpenses: PropTypes.func,
  budget: PropTypes.number,
  setBudget: PropTypes.func,
  setIsValidBudget: PropTypes.func
};

export default BudgetControl;
