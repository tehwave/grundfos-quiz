        window.onload=function() {

        // Quiz Data
        var quiz = {
            title: 'Quiz',
            questions: [
                {
                    title: "Should you always wear Grundfos-provided Helmets?",
                    description: "Helmets to wear on your head during the tour.",
                    answers: [
                        { text: 'Yes, but you can bring your own.', correct: false, message: 'Incorrect. You must bring your own hat.' },
                        { text: 'Yes.', correct: true, message: 'Correct! Helmets must be worn at all times.' },
                        { text: 'No.', correct: false, message: 'Wrong. You must wear helmets!' },
                    ],
                    message: '',
                    answered: false,
                    correct: false,
                }, {
                    title: "Question 2",
                    description: "",
                    answers: [
                        { text: 'Wrong, too bad.', correct: false, message: 'Sorry, that\'s incorrect!' },
                        { text: 'Right!', correct: true, message: 'Awesome, that\'s correct!' },
                        { text: 'Wrong!', correct: false, message: 'Wrong. You must wear protection hats!' },
                    ],
                    message: '',
                    answered: false,
                    correct: false,
                }
            ]
        };

    // Application
    new Vue({
        el: "#app",
        data: {
            // slides: slides,
            // slideIndex: 0,
            quiz: quiz,
            questionIndex: 0,
            quizCompleted: false,
            questionCompleted: false,
            responses: new Array(quiz.questions.length)
        },
        methods: {
            next: function() {

                // Get question and answer
                var question = this.quiz.questions[this.questionIndex];
                var answer = question.answers[this.responses[this.questionIndex]];

                // Set data
                question.answered = true;
                question.correct = answer.correct;
                question.message = answer.message;

                //  If answer correct, proceed
                if (question.correct === true) {
                    this.questionIndex++;
                }
            },
            prev: function() {

                // Reset answered if answer was incorrect.
                var question = this.quiz.questions[this.questionIndex];
                if (question.answered && question.correct === false) {
                    question.answered = false;
                }

                this.questionIndex--;
            },
            unanswer: function () {
                this.quiz.questions[this.questionIndex].answered = false;
            },
            // TODO: Refactor
            score: function () {
                return quiz.questions.length;
            }
        }
    });
}
