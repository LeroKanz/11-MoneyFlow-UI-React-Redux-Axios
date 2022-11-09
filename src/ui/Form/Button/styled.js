import styled from 'styled-components'

export const Button = styled.button`
  font-size: 1.25rem;
  margin: 0.3rem;
  text-decoration: none;
  background-color: #1c6dd6;
  border: 1px solid #1760bf;  color: white;
  border-radius: 4px;
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgb(2, 172, 172);
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover,
  &:active {
  background-color: #3cd1d1;
  border-color: #3cd1d1;
}
`
export const Container = styled.div`
text-align: right;`