import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  box-shadow: 2px 2px 2px gray;
  margin: 1em;
  justify-content: space-between;
  padding: 1em;
  & .bookings-badge {
    display: flex;
    align-items: center;
    & span {
      margin: 0 1em;
    }
  }
  &:hover {
    box-shadow: none;
  }
`;

export default Wrapper;
