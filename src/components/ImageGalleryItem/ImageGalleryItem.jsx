import { useState } from 'react';
import Modal from 'components/Modal';
import { ItemContainer, ImageGallery } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <ItemContainer key={id} onClick={toggleModal}>
        <ImageGallery src={webformatURL} alt={tags} />
      </ItemContainer>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;

// class ImageGalleryItem extends Component {
//   state = { showModal: false };
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };
//   render() {
//     const { showModal } = this.state;
//     const { id, webformatURL, tags, largeImageURL } = this.props;
//     return (
//       <>
//         <ItemContainer key={id} onClick={this.toggleModal}>
//           <ImageGallery src={webformatURL} alt={tags} />
//         </ItemContainer>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }
