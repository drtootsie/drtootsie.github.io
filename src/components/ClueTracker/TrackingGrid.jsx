import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const TrackingGrid = ({ config, knowledge, allCards }) => {
  if (!config || !knowledge) return null;

  const numPlayers = config.players.length;
  const playerNames = [...config.players, 'Envelope'];

  const getStatusIcon = (status) => {
    if (status === 1) return <Badge bg="success">YES</Badge>;
    if (status === -1) return <Badge bg="danger">NO</Badge>;
    return <span className="text-muted">?</span>;
  };

  const renderSection = (title, cards) => (
    <>
      <tr className="table-secondary">
        <th colSpan={numPlayers + 2}>{title}</th>
      </tr>
      {cards.map((card, i) => (
        <tr key={i}>
          <td className="fw-bold">{card}</td>
          {playerNames.map((_, pIdx) => (
            <td key={pIdx} className="text-center">
              {getStatusIcon(knowledge[pIdx][card])}
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  return (
    <div className="table-responsive">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Card</th>
            {playerNames.map((name, i) => (
              <th key={i} className="text-center small">
                {i === config.userIndex ? <strong>{name} (Me)</strong> : name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderSection('Suspects', config.cards.suspects)}
          {renderSection('Weapons', config.cards.weapons)}
          {renderSection('Rooms', config.cards.rooms)}
        </tbody>
      </Table>
    </div>
  );
};

export default TrackingGrid;
