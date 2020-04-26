import React, { useState } from 'react'
import AnswerTile from "./AnswerTile";

export default function QuestionTile (props) {
    const [guesses, setGuesses] = useState([]);
    const [points, setPoints] = useState(null);
    const { question, feedPoints } = props;

    const handleClick = (answer) => {
        let newGuesses = [...guesses];
        newGuesses.push(answer.letter);

        if (answer['correct_answer']) {
            let totalPoints;
            if (newGuesses.length === 1) totalPoints = 10;
            else if (newGuesses.length === 2) totalPoints = 5;
            else if (newGuesses.length === 3) totalPoints = 3;
            else totalPoints = 0;
            feedPoints(totalPoints, { [question.number]: newGuesses });
            setPoints(totalPoints)
        }
        setGuesses(newGuesses);
    };


    let count = 0;
    let renderAnswers = question["answers"].map(answer => {
        count ++;
        return <AnswerTile key={count} answer={answer} clickHandler={handleClick} />
    });

    let renderImage = () => {
        if (question['image_url']) {
            return (
                <a href={question['image_url']} target="_blank" rel="noopener noreferrer">
                    <img src={question['image_url']} alt=""/>
                </a>
            )
        }
    };

    let renderPoints = () => {
        if (points != null) return <div className="score">{`+${points}`}</div>
    };

    return (
        <div key={question.id} className="question">
            <p className="question-number">{question.number + ")"}</p>
            <div className="question-text" dangerouslySetInnerHTML={{ __html: question.text }} />
            {renderImage()}
            {renderPoints()}
            <div className="answers">
                {renderAnswers}
            </div>
        </div>
    )
}
