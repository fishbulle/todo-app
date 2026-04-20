import styled from "styled-components";

export const colors = {
  wrapperColor: '#FFF8EA',
  accentLightColor: '#9E7676',
  accentDarkColor: '#594545'
};

export const StyledWrapper = styled.div`
  background-color: ${colors.wrapperColor};
  padding: 50px;
  margin: 3em auto;
  color: #000000;
  border-radius: 10px;
  max-width: 70vw;
`;

export const StyledButton = styled.button`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${colors.accentLightColor};
  color: #fff;
  &:hover {
    background-color: ${colors.accentDarkColor};
  }
`;