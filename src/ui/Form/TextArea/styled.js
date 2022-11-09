import styled from 'styled-components'

export const TextArea = styled.textarea`
  font: inherit;
  padding: 0.35rem;
  border-radius: 4px;
  background-color: #f0f0f0;
  border: 1px solid #c1d1d1;
  display: block;
  width: 100%;
  font-size: 1.25rem;
  &:focus {
    background-color: #ecfcfc;
    outline-color: teal;
  }
`