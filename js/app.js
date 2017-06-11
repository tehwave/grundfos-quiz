//Application
window.onload=function() {
    // Translation
    Vue.use(Polyglot, {
        defaultLanguage: 'english',
        languagesAvailable: ['dansk']
    });

    Vue.locales({
        'dansk': {
            'subheader_reset': 'Start ny',
            'information_title': 'Indtast din information',
            'information_name': 'Navn',
            'information_name_placeholder': 'Skriv dit navn her',
            'information_company': 'Firma',
            'information_company_placeholder': 'Skriv dit firma her',
            'information_required': 'Påkrævet',
            'slide_next': 'Næste',
            'slide_previous': 'Tilbage',
            'guidelines': 'Retningslinjer',
            'recommendations': 'Anbefalinger',
            'quiz_error': 'Desværre, forkert svar.',
            'quiz_success': 'Du har svaret rigtigt!',
            'results_header_1': 'Tillykke!',
            'results_header_2': 'Du har bestået sikkerhedskontrollen',
            'results_instructions': 'Dette er din kvittering, venligst print den ud og vis den i receptionen',
            'results_name': 'Navn',
            'results_company': 'Firma',
            'results_datetime': 'Dato & Tidspunkt',
            'results_goodbye': 'Tak fordi du besøgte Grundfos. Ha\' en sikker og behagelig tur!',
        },
        'english': {
            'subheader_reset': 'Start new',
            'information_title': 'Input your information',
            'information_name': 'Name',
            'information_name_placeholder': 'Write your name here',
            'information_company': 'Company',
            'information_company_placeholder': 'Write your company here',
            'information_required': 'Required',
            'slide_next': 'Next',
            'slide_previous': 'Previous',
            'guidelines': 'Guidelines',
            'recommendations': 'Recommendations',
            'quiz_error': 'Sorry, that is wrong.',
            'quiz_success': 'That is correct!',
            'results_header_1': 'Congratulations',
            'results_header_2': 'You have passed the safety check',
            'results_instructions': 'This is your receipt, please print it out and show it in the reception.',
            'results_name': 'Name',
            'results_company': 'Company',
            'results_datetime': 'Date & Time',
            'results_goodbye': 'Thank you for visiting Grundfos. Have a safe and pleasant trip!',
        }
    });

    // Default Objects (these will be overwritten by their language equivalents)
    var user = {
        language: '',
        name: '',
        company: ''
    };

    var guidelines = [
        {
            image: 'evacuation.png',
            text: 'Evacuation'
        },
    ];

    var recommendations = [
        {
            image: 'stairs.png',
            text: 'Stairs'
        },
    ];

    var quiz = {
        questions: [
            {
                "title": "question",
                "description": "description",
                "image": "question2.png",
                "answers": [{
                        "text": "Wrong",
                        "correct": false
                    },
                    {
                        "text": "Wrong",
                        "correct": false
                    },
                    {
                        "text": "Correct",
                        "correct": true
                    }
                ],
                "answered": false,
                "correct": false
            }
        ]
    };

    // Application
    new Vue({
        el: "#app",
        data: {
            slideIndex: 0,
            user: user,
            guidelines: guidelines,
            recommendations: recommendations,
            quiz: quiz,
            test: null,
            questionIndex: 0,
            quizCompleted: false,
            questionCompleted: false,
            responses: new Array(quiz.questions.length)
        },
        methods: {
            selectLanguage: function(language) {

                //Set language
                this.user.language = language;
                this.$polyglot.setLang({lang: language});

                //Get quiz, guidelines and recommendations
                this.getFiles();

                this.nextSlide();
            },
            getFiles: function () {
                // Quiz
                var self = this;
                fetch('files/quiz-' + this.user.language + '.json')
                    .then(function(response) {
                        return response.json()
                    }).then(function(json) {
                        self.quiz = json;
                    }).catch(function(ex) {
                        console.log('JSON Parsing Failed', ex)
                    });

                // // Guidelines
                fetch('files/guideline-' + this.user.language + '.json')
                    .then(function(response) {
                        return response.json()
                    }).then(function(json) {
                        self.guidelines = json;
                    }).catch(function(ex) {
                        console.log('JSON Parsing Failed', ex)
                    });

                // // Recommendations
                fetch('files/recommendation-' + this.user.language + '.json')
                    .then(function(response) {
                        return response.json()
                    }).then(function(json) {
                        self.recommendations = json;
                    }).catch(function(ex) {
                        console.log('JSON Parsing Failed', ex)
                    });
            },
            nextSlide: function () {
                this.slideIndex++;
            },
            prevSlide: function () {
                this.slideIndex--;
            },
            next: function() {
                // Get question and answer
                var question = this.quiz.questions[this.questionIndex];
                var answer = question.answers[this.responses[this.questionIndex]];

                // Set data
                question.answered = true;
                question.correct = answer.correct;

                //  If answer correct, proceed
                if (question.correct === true) {
                    this.questionIndex++;
                }

                if (this.questionIndex === this.quiz.questions.length) {
                    this.nextSlide();
                }
            },
            prev: function() {

                if (this.questionIndex === 0) {
                    this.prevSlide();
                    return;
                }

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
            date: function () {
                return moment().locale('da').format('L HH[:]mm');
            },
            reset: function () {
                location.reload();
            }
        }
    });
}
