import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export default styled(Card)`
  margin: 0.5em;
  padding: 0;
  & .card-body {
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
