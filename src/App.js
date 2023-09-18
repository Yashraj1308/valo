import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const characters = [
  {
    name: "Jett",
    role: "Duelist",
    abilities: ["Cloudburst", "Updraft", "Blade Storm"],
  },
  {
    name: "Phoenix",
    role: "Duelist",
    abilities: ["Blaze", "Curveball", "Run It Back"],
  },
  {
    name: "Sova",
    role: "Initiator",
    abilities: ["Owl Drone", "Shock Bolt", "Hunter's Fury"],
  },
  {
    name: "Cypher",
    role: "Sentinel",
    abilities: ["Spycam", "Trapwire", "Neural Theft"],
  },
  {
    name: "Brimstone",
    role: "Controller",
    abilities: ["Incendiary", "Sky Smoke", "Orbital Strike"],
  },
  {
    name: "Omen",
    role: "Controller",
    abilities: ["Shrouded Step", "Paranoia", "Dark Cover"],
  },
  {
    name: "Breach",
    role: "Initiator",
    abilities: ["Aftershock", "Flashpoint", "Rolling Thunder"],
  },
];

function App() {
  const [character, setCharacter] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const generateOptions = useCallback((correctCharacter) => {
    const options = [correctCharacter];

    while (options.length < 4) {
      const randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];

      if (!options.includes(randomCharacter)) {
        options.push(randomCharacter);
      }
    }

   
    return shuffleArray(options);
  }, []); 

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const displayCharacter = useCallback(() => {
   
    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];

    
    const randomOptions = generateOptions(randomCharacter);

    setCharacter(randomCharacter);
    setOptions(randomOptions);
  }, [generateOptions]);

  useEffect(() => {
    displayCharacter();
  }, [displayCharacter]);

  const handleAnswer = (answer) => {
    if (answer === character.name) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    nextRound();
  };

  const nextRound = () => {
    setSelectedAnswer("");
    displayCharacter();
  };

  return (
    <div className="App">
      <h1>Valorant Character Quiz</h1>
      <div className="character-info">
        <h2>
          {selectedAnswer ? `Character: ${character.name}` : "Guess the character"}
        </h2>
        <h3>Role: {character.role}</h3>
        <h3>Abilities:</h3>
        <ul>
          {character.abilities ? (
            character.abilities.map((ability, index) => (
              <li key={index}>{ability}</li>
            ))
          ) : (
            <li>No abilities available</li>
          )}
        </ul>
      </div>
      <div className="options">
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => {
              setSelectedAnswer(option.name);
              handleAnswer(option.name);
            }}
            disabled={selectedAnswer !== ""}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default App;
