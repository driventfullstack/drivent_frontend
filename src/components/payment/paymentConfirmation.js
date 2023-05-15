import styled from 'styled-components';
import Cards from 'react-credit-cards';
import React from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { createPayment } from '../../services/paymentApi';
import PaymentSuccess from './paymentSuccess';
import { useEffect } from 'react';
import axios from 'axios';

export function ConfirmPayment({ data }) {
  const [number, setNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [focus, setFocus] = React.useState('');
  const [issuer, setIssuer] = React.useState('');
  const [payment, setPayment] = React.useState(false);

  const token = useToken();

  useEffect(() => {
    const response = axios.get(`http://localhost:4000/payments?ticketId=${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.then((res) => setPayment(res.data));
    response.catch((err) => console.log(err));
  }, []);

  const getIssuer = ({ issuer }) => {setIssuer(issuer);}; 

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      ticketId: data.id,
      cardData: {
        cvc: cvc,
        expiry: expiry,
        issuer: issuer,
        name: name,
        number: number,
      }
    };

    try {
      await createPayment(token, body);
      setPayment(true);
      toast('Pagamento processado com sucesso!');
    } catch (error) {
      toast('Não foi possível processar o pagamento');
    }
  }

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

        {payment === false ? (
          <>
            <CardInfo>
              <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} callback={getIssuer}/>
              <Forma>
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  value={number}
                  minLength={16}
                  maxLength={19}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
                <input
                  type="text"
                  name="Name"
                  value={name}
                  required
                  placeholder="YOUR NAME"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
                <input
                  type="text"
                  name="Expiry"
                  value={expiry}
                  required
                  pattern="\d{2}/\d{2}"
                  maxLength={4}
                  placeholder="MM/YY Expiry"
                  onChange={(e) => setExpiry(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
                <input
                  type="tel"
                  name="cvc"
                  value={cvc}
                  required
                  minLength={3}
                  maxLength={5}
                  placeholder="CVC"
                  onChange={(e) => setCvc(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
              </Forma>
            </CardInfo>

            <button onClick={(e) => handleSubmit(e)}>Finalizar Pagamento</button>
          </>
        ) : ( <PaymentSuccess />) }
      </div>
    </ConfirmationScreen>
  );
}

const ConfirmationScreen = styled.div`
  h1 {
    font-size: 34px;
  }
  div {
    margin-top: 10px;
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
  margin-top: 10px;
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
