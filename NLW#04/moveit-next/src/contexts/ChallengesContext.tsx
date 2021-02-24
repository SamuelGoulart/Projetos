import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

// TypeScript
interface ChallengesContextData{
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    ChallengesCompleted: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge:() => void;
    resetChallenge: () => void;
    
}
// Fim do TypeScript

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps{
    children: ReactNode;
}

export function ChallengesProvider({ children}: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [ChallengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level +1 ) * 4,2)

    function levelUp(){
      setLevel(level + 1);
    }
    
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
       
        setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider 
        value={{
                level,
                currentExperience, 
                experienceToNextLevel,
                ChallengesCompleted, 
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                 }} >
           {children}
        </ChallengesContext.Provider>

    );
}