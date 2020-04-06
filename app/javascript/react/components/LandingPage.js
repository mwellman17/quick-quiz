import React, { Component } from 'react'
import QuestionTile from "./QuestionTile";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: null,
            questions: null,
            totalPoints: 0
        }
    }
    componentDidMount(){
        fetch('/api/v1/quizzes', { credentials: 'same-origin' })
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
                this.setState({ quiz: body.quiz, questions: body.questions })
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`))
    }

    renderQuiz = () => {
        const { quiz, questions } = this.state;
        if (!quiz) return <p>Loading...</p>;
        else {
            let count = 0;
            let renderQuestions = questions.map(question => {
                count ++;
                return <QuestionTile key={count} question={question} />
            });
            return (
                <div>
                    <h3>{quiz.name}</h3>
                    {renderQuestions}
                </div>
            )
        }
    };

    render() {
        const { renderQuiz } = this;

        return(
            <div id="main-content">
                {renderQuiz()}
            </div>
        )
    }
}

export default LandingPage;