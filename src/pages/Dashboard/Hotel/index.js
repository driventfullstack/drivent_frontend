import styled from 'styled-components';
import { ValidationCard } from '../../../components/ValidationCard';
import { useTicket } from '../../../hooks/api/useTickets';
import { Typography } from '@material-ui/core';

export default function Hotel() {
  const { ticket } = useTicket();
  return (
    <>
      <StyledTypography variant="h4">Escolha de quarto e hotel</StyledTypography>
      {ticket?.status !== 'PAID' ? (
        <ValidationCard text={'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'} />
      ) : !ticket.TicketType?.includesHotel ? (
        <ValidationCard
          text={'Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades'}
        />
      ) : (
        <>
          colocar os hoteis aqui
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
