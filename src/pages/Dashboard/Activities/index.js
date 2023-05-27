/* eslint-disable indent */
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import dayjs from 'dayjs';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [eventSelected, setEvent] = useState([]);
  const [day, setDay] = useState([]);
  const token = useToken();

  useEffect(() => {
    const response = axios.get('http://localhost:4000/activities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.then((res) => {
      setActivities(res.data);
    });
  }, []);

  function getDaySelected(date) {
    const dateFormat = dayjs(date.startAt).format('YYYY-MM-DD');
    const response = axios.get(`http://localhost:4000/activities/${dateFormat}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.then((res) => {
      setDay(date);
      setEvent(res.data);
    });
  }

  return (
    <Container>
      <h1>Escolha de atividades</h1>
      <h2>Primeiro, filtre pelo dia do evento: </h2>
      <EventsContainer>
        {activities.map((activity) => (
          <EventDay
            onClick={() => getDaySelected(activity)}
            style={day === activity ? { backgroundColor: '#FFD37D' } : {}}
            key={activity.id}
          >
            {new Date(activity.startAt)
              .toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'numeric',
              })
              .replace('-feira', '')}
          </EventDay>
        ))}
      </EventsContainer>

      <Att>
        {eventSelected.length !== 0
          ? eventSelected.map((a) => (
              <div>
                <h1>{a.Auditory.name}</h1>
                <p>{a.name}</p>
                <p>{a.capacity}</p>
              </div>
            ))
          : ''}
      </Att>
    </Container>
  );
}

const Container = styled.div`
  h1 {
    font-size: 34px;
  }
  height: 100%;
  h2 {
    color: #8e8e8e;
    margin-top: 37px;
    margin-bottom: 23px;
  }
`;

const EventsContainer = styled.div`
  display: flex;
`;

const EventDay = styled.div`
  width: 131px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-right: 17px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Att = styled.div`
  display: flex;

  div {
    background-color: red;
    width: 288px;
    height: 255px;
    border: solid 1px grey;
    box-sizing: border-box;
    padding: 10px;
  }
  margin: auto;
  margin-top: 20px;
`;
