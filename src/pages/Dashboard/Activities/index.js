import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const token = useToken();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const activitiesData = response.data;

        const groupedActivities = activitiesData.reduce((grouped, activity) => {
          const activityDate = new Date(activity.startAt).toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'numeric',
          }).replace('-feira', '');

          if (!grouped[activityDate]) {
            grouped[activityDate] = [];
          }
          grouped[activityDate].push(activity);
          return grouped;
        }, {});

        const filteredActivities = Object.values(groupedActivities);

        setActivities(filteredActivities);
        console.log(filteredActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Container>
      <h1>Escolha de atividades</h1>
      <h2>Primeiro, filtre pelo dia do evento:</h2>
      <EventsContainer>
        {activities.map((dayActivities, index) => (
          <EventDay key={index}>
            {new Date(dayActivities[0].startAt).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'numeric',
            }).replace('-feira', '')}
          </EventDay>
        ))}
      </EventsContainer>
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
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
margin-right: 17px;
text-align:center;
display: flex;
align-items: center;
justify-content: center;
`;
