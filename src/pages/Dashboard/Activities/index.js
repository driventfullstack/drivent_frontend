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
              <ActBox>
                <h1>{a.Auditory.name}</h1>
                <InnerActBox>
                  <div style={{ height: `${(dayjs(a.endAt).hour() - dayjs(a.startAt).hour()) * 80}px` }}>
                    <p>
                      <strong>{a.name}</strong>
                      <p>
                        {dayjs(a.startAt).format('HH:mm')} - {dayjs(a.endAt).format('HH:mm')}
                      </p>
                    </p>
                    <section>
                      <hr></hr>
                      {a.capacity - a.Inscription.length !== 0 ? (
                        <p style={{ color: 'green' }}>
                          <ion-icon name="log-in-outline"></ion-icon>
                          <span>{a.capacity - a.Inscription.length} vagas</span>
                        </p>
                      ) : (
                        <p style={{ color: 'red' }}>
                          <ion-icon name="close-circle-outline"></ion-icon>
                          <span>Esgotado</span>
                        </p>
                      )}
                    </section>
                  </div>
                </InnerActBox>
              </ActBox>
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

  h1 {
    font-size: 17px;
    color: #7b7b7b;
    text-align: center;
  }

  margin: auto;
  margin-top: 20px;
`;

const ActBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 288px;
`;

const InnerActBox = styled.div`
  border: 1px solid #d7d7d7;
  height: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 10px;

  div {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: #f1f1f1;
    font-size: 14px;
    color: #343434;
    box-sizing: border-box;
    padding: 10px;

    p {
      width: 180px;
    }
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    width: 50px;
    hr {
      height: 60px;
      width: 1px;
      background-color: #cfcfcf;
      border: none;
    }

    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 9px;
      ion-icon {
        font-size: 24px;
      }
    }
  }
`;
