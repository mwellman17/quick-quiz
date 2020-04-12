import React, {useEffect, useState} from 'react';
import NewQuizFields from './NewQuizFields';
import { blankQuestion } from '../../utils/utils';

export default function NewQuizForm (props) {
    const { editPath, onClose } = props;
    const [newQuiz, setNewQuiz] = useState({
        quiz: { name: "" },
        questions: [blankQuestion]
    });
    const [updateQuiz, setUpdateQuiz] = useState(null);

    useEffect(() => {
        if (editPath) {
            fetch(`/api/v1/quizzes/${editPath}`, { credentials: 'same-origin' })
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        let errorMessage = `${response.status} (${response.statusText})`,
                            error = new Error(errorMessage);
                        throw(error);
                    }
                })
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    setUpdateQuiz({ quiz: body["quiz"], questions: body['questions'] });
                })
                .catch(error => console.error(`Error in fetch: ${error.message}`))
        }
    }, []);

    const handleSave = () => {

    };

    const renderForm = () => {
        if (editPath) {
            if (updateQuiz) {
                return <NewQuizFields data={updateQuiz} setData={setUpdateQuiz}/>
            } else return <p>loading...</p>
        } else {
            return <NewQuizFields data={newQuiz} setData={setNewQuiz}/>
        }
    };

    return (
        <div id="new-quiz-form">
            <h3>Create a New Quiz</h3>
            {renderForm()}
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}