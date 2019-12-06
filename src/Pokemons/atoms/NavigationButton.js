import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavigationButton = styled(Link)`
    display: block;
    padding: 1em;
    text-decoration: none;
    color: black;
    font-weight: bold;
`;

export default NavigationButton;