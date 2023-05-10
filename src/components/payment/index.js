import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
export function PaymentComponent() {
  const { enrollment } = useEnrollment();

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>

      <div>
        {enrollment ? (
          <></>
        ) : (
          <NoEnrollment>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</NoEnrollment>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  h1 {
    font-size: 34px;
  }
  height: 100%;
`;
const NoEnrollment = styled.div`
  width: 388px;
  color: #8e8e8e;
  text-align: center;
  margin: auto;
  margin-top: 243px;
`;
