import styled from "styled-components";

const StyledCard = styled.div`
  background-color: var(--white-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px 0;
  transition: box-shadow 0.3s ease-in-out;
  width: 250px;
  word-wrap: break-word;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  p {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.4;
    color: #333;
    text-align: left;
  }

  strong {
    margin-right: 4px;
  }
`;

type RowData = Record<string, string | number>;
interface CardProps {
  row: RowData;
}
const Card = ({ row }: CardProps) => (
  <StyledCard>
    {Object.entries(row).map(([key, value]) => (
      <p key={key}>
        <strong>{key}: </strong>
        {value}
      </p>
    ))}
  </StyledCard>
);

export default Card;
