import styled from 'styled-components'

export const Li = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  box-shadow: 12px 14px 20px rgba(34, 35, 58, 0.3);
  border-radius: 6px;
  background-color: #e47c50cb;

  div {
  margin: 1rem 1rem;
  justify-content: space-between;
  align-items: center;
}

blockquote {
  margin: 0;
  text-align: left;
  font-size: 1.5rem;
  color: #76a5a5;
}

p {
  margin: 0;
  margin-bottom: 0.25rem;
}

figure {
  margin: 0;
  padding: 0;
  width: 80%;
}

figcaption {
  font-style: italic;
  color: #82baba;
}
`