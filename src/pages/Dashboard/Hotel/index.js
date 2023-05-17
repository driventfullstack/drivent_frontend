/* eslint-disable indent */
import styled from 'styled-components';
import { ValidationCard } from '../../../components/ValidationCard';
import { useTicket } from '../../../hooks/api/useTickets';
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import HotelandRoomSuccess from '../../../components/hotel/hotelConfirmation';

export default function Hotel() {
  const { ticket } = useTicket();
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [hotelSelected, setHotelSelected] = useState(false);
  const [reservation, setReservation] = useState(false);

  useEffect(() => {
    const response = axios.get('http://localhost:4000/hotels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data);
      setHotels(res.data);
    });
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de quarto e hotel</StyledTypography>
      
      {ticket?.status !== 'PAID' ? (
        <ValidationCard text={'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'} />
      ) : !ticket.TicketType?.includesHotel ? (
        <ValidationCard
          text={'Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades'}
        />
      ) : ( reservation !== true? (
        <>
          <EscolhaHotel onClick={() => setReservation(true)}>Primeiro, escolha seu hotel</EscolhaHotel>
          <HotelDiv>
            {hotels.length !== 0
              ? hotels.map((resp) => {
                  return (
                    <StyledHotel onClick={() => setHotelSelected(true)}>
                      <HotelImg src={resp.image}></HotelImg>
                      <HotelName>{resp.name}</HotelName>
                      <HotelInfos>Tipos de acomodação:</HotelInfos>
                      <HotelInfos2>Single e Double</HotelInfos2>
                      <HotelInfos>Vagas Disponíveis:</HotelInfos>
                      <HotelInfos2></HotelInfos2>
                    </StyledHotel>
                  );
                })
              : ''}

            {hotelSelected ? (
              <>
                <h1>Ótima pedida! Agora escolha seu quarto:</h1>

                <div>
                  {hotels.map((a) => (
                    <p>{a.name}</p>
                  ))}
                </div>
              </>
            ) : (
              ''
            )}

          </HotelDiv>
        </> ) : (
          <HotelandRoomSuccess/>
        )
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const HotelDiv = styled.div`
  display: flex;
  height: 270px;
  width: 700px;
  flex-direction: column;
  padding-top: 20px;
`;

const StyledHotel = styled.div`
  height: 264px;
  width: 196px;
  background-color: #ebebeb;
  border-radius: 10px;
  margin-right: 18px;
  padding-top: 16px;
  padding-right: 14px;
  padding-left: 14px;
  box-sizing: borderbox;
`;

const HotelImg = styled.img`
  height: 109px;
  width: 168px;
  border-radius: 5px;
  background-color: #e5e5e5;
`;

const HotelName = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: regular;
  color: #343434;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const HotelInfos = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  color: #343434;
`;

const HotelInfos2 = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: regular;
  color: #3c3c3c;
  margin-bottom: 14px;
  margin-top: 2px;
`;

const EscolhaHotel = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: regular;
  color: #8e8e8e;
`;
