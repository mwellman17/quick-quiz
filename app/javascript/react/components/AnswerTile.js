import React, { useState } from 'react'

export default function AnswerTile (props) {
    const [clicked, setClicked] = useState(false);
    const { answer, clickHandler } = props;

    const handleClick = () => {
        clickHandler(answer['correct_answer']);
        setClicked(true)
    };

    let selectedClasses = clicked ? answer['correct_answer'] ? "correct" : "incorrect" : "";

    return (
        <p className={`answer ${selectedClasses}`} onClick={clicked ? null : handleClick}>
            <span className="answer-letter">{answer["letter"] + ")"}</span>
            <p className="answer-text" dangerouslySetInnerHTML={{ __html: answer.text }} />
        </p>
    )
}
