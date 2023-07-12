import PropTypes from 'prop-types';
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { dateFormat } from "../helpers";
import IconSaving from '../img/icono_ahorro.svg'
import IconHouse from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconExpense from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSubscriptions from '../img/icono_suscripciones.svg'

const dictionaryIcons = {
    ahorro: IconSaving,
    comida: IconFood,
    casa: IconHouse,
    gastos: IconExpense,
    suscripciones: IconSubscriptions,
    ocio: IconLeisure,
    salud: IconHealth
}

const Expense = ({ expense, setEditExpense,deleteExpense }) => {
    const { category, name, ammount, date , id} = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => deleteExpense(id)}
            destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={dictionaryIcons[category]} alt=""
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{name}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}<span>{dateFormat(date)}</span></p>
                        </div>

                    </div>
                    <p className="cantidad-gasto">${ammount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
};

Expense.propTypes = {
    expense: PropTypes.object,
    setEditExpense: PropTypes.func,
    deleteExpense: PropTypes.func
}


export default Expense
