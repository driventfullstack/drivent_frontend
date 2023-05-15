import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function PaymentSuccess() {
  return (
    <Container>
      <AiFillCheckCircle size={40.33} color='#36B853' />
      <TextContainer>
        <ConfirmTitle>Pagamento confirmado!</ConfirmTitle>
        <ConfirmParagraph>Prossiga para escolha de hospedagem e atividades</ConfirmParagraph>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
align-items: center;
display: flex;
height: 100%;
`;

const TextContainer = styled.div`
margin-left: 13px;
height: 38px;
`;

const ConfirmTitle = styled.h2`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
color: #454545;
padding-bottom: 2px;
`;

const ConfirmParagraph = styled.p`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
`;

