import { useState, useEffect } from 'react';
import { AppContainer } from './App.styled';
import { getImages } from './services/imageAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     isEmpty: false,
//     showBtn: false,
//     isLoading: false,
//     isError: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (query !== prevState.query || page !== prevState.page) {
//       try {
//         this.setState({ isLoading: true });
//         const { hits, totalHits } = await getImages(query, page);
//         if (!hits?.length) {
//           this.setState({ isEmpty: true });
//           return;
//         }
//         this.setState(prevState => ({
//           images: prevState.images.concat(hits),
//           showBtn: page < Math.ceil(totalHits / 12),
//         }));
//       } catch {
//         this.setState({ isError: errorMessages.noImages });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleFormSubmit = query => {
//     this.setState({ query, page: 1, images: [] });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, isEmpty, query, showBtn, isError, isLoading } = this.state;
//     return (
//       <AppContainer>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery images={images} />
//         {isLoading && <Loader />}
//         {showBtn && <Button onClick={this.onLoadMore} />}
//         {isEmpty && (
//           <h2>
//             There are no pictures with the name {query} in our database, try
//             another request!
//           </h2>
//         )}
//         {isError && <h2>{isError}</h2>}
//       </AppContainer>
//     );
//   }
// }

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (!hits?.length) {
          toast.error(`Sorry, there are no images ${query}. Please try again.`);
          return;
        }
        setImages(images => [...images, ...hits]);
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images`);
        }

        if (page > 1 && page >= Math.ceil(totalHits / 12)) {
          toast.info(
            `We're sorry, but you've reached the end of search "${query}". Please start a new search`
          );
        }
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(() =>
        toast.error(`Whoops, something went wrong! Please try again later!`)
      )
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {showBtn && <Button onClick={onLoadMore} />}
      <ToastContainer />
    </AppContainer>
  );
};
