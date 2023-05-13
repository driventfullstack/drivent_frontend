import styled from 'styled-components';

export function ConfirmPayment({ data }) {
  return (
    <ConfirmationScreen>
      <h1>Ingresso e Pagamento</h1>
      <div>
        <h2>Ingresso Escolhido</h2>
        <Ingresso>
          <p>
            {!data.TicketType.isRemote ? 'Presencial ' : 'Online '}
            {data.TicketType.includesHotel === true ? '+ com Hotel' : ''}
          </p>
          {`R$${data.TicketType.price}`}
        </Ingresso>

        <h3>Pagamento</h3>
        <CardInfo></CardInfo>

        <button>Finalizar Pagamento</button>
      </div>
    </ConfirmationScreen>
  );
}

const ConfirmationScreen = styled.div`
  h1 {
    font-size: 34px;
  }
  div {
    margin-top: 37px;
    h3 {
      margin-top: 30px;
    }
    button {
      margin-top: 37px;
      width: 182px;
      height: 37px;
      background: #e0e0e0;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      border: none;
      :hover {
        cursor: pointer;
        background-color: green;
        color: white;
        font-weight: bold;
      }
    }
  }
`;
const Ingresso = styled.section`
  margin-top: 17px;
  width: 290px;
  height: 108px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  background: #ffeed2;
  border-radius: 20px;
`;

const CardInfo = styled.section`
  width: 706px;
  height: 225px;
  background-color: gold;
`;
