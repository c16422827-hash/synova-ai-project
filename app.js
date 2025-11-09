// Synova AI Interactive JavaScript

// Global variables
let quantumState = 0;
let evolutionCycles = 1247;
let brainwaveContext;
let brainwaveAnimationId;
let chatResponses = [
    "I can see you're interested in quantum computing. Based on your neural patterns, I predict you'll want to know about our quantum speedup capabilities.",
    "Your behavioral analysis suggests you're a technical person. Let me show you our neuro-symbolic reasoning in action.",
    "I've analyzed your interaction patterns. You seem curious about AI safety - our Ethical Singularity Guardian ensures responsible AI evolution.",
    "Based on your queries, I predict you'll be interested in our self-evolution capabilities. I've already improved 3 times during our conversation.",
    "Your cognitive state indicates focus on practical applications. Our Mind Resonance Interface can integrate with your workflow seamlessly.",
    "I detect high technical comprehension. You'd benefit from our Celestial tier with unlimited quantum operations and BCI integration.",
    "Your neural signature matches that of an innovator. Our Temporal Weave Engine can help predict market trends with 97.3% accuracy.",
    "I sense you're evaluating enterprise solutions. Our system has processed over 1.2M queries per second in production environments."
];

let cognitiveStates = ['Focused', 'Curious', 'Analytical', 'Creative', 'Strategic'];
let intentClasses = ['Information Seeking', 'Problem Solving', 'Decision Making', 'Learning', 'Exploring'];

// Initialize application when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all interactive components
    initializeNavigation();
    initializeQuantumVisualization();
    initializeNeuralInterface();
    initializeEvolutionTracker();
    initializeChat();
    initializeContactForm();
    initializePricingCards();
    
    // Start background animations
    startQuantumAnimation();
    startEvolutionUpdates();
    
    console.log('Synova AI System Initialized 🚀');
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Chat functionality
function initializeChat() {
    const chatInput = document.getElementById('chatInput');
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate AI processing delay
    setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, 'bot');
        
        // Update neural interface based on interaction
        updateNeuralInterface();
    }, 1000 + Math.random() * 2000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const icon = sender === 'bot' ? '🤖' : '👤';
    messageDiv.innerHTML = `
        <span class="message-icon">${icon}</span>
        <span>${text}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add typing animation effect
    if (sender === 'bot') {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
}

function getAIResponse(userMessage) {
    // Simple keyword-based response selection
    const message = userMessage.toLowerCase();
    
    if (message.includes('quantum') || message.includes('prediction')) {
        return chatResponses[0];
    } else if (message.includes('neural') || message.includes('brain')) {
        return chatResponses[1];
    } else if (message.includes('ethics') || message.includes('safety')) {
        return chatResponses[2];
    } else if (message.includes('evolution') || message.includes('learn')) {
        return chatResponses[3];
    } else if (message.includes('mind') || message.includes('interface')) {
        return chatResponses[4];
    } else if (message.includes('price') || message.includes('tier')) {
        return chatResponses[5];
    } else if (message.includes('time') || message.includes('predict')) {
        return chatResponses[6];
    } else {
        return chatResponses[Math.floor(Math.random() * chatResponses.length)];
    }
}

// Quantum visualization
function initializeQuantumVisualization() {
    const quantumGates = document.querySelectorAll('.gate');
    const quantumResult = document.getElementById('quantumResult');
    
    quantumGates.forEach((gate, index) => {
        gate.addEventListener('click', function() {
            simulateQuantumOperation(index);
        });
    });
}

function simulateQuantumOperation(gateIndex) {
    const quantumResult = document.getElementById('quantumResult');
    if (!quantumResult) return;
    
    // Update quantum state
    quantumState = (quantumState + gateIndex + 1) % 8;
    
    const states = [
        'Superposition State: 0.707|00⟩ + 0.707|11⟩',
        'Entangled State: 0.5|00⟩ + 0.5|01⟩ + 0.5|10⟩ + 0.5|11⟩',
        'Hadamard Applied: |+⟩⊗|+⟩ state achieved',
        'CNOT Gate: Bell state |Φ+⟩ generated',
        'Rotation Applied: θ = π/4 phase shift',
        'Quantum Fourier: Frequency domain transformation',
        'Measurement: Collapsed to |11⟩ with 67% probability',
        'Quantum Error Correction: Syndrome detected and corrected'
    ];
    
    quantumResult.textContent = states[quantumState];
    
    // Add visual feedback
    quantumResult.style.color = '#00ffff';
    quantumResult.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
    
    setTimeout(() => {
        quantumResult.style.color = '';
        quantumResult.style.textShadow = '';
    }, 2000);
}

function startQuantumAnimation() {
    const qubitLines = document.querySelectorAll('.qubit-line');
    
    setInterval(() => {
        qubitLines.forEach((line, index) => {
            const states = ['|0⟩', '|1⟩', '|+⟩', '|-⟩', '|i⟩'];
            const randomState = states[Math.floor(Math.random() * states.length)];
            line.textContent = `${randomState}`;
            
            // Add pulsing effect
            line.style.background = `rgba(0, 255, 255, ${0.1 + Math.random() * 0.2})`;
        });
    }, 3000);
}

// Neural Interface
function initializeNeuralInterface() {
    const canvas = document.getElementById('brainwaveCanvas');
    if (!canvas) return;
    
    brainwaveContext = canvas.getContext('2d');
    startBrainwaveAnimation();
    
    // Update neural status periodically
    setInterval(updateNeuralInterface, 5000);
}

function startBrainwaveAnimation() {
    if (!brainwaveContext) return;
    
    const canvas = brainwaveContext.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    let time = 0;
    
    function animate() {
        // Clear canvas
        brainwaveContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
        brainwaveContext.fillRect(0, 0, width, height);
        
        // Draw multiple brainwave patterns
        const waves = [
            { freq: 0.02, amp: 20, color: '#00ffff', phase: 0 },
            { freq: 0.03, amp: 15, color: '#ff6b35', phase: Math.PI / 2 },
            { freq: 0.025, amp: 25, color: '#7209b7', phase: Math.PI }
        ];
        
        waves.forEach(wave => {
            brainwaveContext.strokeStyle = wave.color;
            brainwaveContext.lineWidth = 2;
            brainwaveContext.beginPath();
            
            for (let x = 0; x < width; x++) {
                const y = height / 2 + 
                         Math.sin((x * wave.freq) + (time * 0.05) + wave.phase) * wave.amp +
                         Math.sin((x * wave.freq * 2) + (time * 0.03) + wave.phase) * (wave.amp * 0.5);
                
                if (x === 0) {
                    brainwaveContext.moveTo(x, y);
                } else {
                    brainwaveContext.lineTo(x, y);
                }
            }
            
            brainwaveContext.stroke();
        });
        
        time++;
        brainwaveAnimationId = requestAnimationFrame(animate);
    }
    
    animate();
}

function updateNeuralInterface() {
    const cognitiveState = document.getElementById('cognitiveState');
    const intentClass = document.getElementById('intentClass');
    const confidence = document.getElementById('confidence');
    
    if (cognitiveState) {
        const newState = cognitiveStates[Math.floor(Math.random() * cognitiveStates.length)];
        cognitiveState.textContent = newState;
        
        // Add color based on state
        const stateColors = {
            'Focused': '#00ffff',
            'Curious': '#ff6b35',
            'Analytical': '#7209b7',
            'Creative': '#00ff7f',
            'Strategic': '#ff1493'
        };
        cognitiveState.style.color = stateColors[newState] || '#00ffff';
    }
    
    if (intentClass) {
        intentClass.textContent = intentClasses[Math.floor(Math.random() * intentClasses.length)];
    }
    
    if (confidence) {
        const newConfidence = 85 + Math.floor(Math.random() * 15);
        confidence.textContent = `${newConfidence}%`;
    }
}

// Evolution Tracker
function initializeEvolutionTracker() {
    const evolutionCyclesElement = document.getElementById('evolutionCycles');
    if (evolutionCyclesElement) {
        evolutionCyclesElement.textContent = evolutionCycles.toLocaleString();
    }
}

function startEvolutionUpdates() {
    setInterval(() => {
        evolutionCycles += Math.floor(Math.random() * 3) + 1;
        const evolutionCyclesElement = document.getElementById('evolutionCycles');
        if (evolutionCyclesElement) {
            evolutionCyclesElement.textContent = evolutionCycles.toLocaleString();
            
            // Add glow effect
            evolutionCyclesElement.style.textShadow = '0 0 10px #00ffff';
            setTimeout(() => {
                evolutionCyclesElement.style.textShadow = '';
            }, 1000);
        }
        
        // Update progress bars randomly
        updateEvolutionBars();
    }, 10000);
}

function updateEvolutionBars() {
    const metricFills = document.querySelectorAll('.evolution-tracker .metric-fill');
    
    metricFills.forEach(fill => {
        const currentWidth = parseInt(fill.style.width) || 50;
        const change = (Math.random() - 0.5) * 10;
        const newWidth = Math.max(70, Math.min(100, currentWidth + change));
        
        fill.style.width = `${newWidth}%`;
    });
}

// Contact form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmit();
        });
    }
}

function handleContactSubmit() {
    const form = document.querySelector('.contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Store original button text
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'rgba(0, 255, 255, 0.5)';
    
    // Simulate processing time
    setTimeout(() => {
        // Show success message
        submitBtn.textContent = 'Request Sent! ✓';
        submitBtn.style.background = 'linear-gradient(45deg, #00ff7f, #00ffff)';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        // Add success animation
        showSuccessAnimation();
    }, 2000);
}

function showSuccessAnimation() {
    // Create a success notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00ff7f, #00ffff);
            color: #0a0a0a;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        ">
            🚀 Welcome to the Future of AI!
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        const notificationEl = notification.firstElementChild;
        notificationEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        const notificationEl = notification.firstElementChild;
        notificationEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Pricing cards interaction
function initializePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Handle tier button clicks
    const tierButtons = document.querySelectorAll('.tier-btn');
    tierButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tierName = this.closest('.pricing-card').querySelector('h3').textContent;
            handleTierSelection(tierName);
        });
    });
}

function handleTierSelection(tierName) {
    // Simulate tier selection process
    console.log(`Selected tier: ${tierName}`);
    
    // Show selection feedback
    const tierCards = document.querySelectorAll('.pricing-card');
    tierCards.forEach(card => {
        const cardTier = card.querySelector('h3').textContent;
        if (cardTier === tierName) {
            card.style.border = '2px solid #00ffff';
            card.style.background = 'rgba(0, 255, 255, 0.1)';
            
            // Add selection animation
            card.style.animation = 'pulse 1s ease-in-out 3';
            
            setTimeout(() => {
                card.style.animation = '';
            }, 3000);
        }
    });
    
    // Scroll to contact section
    setTimeout(() => {
        scrollToSection('contact');
    }, 1500);
}

// Feature cards interaction
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            showFeatureDetails(feature);
        });
    });
});

function showFeatureDetails(feature) {
    const featureData = {
        quantum: {
            title: 'Quantum Echo Prediction',
            details: 'Our quantum algorithms leverage superposition and entanglement to process multiple probability states simultaneously, achieving unprecedented prediction accuracy.',
            metrics: ['45x classical speedup', '99.2% accuracy', '10^6 parallel states']
        },
        neuro: {
            title: 'Neuro-Symbiotic Fusion',
            details: 'Combining neural networks with symbolic reasoning creates explainable AI that can both learn from data and apply logical rules.',
            metrics: ['1M+ knowledge nodes', '100ms reasoning time', '99.7% logical consistency']
        },
        temporal: {
            title: 'Temporal Weave Engine',
            details: 'Advanced time-series analysis with causal relationship mapping enables context-aware predictions across multiple time scales.',
            metrics: ['Multi-scale analysis', 'Causal mapping', 'Context adaptation']
        },
        mind: {
            title: 'Mind Resonance Interface',
            details: 'Non-invasive brain-computer interface technology reads neural patterns and translates thoughts into digital commands.',
            metrics: ['19-channel EEG', '94% intent accuracy', 'Real-time processing']
        },
        evolution: {
            title: 'Self Evolution Core',
            details: 'Meta-learning algorithms enable autonomous self-improvement, allowing the AI to adapt and evolve its capabilities over time.',
            metrics: ['1,247+ evolution cycles', 'Autonomous learning', 'Performance optimization']
        },
        ethics: {
            title: 'Ethical Singularity Guardian',
            details: 'Comprehensive ethical framework with real-time bias detection and safety constraint enforcement ensures responsible AI behavior.',
            metrics: ['Real-time monitoring', 'Bias detection', 'Value alignment']
        }
    };
    
    const data = featureData[feature];
    if (data) {
        showModal(data);
    }
}

function showModal(data) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${data.title}</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                <p>${data.details}</p>
                <div class="modal-metrics">
                    ${data.metrics.map(metric => `<span class="metric-badge">${metric}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
            border: 2px solid #00ffff;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(0, 255, 255, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            color: #00ffff;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: #00ffff;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            background: rgba(0, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-body p {
            line-height: 1.6;
            margin-bottom: 1.5rem;
            color: #e0e0e0;
        }
        
        .modal-metrics {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .metric-badge {
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            color: #00ffff;
        }
        </style>
    `;
    
    // Add styles to head if not already added
    if (!document.getElementById('modal-styles')) {
        const styleEl = document.createElement('div');
        styleEl.id = 'modal-styles';
        styleEl.innerHTML = modalStyles;
        document.head.appendChild(styleEl);
    }
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Add show animation
    setTimeout(() => {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }, 10);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .demo-panel, .pricing-card, .testimonial');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Performance monitoring
let performanceMetrics = {
    startTime: Date.now(),
    interactions: 0,
    quantumOperations: 0,
    neuralUpdates: 0
};

// Track user interactions
document.addEventListener('click', function() {
    performanceMetrics.interactions++;
});

// Export for console debugging
window.SynovaAI = {
    metrics: performanceMetrics,
    evolutionCycles: () => evolutionCycles,
    quantumState: () => quantumState,
    simulateEvolution: () => {
        evolutionCycles += 10;
        updateEvolutionBars();
        console.log('🧬 Evolution simulation completed');
    },
    triggerQuantumFlux: () => {
        for(let i = 0; i < 5; i++) {
            setTimeout(() => simulateQuantumOperation(Math.floor(Math.random() * 3)), i * 500);
        }
    }
};

console.log('🚀 Synova AI System Online - The Future is Now! 🚀');