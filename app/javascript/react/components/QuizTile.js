import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function QuizTile (props) {
    const [copied, setCopied] = useState(false);
    const { quiz } = props;
    const pathName = quiz.name.replace(/(\s+|\/+)/g, '');
    const fullPath = `/quizzes/${quiz.id}=:${pathName}`;

    const renderCopyLink = () => {
        if (document.queryCommandSupported('copy')) {
            const copyToClipboard = () => {
                const textField = document.createElement('textarea');
                textField.innerText = `http://quick-quizzer.herokuapp.com/${fullPath}`;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();
                setCopied(true);
                setTimeout( () => setCopied(false), 3000)
            };
            if (copied) {
                return (
                    <span className="tip">
                        <i className="fas fa-clipboard-check action"/>
                        <span>copied!</span>
                    </span>
                )
            }
            else {
                return (
                    <span className="tip">
                        <i onClick={copyToClipboard} className="fas fa-clipboard action"/>
                        <span>copy link to clipboard</span>
                    </span>
                )
            }
        }
    };

    return (
        <div className="quiz-tile">
            <a className="action" href={fullPath}>{quiz.name}</a>
            <span className="tip">
                <Link to={`/edit/:id`}><i className="far fa-edit action"/></Link>
                <span>edit</span>
            </span>
            {renderCopyLink()}
        </div>
    )
}