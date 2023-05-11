import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
import api from '../../services/api';
import useToken from '../../hooks/useToken';
import { useState } from 'react';
import axios from 'axios';
export function PaymentComponent() {
  const { enrollment } = useEnrollment();
  const token = useToken();
  const [ticketType, setTicketType] = useState('');

  async function chooseOption() {
    try {
      const response = await axios.post('http://localhost:4000/tickets/types', { ticketType: ticketType }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePresencialOptionClick() {
    setTicketType('presencial');
    await chooseOption();
  }

  async function handleOnlineOptionClick() {
    setTicketType('online');
    await chooseOption();
  }

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>

      <div>
        {enrollment ? (
          <TicketsContainer>
            <h2>Primeiro, escolha sua modalidade de ingresso</h2>
            <TicketsAvailable>
              <div onClick={handlePresencialOptionClick} >
                <h1>Presencial</h1>
                <p>R$250</p>
              </div>
              <div onClick={handleOnlineOptionClick}>
                <h1>Online</h1>
                <p>R$100</p>
              </div>
            </TicketsAvailable>
          </TicketsContainer>
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

const TicketsContainer = styled.div`
  margin-top: 37px;
  h2 {
    color: #8e8e8e;
  }
`;

const TicketsAvailable = styled.div`
  margin-top: 17px;
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  h1 {
    font-size: 16px;
  }
  p {
    margin-top:3px;
    font-size: 14px;
    color: #898989;
  }
  div {
    background-color: white;
    border-radius: 20px;
    height: 145px;
    width: 145px;
    border: 1px solid #cecece;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
  }
`;
