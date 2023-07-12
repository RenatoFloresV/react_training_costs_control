import PropTypes from 'prop-types';

const Message = ({ children, type }) => {
    return (
        <div className={`alerta ${type}`}>{children}</div>


    )
}

Message.propTypes ={
    children:PropTypes.node.isRequired, //recebe um componente ou string como fil
    type : PropTypes.oneOf(['success', 'error','info'])  //define os tipos
}
export default Message
