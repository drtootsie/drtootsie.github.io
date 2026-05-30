import { useState, useMemo, useEffect } from 'react';

export const useClueEngine = () => {
  const [config, setConfig] = useState(null);
  const [myCards, setMyCards] = useState([]);
  const [turns, setTurns] = useState([]);

  // knowledge matrix: [playerIndex][cardName] = status (1: Has, -1: Doesn't Have, 0: Unknown)
  const [matrix, setMatrix] = useState({});

  const allCards = useMemo(() => {
    if (!config) return [];
    return [...config.cards.suspects, ...config.cards.weapons, ...config.cards.rooms];
  }, [config]);

  const resetGame = (newConfig) => {
    setConfig(newConfig);
    setMyCards([]);
    setTurns([]);
    setMatrix({});
  };

  const addTurn = (turn) => {
    setTurns(prev => [...prev, turn]);
  };

  const updateMyCards = (cards) => {
    setMyCards(cards);
  };

  // The Solver
  const knowledge = useMemo(() => {
    if (!config) return null;

    const numPlayers = config.players.length;
    // Initial state: everyone is unknown for every card
    // Use an extra "player" index for the "Envelope" (solution)
    const ENVELOPE_INDEX = numPlayers;
    const initialMatrix = {};
    const playerIndices = Array.from({ length: numPlayers + 1 }, (_, i) => i);
    
    playerIndices.forEach(pIdx => {
      initialMatrix[pIdx] = {};
      allCards.forEach(card => {
        initialMatrix[pIdx][card] = 0; // Unknown
      });
    });

    // 1. Fill in my own cards
    myCards.forEach(card => {
      initialMatrix[config.userIndex][card] = 1; // I have it
      // No one else has it
      playerIndices.forEach(pIdx => {
        if (pIdx !== config.userIndex) initialMatrix[pIdx][card] = -1;
      });
    });

    // 2. Process turns for "Doesn't Have" (passes)
    turns.forEach(turn => {
      const { suggesterIndex, cards, disproverIndex } = turn;
      const suggestedList = [cards.suspect, cards.weapon, cards.room];

      // Everyone between suggester and disprover (exclusive) doesn't have any of the cards
      let currentIdx = (suggesterIndex + 1) % numPlayers;
      while (currentIdx !== (disproverIndex === -1 ? suggesterIndex : disproverIndex)) {
        suggestedList.forEach(card => {
          initialMatrix[currentIdx][card] = -1;
        });
        currentIdx = (currentIdx + 1) % numPlayers;
      }

      // If no one disproved it (disproverIndex === -1), and we are sure they aren't in hands, they are the solution
      // (This is handled by the "Everyone doesn't have it" loop above which hits everyone else)
    });

    // 3. Iterative Deduction (Rule of 3)
    // "If player X disproved suggestion {A,B,C}, they have at least one of them."
    let changed = true;
    while (changed) {
      changed = false;

      // Rule: If we know a card is in the envelope, no one has it.
      allCards.forEach(card => {
        if (initialMatrix[ENVELOPE_INDEX][card] === 1) {
          for (let i = 0; i < numPlayers; i++) {
            if (initialMatrix[i][card] !== -1) {
              initialMatrix[i][card] = -1;
              changed = true;
            }
          }
        }
      });

      // Rule: If every player doesn't have a card, it's in the envelope.
      allCards.forEach(card => {
        if (initialMatrix[ENVELOPE_INDEX][card] === 0) {
          let canHave = false;
          for (let i = 0; i < numPlayers; i++) {
            if (initialMatrix[i][card] !== -1) {
              canHave = true;
              break;
            }
          }
          if (!canHave) {
            initialMatrix[ENVELOPE_INDEX][card] = 1;
            changed = true;
          }
        }
      });

      // Rule: If a player disproved {A,B,C} and we know they don't have 2 of them, they MUST have the 3rd.
      turns.forEach(turn => {
        if (turn.disproverIndex !== -1) {
          const { disproverIndex, cards } = turn;
          const suggestedList = [cards.suspect, cards.weapon, cards.room];
          
          if (initialMatrix[disproverIndex][turn.shownCard] === 1) return; // Already know

          const unknownOrHas = suggestedList.filter(c => initialMatrix[disproverIndex][c] !== -1);
          if (unknownOrHas.length === 1 && initialMatrix[disproverIndex][unknownOrHas[0]] === 0) {
            initialMatrix[disproverIndex][unknownOrHas[0]] = 1;
            // And if they have it, no one else does
            playerIndices.forEach(pIdx => {
              if (pIdx !== disproverIndex) initialMatrix[pIdx][unknownOrHas[0]] = -1;
            });
            changed = true;
          }
        }
      });

      // Rule: If a player has a card, they don't have any other card in that slot? No, players can have multiple.
      // Rule: If a card is definitely held by one player, no one else has it.
      allCards.forEach(card => {
        let owner = -1;
        for (let i = 0; i <= numPlayers; i++) {
          if (initialMatrix[i][card] === 1) {
            owner = i;
            break;
          }
        }
        if (owner !== -1) {
          for (let i = 0; i <= numPlayers; i++) {
            if (i !== owner && initialMatrix[i][card] !== -1) {
              initialMatrix[i][card] = -1;
              changed = true;
            }
          }
        }
      });
    }

    return initialMatrix;
  }, [config, myCards, turns, allCards]);

  return {
    config,
    myCards,
    turns,
    knowledge,
    allCards,
    resetGame,
    addTurn,
    updateMyCards
  };
};
