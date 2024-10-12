import SearchIcon from '@rsuite/icons/Search';
import { Input, InputGroup } from 'rsuite';

const styles = {
  marginBottom: 10,
};

const SearchInput = ({ placeholder, onChange = () => {}, ...props }) => (
  <InputGroup {...props} style={styles}>
    <Input placeholder={placeholder} onChange={(txt) => onChange(txt)} />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
  </InputGroup>
);

export default SearchInput;
