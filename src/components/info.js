import styled from "styled-components";

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  * + * {
    margin-left: 20px;
  }

  span {
    font-size: 13px;
    color: ${p => p.theme.accent_1};
  }
`;

export default Info;