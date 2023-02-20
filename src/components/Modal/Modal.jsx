import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handelClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handelClick);
    return () => {
      window.removeEventListener('keydown', handelClick);
    };
  }, [onClose]);

  const handleClickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleClickOnBackdrop}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

// class Modal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.node.isRequired,
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handelClick);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handelClick);
//   }

//   handelClick = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleClickOnBackdrop = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleClickOnBackdrop}>
//         <ModalContainer>{this.props.children}</ModalContainer>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
