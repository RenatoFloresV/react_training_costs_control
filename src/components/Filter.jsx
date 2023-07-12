import PropTypes from "prop-types";

const Filter = ({ filter, setFilter }) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label>Buscar</label>
                    <br />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">-- Todas las categorías --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Hogar</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="suscripciones">Subscripciones</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

Filter.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
};

export default Filter;
