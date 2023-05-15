import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export function ValidationCard({ text }) {
  return (
    <Card>
      <StyledTypography>{text}</StyledTypography>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-top: 225px;
  justify-content: center;
`;

const StyledTypography = styled(Typography)`
  color: #8e8e8e;
  width: 400px;
  text-align: center;
`;
