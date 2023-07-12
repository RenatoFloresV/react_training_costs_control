import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ListExpenses from "./components/ListExpenses";
import Modal from "./components/Modal";
import { generateId } from "./helpers";
import IconNewBudget from "./img/nuevo-gasto.svg";

function App() {
  const [expenses, setExpenses] = useState(
    localStorage?.getItem("expenses")
      ? JSON.parse(localStorage?.getItem("expenses"))
      : []
  );
  const [budget, setBudget] = useState(
    Number(localStorage?.getItem("budget") ?? 0)
  );
  const [isVadalidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState("");
  const [expensesFilter, setExpensesFilter] = useState([]);

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [editExpense]);

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if (filter) {
      const expensesFilter = expenses.filter(
        (expense) => expense.category === filter
      );
      setExpensesFilter(expensesFilter);
    }
  }, [expenses, filter]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    if (budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewCost = () => {
    setModal(true);
    setEditExpense({});
    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  };
  const onSaveExpense = (expense) => {
    if (expense.id) {
      const expensesUpdated = expenses.map((expenseState) =>
        expenseState.id === expense.id ? expense : expenseState
      );
      setExpenses(expensesUpdated);
      setEditExpense({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const deleteExpense = (id) => {
    const expensesUpdated = expenses.filter((expense) => expense.id !== id);
    setExpenses(expensesUpdated);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses= {setExpenses}
        budget={budget}
        setBudget={setBudget}
        isVadalidBudget={isVadalidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isVadalidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <ListExpenses
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              expensesFilter={expensesFilter}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconNewBudget}
              alt="Icon new budget"
              onClick={handleNewCost}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          onSaveExpense={onSaveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      )}
    </div>
  );
}

export default App;
