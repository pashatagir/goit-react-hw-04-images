import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import {
  SearchContainer,
  SearchForm,
  FormButton,
  FormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    e.currentTarget.reset();
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <ImSearch style={{ width: 25, height: 25 }} />
        </FormButton>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

// class Searchbar extends Component {
//   state = { query: '' };

//   handleChange = e => {
//     const { value } = e.currentTarget;
//     this.setState({ query: value });
//   };

//   handleSubmit = e => {
//     const { query } = this.state;
//     e.preventDefault();
//     this.props.onSubmit(query);
//     e.currentTarget.reset();
//   };
//   render() {
//     return (
//       <SearchContainer>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <FormButton type="submit">
//             <ImSearch style={{ width: 25, height: 25 }} />
//           </FormButton>

//           <FormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//           />
//         </SearchForm>
//       </SearchContainer>
//     );
//   }
// }
