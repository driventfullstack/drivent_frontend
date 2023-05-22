/* eslint-disable indent */
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function HotelandRoomSuccess() {
  const [reservation, setReservation] = useState(null);
  const token = useToken();

  useEffect(() => {
    const response = axios.get('http://localhost:4000/booking', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.then((res) => {
      setReservation(res.data);
    });
    // eslint-disable-next-line no-console
    response.catch((err) => console.log(err));
  }, []);

  if (!reservation) {
    return <div>Loading...</div>; // Adicione um indicador de carregamento enquanto espera a resposta
  }

  return (
    <Container>
      <Title>Você já escolheu seu quarto:</Title>
      <StyledHotel>
        <HotelImg src={reservation.Hotel.image} />
        <HotelName>{reservation.Hotel.name}</HotelName>
        <HotelInfos>Quarto reservado</HotelInfos>
        <HotelInfos2>
          {reservation && reservation.Room.name}
          {reservation &&
            (reservation.Room.capacity === 1
              ? '(single)'
              : reservation.Room.capacity === 2
              ? '(double)'
              : '(triple or more)')}
        </HotelInfos2>
        <HotelInfos>Pessoas no seu quarto</HotelInfos>
        <HotelInfos2>Você {reservation.Room.capacity === 1 ? '' : `e mais ${reservation.Room.capacity}`} </HotelInfos2>
      </StyledHotel>
    </Container>
  );
}

const Title = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-weight: regular;
  color: #8e8e8e;
  padding-bottom: 20px;
`;

const Container = styled.div`
  height: 100%;
`;

const StyledHotel = styled.div`
  height: 264px;
  width: 196px;
  background-color: #ffeed2;
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

