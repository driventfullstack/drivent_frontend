import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
export function PaymentComponent() {
  const { enrollment } = useEnrollment();

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>

      <div>
        {enrollment ? (
          <>
            <Enrollment>Primeiro, escolha sua modalidade de ingresso</Enrollment>
            <ContainerOptions>
              <Option>
                <h2>Presencial</h2>
                <h3>R$ 250</h3>
              </Option>
              <Option>
                <h2>Online</h2>
                <h3>R$ 100</h3>
              </Option>
            </ContainerOptions>
          </>
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

const Enrollment = styled.div`
margin-top: 37px;
color: #8e8e8e;
font-weight: 400;
line-height:23.44px;
`;

const Option = styled.div`
font-style: Roboto;
margin-right: 24px;
border: 1px solid #CECECE;
border-radius: 20px;
width: 145px;
height: 145px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
  h2{
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #454545;
    margin-bottom: 3px;
  }
  h3{
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #898989;
  }
`;

const ContainerOptions = styled.div`
display:flex;
margin-top: 17px;
`;
