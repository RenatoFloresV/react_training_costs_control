import PropTypes from "prop-types";
import Expense from "./Expense";

const ListExpenses = ({
    expenses,
    setEditExpense,
    deleteExpense,
    filter,
    expensesFilter,
}) => {
    return (
        <div className="listado-gastos contenedor">

            {filter
                ? <>
                    <h2>{expensesFilter.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>
                    {
                        expensesFilter.map((expense) => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))
                    }
                </>
                : <>
                    <h2>{expenses.length ? "Gastos" : "No hay gastos aún"}</h2>
                    {
                        expenses.map((expense) => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))
                    }
                </>}
        </div>
    );
};

ListExpenses.propTypes = {
    expenses: PropTypes.array,
    setEditExpense: PropTypes.func,
    deleteExpense: PropTypes.func,
    filter: PropTypes.string,
    expensesFilter: PropTypes.object,
};

export default ListExpenses;
