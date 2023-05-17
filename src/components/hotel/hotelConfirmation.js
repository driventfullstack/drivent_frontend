import styled from 'styled-components';

export default function HotelandRoomSuccess() {
  return (
    <Container> <Title>Você já escolheu seu quarto:</Title>
      <StyledHotel>
        <HotelImg src="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768"/>
        <HotelName>Driven Resort</HotelName>
        <HotelInfos>Quarto reservado</HotelInfos>
        <HotelInfos2>101 (Double)</HotelInfos2> 
        <HotelInfos>Pessoas no seu quarto</HotelInfos>
        <HotelInfos2>Você e mais 1</HotelInfos2>
      </StyledHotel>
      <UpdateRoom>TROCAR DE QUARTO</UpdateRoom>
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
  background-color: #FFEED2;
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

const UpdateRoom = styled.div`
width: 182px;
height: 37px;
background: #E0E0E0;
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
`;
