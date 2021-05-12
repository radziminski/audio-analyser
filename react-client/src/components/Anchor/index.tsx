import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Anchor = styled(Link)<{ underline?: boolean }>`
  text-decoration: ${(props) =>
    props.underline === false ? 'none' : 'underline'};
  cursor: pointer;
`;

export default Anchor;
