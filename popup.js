/**
 * CodeMaster Quiz Extension
 * Version: 2.0.0
 * Description: Extension Chrome pour quiz de développement avec design moderne
 */
console.log('🚀 CodeMaster Quiz Extension démarrée');

// ================================
// CONFIGURATION & CONSTANTS
// ================================
const CONFIG = {
    TOTAL_QUESTIONS: 15,
    POINTS_PER_CORRECT: 10,
    BONUS_STREAK: 5,
    XP_PER_QUESTION: 20,
    FEEDBACK_DURATION: 1500,
    ANIMATION_DURATION: 300
};

const DIFFICULTY_LEVELS = {
    EASY: { name: 'Facile', icon: '🟢', points: 1 },
    MEDIUM: { name: 'Moyen', icon: '🟡', points: 2 },
    HARD: { name: 'Difficile', icon: '🔴', points: 3 }
};

const CATEGORIES = {
    LANGUAGES: 'Langages',
    FRAMEWORKS: 'Frameworks',
    CONCEPTS: 'Concepts',
    TOOLS: 'Outils'
};

// ================================
// QUIZ DATA GENERATOR
// ================================
class QuizDataGenerator {
    constructor() {
        this.languages = [
            'Python', 'JavaScript', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 
            'Rust', 'Swift', 'Kotlin', 'TypeScript', 'Dart', 'Scala', 'Perl',
            'R', 'Matlab', 'Lua', 'Haskell', 'Elixir', 'Crystal', 'Nim'
        ];
        
        this.frameworks = [
            'React', 'Vue.js', 'Angular', 'Express.js', 'Django', 'Flask',
            'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'Fastify'
        ];

        this.baseQuestions = [
            {
                q: 'Quel langage affiche Hello World avec print("Hello, World!") ?',
                a: ["Python", "C", "Java"],
                r: 0,
                category: CATEGORIES.LANGUAGES,
                difficulty: DIFFICULTY_LEVELS.EASY
            },
            {
                q: "Quel langage utilise System.out.println pour Hello World ?",
                a: ["Java", "Go", "Rust"],
                r: 0,
                category: CATEGORIES.LANGUAGES,
                difficulty: DIFFICULTY_LEVELS.EASY
            },
            {
                q: 'Quel langage utilise echo "Hello, World!" ?',
                a: ["Bash", "PHP", "Ruby"],
                r: 0,
                category: CATEGORIES.LANGUAGES,
                difficulty: DIFFICULTY_LEVELS.EASY
            },
            {
                q: 'Quel langage utilise puts "Hello, World!" ?',
                a: ["Ruby", "C#", "Swift"],
                r: 0,
                category: CATEGORIES.LANGUAGES,
                difficulty: DIFFICULTY_LEVELS.EASY
            },
            {
                q: "Quel langage utilise Console.WriteLine pour Hello World ?",
                a: ["C#", "JavaScript", "Go"],
                r: 0,
                category: CATEGORIES.LANGUAGES,
                difficulty: DIFFICULTY_LEVELS.EASY
            },
            {
                q: "Quel framework JavaScript utilise des composants réactifs ?",
                a: ["React", "jQuery", "Bootstrap"],
                r: 0,
                category: CATEGORIES.FRAMEWORKS,
                difficulty: DIFFICULTY_LEVELS.MEDIUM
            },
            {
                q: "Quel concept permet l'héritage multiple en Python ?",
                a: ["Mixins", "Classes", "Fonctions"],
                r: 0,
                category: CATEGORIES.CONCEPTS,
                difficulty: DIFFICULTY_LEVELS.HARD
            },
            {
                q: "Quel outil est utilisé pour la gestion de versions ?",
                a: ["Git", "NPM", "Docker"],
                r: 0,
                category: CATEGORIES.TOOLS,
                difficulty: DIFFICULTY_LEVELS.EASY
            }
        ];
    }

    generateRandomQuestion() {
        const templates = [
            {
                template: "Dans quel langage peut-on écrire Hello World avec {syntax} ?",
                syntaxes: [
                    'print("Hello, World!")',
                    'console.log("Hello, World!")',
                    'System.out.println("Hello, World!")',
                    'echo "Hello, World!"',
                    'puts "Hello, World!"',
                    'Console.WriteLine("Hello, World!")'
                ]
            },
            {
                template: "Quel langage utilise {concept} comme concept principal ?",
                concepts: [
                    "les classes et objets",
                    "la programmation fonctionnelle",
                    "les pointeurs",
                    "la gestion automatique de mémoire"
                ]
            }
        ];

        const correctLang = this.languages[Math.floor(Math.random() * this.languages.length)];
        const wrongAnswers = this.getRandomWrongAnswers(correctLang, 2);
        const answers = this.shuffleArray([correctLang, ...wrongAnswers]);
        const correctIndex = answers.indexOf(correctLang);

        return {
            q: `Dans quel langage peut-on écrire Hello World ainsi : print('Hello, World!') ?`,
            a: answers,
            r: correctIndex,
            category: CATEGORIES.LANGUAGES,
            difficulty: this.getRandomDifficulty()
        };
    }

    getRandomWrongAnswers(correct, count) {
        const available = this.languages.filter(lang => lang !== correct);
        const wrong = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * available.length);
            wrong.push(available.splice(randomIndex, 1)[0]);
        }
        return wrong;
    }

    getRandomDifficulty() {
        const difficulties = Object.values(DIFFICULTY_LEVELS);
        return difficulties[Math.floor(Math.random() * difficulties.length)];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    generateQuizSet(count = CONFIG.TOTAL_QUESTIONS) {
        const questions = [...this.baseQuestions];
        
        // Générer des questions supplémentaires si nécessaire
        while (questions.length < count) {
            questions.push(this.generateRandomQuestion());
        }

        // Mélanger et retourner le nombre demandé
        return this.shuffleArray(questions).slice(0, count);
    }
}

// ================================
// GAME STATE MANAGER
// ================================
class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctAnswers = 0;
        this.totalAnswered = 0;
        this.experience = 0;
        this.level = 'Débutant';
        this.questions = [];
        this.isQuizCompleted = false;
        this.selectedAnswer = null;
        this.hasAnswered = false;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    selectAnswer(answerIndex) {
        if (this.hasAnswered) return false;
        this.selectedAnswer = answerIndex;
        return true;
    }

    submitAnswer() {
        if (this.hasAnswered || this.selectedAnswer === null) return null;
        
        const question = this.getCurrentQuestion();
        const isCorrect = this.selectedAnswer === question.r;
        
        this.hasAnswered = true;
        this.totalAnswered++;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.streak++;
            this.maxStreak = Math.max(this.maxStreak, this.streak);
            
            const basePoints = CONFIG.POINTS_PER_CORRECT * question.difficulty.points;
            const streakBonus = this.streak >= 3 ? CONFIG.BONUS_STREAK : 0;
            this.score += basePoints + streakBonus;
            this.experience += CONFIG.XP_PER_QUESTION;
        } else {
            this.streak = 0;
        }

        this.updateLevel();
        return isCorrect;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.hasAnswered = false;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.isQuizCompleted = true;
        }
    }

    updateLevel() {
        if (this.experience >= 300) this.level = 'Expert';
        else if (this.experience >= 200) this.level = 'Avancé';
        else if (this.experience >= 100) this.level = 'Intermédiaire';
        else this.level = 'Débutant';
    }

    getAccuracy() {
        return this.totalAnswered > 0 ? Math.round((this.correctAnswers / this.totalAnswered) * 100) : 0;
    }

    getProgress() {
        return Math.round((this.currentQuestionIndex / this.questions.length) * 100);
    }
}

// ================================
// UI CONTROLLER
// ================================
class UIController {
    constructor() {
        this.elements = this.initializeElements();
        this.feedbackTimeout = null;
    }

    initializeElements() {
        return {
            // Header elements
            level: document.getElementById('level'),
            
            // Progress elements
            progressFill: document.getElementById('progressFill'),
            questionNumber: document.getElementById('questionNumber'),
            totalQuestions: document.getElementById('totalQuestions'),
            
            // Question elements
            difficulty: document.getElementById('difficulty'),
            category: document.getElementById('category'),
            questionText: document.getElementById('questionText'),
            answersContainer: document.getElementById('answersContainer'),
            
            // Button elements
            hintBtn: document.getElementById('hintBtn'),
            nextBtn: document.getElementById('nextBtn'),
            
            // Score elements
            currentScore: document.getElementById('currentScore'),
            streak: document.getElementById('streak'),
            experience: document.getElementById('experience'),
            
            // Feedback elements
            feedbackOverlay: document.getElementById('feedbackOverlay'),
            feedbackIcon: document.getElementById('feedbackIcon'),
            feedbackText: document.getElementById('feedbackText'),
            
            // Modal elements
            resultsModal: document.getElementById('resultsModal'),
            finalScore: document.getElementById('finalScore'),
            correctAnswers: document.getElementById('correctAnswers'),
            accuracy: document.getElementById('accuracy'),
            restartBtn: document.getElementById('restartBtn'),
            shareBtn: document.getElementById('shareBtn')
        };
    }

    updateHeader(gameState) {
        this.elements.level.textContent = gameState.level;
    }

    updateProgress(gameState) {
        const progress = gameState.getProgress();
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.questionNumber.textContent = gameState.currentQuestionIndex + 1;
        this.elements.totalQuestions.textContent = gameState.questions.length;
    }

    displayQuestion(question) {
        // Update question header
        this.elements.difficulty.innerHTML = `
            <span class="difficulty-icon">${question.difficulty.icon}</span>
            <span class="difficulty-text">${question.difficulty.name}</span>
        `;
        this.elements.category.textContent = question.category;
        this.elements.questionText.textContent = question.q;

        // Clear and populate answers
        this.elements.answersContainer.innerHTML = '';
        
        question.a.forEach((answer, index) => {
            const answerElement = this.createAnswerElement(answer, index);
            this.elements.answersContainer.appendChild(answerElement);
        });

        // Reset UI state
        this.elements.nextBtn.disabled = true;
        this.elements.nextBtn.innerHTML = `
            <span class="btn-text">Suivant</span>
            <span class="btn-icon">→</span>
        `;
    }

    createAnswerElement(answer, index) {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.dataset.index = index;
        
        answerDiv.innerHTML = `
            <div class="answer-text">
                <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
                <span>${answer}</span>
            </div>
        `;

        return answerDiv;
    }

    selectAnswer(index, gameState) {
        // Remove previous selections
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Select current answer
        const selectedOption = document.querySelector(`[data-index="${index}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
            this.elements.nextBtn.disabled = false;
        }

        return gameState.selectAnswer(index);
    }

    showAnswerFeedback(isCorrect, correctIndex) {
        document.querySelectorAll('.answer-option').forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
                option.querySelector('.answer-text').innerHTML += ' ✔️';
            } else if (option.classList.contains('selected') && !isCorrect) {
                option.classList.add('incorrect');
                option.querySelector('.answer-text').innerHTML += ' ❌';
            }
            
            // Disable all options
            option.style.pointerEvents = 'none';
        });

        // Update next button
        this.elements.nextBtn.innerHTML = `
            <span class="btn-text">Continuer</span>
            <span class="btn-icon">→</span>
        `;
    }

    showFeedback(isCorrect, streakCount = 0) {
        const icon = isCorrect ? '🎉' : '😔';
        let text = isCorrect ? 'Excellente réponse !' : 'Pas tout à fait...';
        
        if (isCorrect && streakCount >= 3) {
            text += ` 🔥 Série de ${streakCount} !`;
        }

        this.elements.feedbackIcon.textContent = icon;
        this.elements.feedbackText.textContent = text;
        this.elements.feedbackOverlay.classList.add('show');

        // Auto-hide feedback
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }
        
        this.feedbackTimeout = setTimeout(() => {
            this.hideFeedback();
        }, CONFIG.FEEDBACK_DURATION);
    }

    hideFeedback() {
        this.elements.feedbackOverlay.classList.remove('show');
    }

    updateScore(gameState) {
        this.elements.currentScore.textContent = gameState.score;
        this.elements.streak.textContent = gameState.streak;
        this.elements.experience.textContent = gameState.experience;
    }

    showResults(gameState) {
        this.elements.finalScore.textContent = gameState.score;
        this.elements.correctAnswers.textContent = `${gameState.correctAnswers}/${gameState.totalAnswered}`;
        this.elements.accuracy.textContent = `${gameState.getAccuracy()}%`;
        this.elements.resultsModal.classList.add('show');
    }

    hideResults() {
        this.elements.resultsModal.classList.remove('show');
    }

    addEventListeners(callbacks) {
        // Answer selection
        document.addEventListener('click', (e) => {
            const answerOption = e.target.closest('.answer-option');
            if (answerOption && callbacks.onAnswerSelect) {
                const index = parseInt(answerOption.dataset.index);
                callbacks.onAnswerSelect(index);
            }
        });

        // Next button
        this.elements.nextBtn.addEventListener('click', () => {
            if (callbacks.onNext) callbacks.onNext();
        });

        // Hint button
        this.elements.hintBtn.addEventListener('click', () => {
            if (callbacks.onHint) callbacks.onHint();
        });

        // Restart button
        this.elements.restartBtn.addEventListener('click', () => {
            if (callbacks.onRestart) callbacks.onRestart();
        });

        // Share button
        this.elements.shareBtn.addEventListener('click', () => {
            if (callbacks.onShare) callbacks.onShare();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                if (!this.elements.nextBtn.disabled) {
                    this.elements.nextBtn.click();
                }
            } else if (e.code >= 'KeyA' && e.code <= 'KeyD') {
                const index = e.code.charCodeAt(3) - 65; // A=0, B=1, C=2, D=3
                const answerOption = document.querySelector(`[data-index="${index}"]`);
                if (answerOption) answerOption.click();
            }
        });

        // Hide feedback on click
        this.elements.feedbackOverlay.addEventListener('click', () => {
            this.hideFeedback();
        });
    }
}

// ================================
// MAIN QUIZ CONTROLLER
// ================================
class QuizController {
    constructor() {
        this.gameState = new GameState();
        this.ui = new UIController();
        this.dataGenerator = new QuizDataGenerator();
        
        this.initializeQuiz();
    }

    initializeQuiz() {
        console.log('🎮 Initialisation du quiz...');
        
        // Generate questions
        this.gameState.questions = this.dataGenerator.generateQuizSet();
        
        // Setup UI event listeners
        this.ui.addEventListeners({
            onAnswerSelect: (index) => this.handleAnswerSelection(index),
            onNext: () => this.handleNext(),
            onHint: () => this.handleHint(),
            onRestart: () => this.restartQuiz(),
            onShare: () => this.shareResults()
        });

        // Start the quiz
        this.startQuiz();
    }

    startQuiz() {
        console.log('🚀 Démarrage du quiz...');
        this.gameState.reset();
        this.gameState.questions = this.dataGenerator.generateQuizSet();
        
        this.updateUI();
        this.displayCurrentQuestion();
    }

    handleAnswerSelection(index) {
        if (this.gameState.hasAnswered) return;
        
        const success = this.ui.selectAnswer(index, this.gameState);
        console.log(`📝 Réponse sélectionnée: ${index}`);
    }

    handleNext() {
        if (!this.gameState.hasAnswered) {
            // Submit answer
            const isCorrect = this.gameState.submitAnswer();
            if (isCorrect !== null) {
                console.log(`${isCorrect ? '✅' : '❌'} Réponse ${isCorrect ? 'correcte' : 'incorrecte'}`);
                
                this.ui.showAnswerFeedback(isCorrect, this.gameState.getCurrentQuestion().r);
                this.ui.showFeedback(isCorrect, this.gameState.streak);
                this.updateUI();
            }
        } else {
            // Move to next question
            this.gameState.nextQuestion();
            
            if (this.gameState.isQuizCompleted) {
                this.endQuiz();
            } else {
                this.displayCurrentQuestion();
                this.updateUI();
            }
        }
    }

    handleHint() {
        const question = this.gameState.getCurrentQuestion();
        const correctAnswer = question.a[question.r];
        
        // Simple hint: show first letter
        const hint = `La réponse commence par "${correctAnswer.charAt(0).toUpperCase()}"`;
        
        this.ui.showFeedback(true);
        this.ui.elements.feedbackIcon.textContent = '💡';
        this.ui.elements.feedbackText.textContent = hint;
        
        console.log(`💡 Indice donné: ${hint}`);
    }

    displayCurrentQuestion() {
        const question = this.gameState.getCurrentQuestion();
        this.ui.displayQuestion(question);
        console.log(`❓ Question ${this.gameState.currentQuestionIndex + 1}/${this.gameState.questions.length}`);
    }

    updateUI() {
        this.ui.updateHeader(this.gameState);
        this.ui.updateProgress(this.gameState);
        this.ui.updateScore(this.gameState);
    }

    endQuiz() {
        console.log('🏁 Quiz terminé !');
        console.log(`📊 Score final: ${this.gameState.score}`);
        console.log(`🎯 Précision: ${this.gameState.getAccuracy()}%`);
        
        setTimeout(() => {
            this.ui.showResults(this.gameState);
        }, 1000);
    }

    restartQuiz() {
        console.log('🔄 Redémarrage du quiz...');
        this.ui.hideResults();
        this.ui.hideFeedback();
        
        setTimeout(() => {
            this.startQuiz();
        }, CONFIG.ANIMATION_DURATION);
    }

    shareResults() {
        const gameState = this.gameState;
        const shareText = `🎮 CodeMaster Quiz\n` +
            `🏆 Score: ${gameState.score}\n` +
            `🎯 Précision: ${gameState.getAccuracy()}%\n` +
            `🔥 Meilleure série: ${gameState.maxStreak}\n\n` +
            `Teste tes connaissances en développement !`;

        if (navigator.share) {
            navigator.share({
                title: 'CodeMaster Quiz - Mes résultats',
                text: shareText
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.ui.showFeedback(true);
                this.ui.elements.feedbackIcon.textContent = '📋';
                this.ui.elements.feedbackText.textContent = 'Résultats copiés !';
            });
        }
        
        console.log('📤 Résultats partagés');
    }
}

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM chargé, initialisation de l\'extension...');
    
    try {
        // Initialize the quiz application
        window.quizApp = new QuizController();
        console.log('✅ CodeMaster Quiz initialisé avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
    }
});

// ================================
// GLOBAL ERROR HANDLING
// ================================
window.addEventListener('error', (event) => {
    console.error('💥 Erreur globale:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('💥 Promise rejetée:', event.reason);
});

console.log('🎯 CodeMaster Quiz Extension chargée et prête !');