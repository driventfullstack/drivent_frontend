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
import { toast } from 'react-toastify';

export default function Hotel() {
  const { ticket } = useTicket();
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  const [hotelSelected, setHotelSelected] = useState({});
  const [roomSelected, setRoomSelected] = useState({});
  const [readyToReserve, setReadyToReserve] = useState(false);
  const [roomChange, setRoomChange] = useState(false);
  const [reservation, setReservation] = useState(false);

  useEffect(() => {
    const response = axios.get('http://localhost:4000/hotels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.then((res) => {
      setHotels(res.data);
    });
  }, []);

  function DisplayRooms(room) {
    const selectRoom = (room) => {
      setRoomSelected(room);
      setReadyToReserve(true);
    };

    return (
      <button
        onClick={() => selectRoom(room)}
        disabled={room.capacity === room.Booking.length}
        style={{
          backgroundColor: roomSelected === room ? '#FFEED2' : '',
        }}
      >
        <p>{room.name}</p>
        <p>
          {roomSelected !== room ? (
            Array.from({ length: room.capacity }, (_, index) => {
              const temReserva = index < room.Booking.length;

              if (temReserva) return <ion-icon name="person"> </ion-icon>;

              return <ion-icon name="person-outline"></ion-icon>;
            })
          ) : (
            <>
              {Array.from({ length: room.capacity - 1 }, (_, index) => {
                const temReserva = index < room.Booking.length;

                if (temReserva) return <ion-icon name="person"> </ion-icon>;

                return <ion-icon name="person-outline"></ion-icon>;
              })}
              <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>
            </>
          )}
        </p>
      </button>
    );
  }

function SelectRoom(room) {
    setRoomSelected(room);
    setReadyToReserve(true);
}

function handleRoomChange() {
  setRoomChange(true);
}

async function ReserveConfirmation() {
  setReservation(true);
  try {
    const response = await axios.post(
      'http://localhost:4000/booking',
      { roomId: roomSelected.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function RebookingConfirmation() {
  try {
    const booking = await axios.get(
      'http://localhost:4000/booking',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await axios.put(
      `http://localhost:4000/booking/${booking.data.id}`,
      { roomId: roomSelected.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast('Reserva atualizada com sucesso!');
    return response.data;
  } catch (err) {
    toast('Deu algum problema para atualizar a reserva: quarto sem vaga!');
    console.log(err);
  }
};

  return (
    <>
      <StyledTypography variant="h4">Escolha de quarto e hotel</StyledTypography>

      {ticket?.status !== 'PAID' ? (
        <ValidationCard text={'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'} />
      ) : !ticket.TicketType?.includesHotel ? (
        <ValidationCard
          text={'Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades'}
        />
      ) : reservation !== true ? (
        <>
          <EscolhaHotel>Primeiro, escolha seu hotel</EscolhaHotel>
          <HotelDiv>
            <Hotels>
              {hotels.length !== 0
                ? hotels.map((resp) => {
                    return (
                      <StyledHotel onClick={() => setHotelSelected(resp)} style={{ backgroundColor: hotelSelected === true ? '#FFEED2' : '' }}>
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
            </Hotels>

            {hotelSelected.name !== undefined ? (
              <Rooms>
                <h1>Ótima pedida! Agora escolha seu quarto:</h1>

                <div>{hotelSelected.Rooms.map((a) => DisplayRooms(a))}</div>
              </Rooms>
               ) : (
                ''
              )}
        {readyToReserve !== true ? (''
              ) : <ReserveRoom onClick={ReserveConfirmation}>RESERVAR QUARTO</ReserveRoom> }
          </HotelDiv>
        </>
      ) : (
          <div>
            <HotelandRoomSuccess />
            {roomChange === true ? (
              <Rooms>
                <h1>Agora escolha seu novo quarto:</h1>
                <div>{hotelSelected.Rooms.map((a) => DisplayRooms(a))}</div>
                <ReserveRoom onClick={RebookingConfirmation}>RESERVAR NOVO QUARTO</ReserveRoom>
              </Rooms>
            ) : (
              <ReserveRoom onClick={handleRoomChange}>TROCAR DE QUARTO</ReserveRoom>
            )}
          </div>
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

const Hotels = styled.div`
  display: flex;
`;

const Rooms = styled.div`
  margin-top: 10px;

  div {
    display: flex;
    margin-top: 5px;
    width: 807px;
    flex-wrap: wrap;
    gap: 10px;
    button {
      cursor: pointer;
      :hover {
        background-color: lightgray;
      }
    }
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-radius: 6px;
      width: 190px;
      height: 45px;
      border: solid 3px #cecece;
    }
  }
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

const ReserveRoom = styled.div`
  width: 182px;
  min-height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 28px;

  :hover {
    cursor: pointer;
    background-color: green;
    color: white;
  }
`;
