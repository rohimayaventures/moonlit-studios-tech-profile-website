import re

html_file = 'index.html'
with open(html_file, 'r') as f:
    html = f.read()

chai_css = """
/* Floating Chai Cup - Back to Top */
.chai-cup-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(107, 124, 89, 0.95) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
    opacity: 0;
    visibility: hidden;
    transform: translateY(100px);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1000;
    border: 3px solid var(--gold);
}

.chai-cup-button.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.chai-cup-button:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 12px 35px rgba(212, 175, 55, 0.6);
    background: linear-gradient(135deg, var(--gold) 0%, var(--olive) 100%);
}

.chai-cup-button svg {
    width: 40px;
    height: 40px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.steam {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
}

.steam-line {
    fill: none;
    stroke: rgba(107, 124, 89, 0.7);
    stroke-width: 2;
    stroke-linecap: round;
    animation: steam-rise 3s ease-in-out infinite;
}

.steam-line:nth-child(1) { animation-delay: 0s; }
.steam-line:nth-child(2) { animation-delay: 0.5s; }
.steam-line:nth-child(3) { animation-delay: 1s; }

@keyframes steam-rise {
    0% { opacity: 0; transform: translateY(0) scale(1); }
    50% { opacity: 0.7; }
    100% { opacity: 0; transform: translateY(-20px) scale(1.2); }
}

@media (max-width: 768px) {
    .chai-cup-button { width: 60px; height: 60px; bottom: 20px; right: 20px; }
    .chai-cup-button svg { width: 35px; height: 35px; }
}
"""

chai_html = '''
    <!-- Floating Chai Cup - Back to Top -->
    <button class="chai-cup-button" id="chaiButton" aria-label="Scroll to top">
        <svg class="steam" width="30" height="25" xmlns="http://www.w3.org/2000/svg">
            <path class="steam-line" d="M 8 20 Q 8 10, 8 0" />
            <path class="steam-line" d="M 15 20 Q 15 10, 15 0" />
            <path class="steam-line" d="M 22 20 Q 22 10, 22 0" />
        </svg>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M 6 6 L 8 18 C 8 19 9 20 10 20 L 14 20 C 15 20 16 19 16 18 L 18 6 Z" 
                  fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="2"/>
            <path d="M 18 8 Q 22 8, 22 12 Q 22 16, 18 16" 
                  fill="none" stroke="white" stroke-width="2"/>
            <ellipse cx="12" cy="6" rx="6" ry="1.5" 
                     fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="2"/>
        </svg>
    </button>
'''

chai_js = """
        const chaiButton = document.getElementById('chaiButton');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                chaiButton.classList.add('visible');
            } else {
                chaiButton.classList.remove('visible');
            }
        });
        chaiButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
"""

html = html.replace('</style>', chai_css + '\n    </style>')
html = html.replace('</body>', chai_html + '\n</body>')
html = html.replace('    </script>', chai_js + '\n    </script>')

with open(html_file, 'w') as f:
    f.write(html)

print('✅ Chai cup button added! 🍵')
