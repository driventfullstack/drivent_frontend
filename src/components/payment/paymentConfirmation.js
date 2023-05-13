import styled from 'styled-components';
import Cards from 'react-credit-cards';
import React from 'react';
import 'react-credit-cards/es/styles-compiled.css';

export function ConfirmPayment({ data }) {
  const [number, setNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [focus, setFocus] = React.useState('');

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
        <CardInfo>
          <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
          <Forma>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="text"
              name="Name"
              value={name}
              placeholder="YOUR NAME"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="text"
              name="Expiry"
              value={expiry}
              placeholder="MM/YY Expiry"
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="tel"
              name="cvc"
              value={cvc}
              placeholder="CVC"
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </Forma>
        </CardInfo>

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
  display: flex;
  align-items: center;
  background-color: lightgrey;
  border-radius: 6px;
  width: 706px;
  div {
    margin-top: 0px;
  }
`;

const Forma = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 15px;
  input {
    border: none;
    border-radius: 5px;
    height: 45px;
    width: 350px;
  }
`;
