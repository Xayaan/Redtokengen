import styled from "styled-components";

const StyledInlineCode = styled.code`
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  padding: 2px 4px;
  background-color: ${props => props.theme.accent_3};
  color: ${props => props.theme.primary};
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 2px;
  font-weight: 600 !important;
`;

export default function InlineCode(props) {
  return (
    <StyledInlineCode {...props}/>
  )
}