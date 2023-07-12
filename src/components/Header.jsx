import PropTypes from 'prop-types';
import BudgetControl from "./BudgetControl";
import NewBudget from "./NewBudget";

const Header = ({ expenses, setExpenses, budget, setBudget, isVadalidBudget, setIsValidBudget }) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {isVadalidBudget ? (
        <BudgetControl
          expenses={expenses}
          setExpenses ={setExpenses}
          budget={budget}
          setBudget = {setBudget}
          setIsValidBudget = {setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};
Header.propTypes = {
  expenses: PropTypes.array,
  setExpenses: PropTypes.func,
  budget: PropTypes.number,
  setBudget: PropTypes.func,
  isVadalidBudget: PropTypes.bool,
  setIsValidBudget: PropTypes.func
};
export default Header;
