# 🖥️ Coding Terminal Collective - Matrix Edition

A **modern web-based code execution platform** that brings together my programming journey from high school to college, revamped with cutting-edge web technologies and a stunning Matrix-inspired interface.

## 🎓 The Story Behind This Project

During my educational journey through computer science, I created dozens of programming projects across different languages and courses:
- **Python** - High School Computer Science
- **Java** - AP Computer Science
- **C++** - College Programming Foundations I

Years later, I decided to revamp and showcase these projects in a way that honors the learning journey while demonstrating modern full-stack development skills. This platform doesn't just preserve old code - it transforms them into an interactive, visually stunning experience that anyone can explore.

## ✨ What Makes This Special

### 🎯 A Living Portfolio
Instead of letting educational projects collect dust in old folders, I've created a **unified execution environment** where anyone can:
- Run my original high school and college projects
- See 27 Python challenges, 17 Java projects, and 3 C++ applications
- Upload and execute their own code in **100+ programming languages**
- Experience everything through a cyberpunk Matrix-themed interface

### 🚀 Modern Tech Stack
This isn't just a simple code runner - it's a demonstration of:
- **Vite** - Lightning-fast build tooling
- **CodeMirror 6** - Advanced code editing with syntax highlighting
- **Supabase Edge Functions** - Serverless code execution
- **Multi-API Smart Routing** - Automatic fallback between Piston API, Judge0, and Glot.io
- **Advanced Language Detection** - AI-powered detection for 100+ languages
- **Canvas Animations** - Custom Matrix rain effect with dynamic keywords

### 🎨 Interactive Experience
- **Matrix Rain Background** - Falling code with horizontal scrolling keywords
- **Hexagon Output Terminal** - Futuristic animated display
- **Spark Effects** - Visual feedback on code execution
- **Terminal Power States** - Turn the interface on/off
- **Responsive Design** - Works seamlessly on mobile and desktop

## 🛠️ Technical Features

### Code Execution Engine
- **Edge Function Primary** - Supabase serverless functions for fast execution
- **Fallback System** - Automatic retry with Piston API if edge function fails
- **Batch Input Model** - Intelligent stdin handling for interactive programs
- **Multi-API Support** - 100+ languages through distributed execution providers

### Language Support
**Popular Languages:** Python, JavaScript, TypeScript, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Scala, R, Perl, Lua, Bash, Haskell, Elixir, Clojure, F#, Dart, Julia, Nim, Crystal, OCaml, Pascal, Fortran, COBOL

**Esoteric Languages:** Brainfuck, LOLCODE, Rockstar, Befunge-93, Cow, Emojicode, Vyxal

### Smart Language Detection
The platform automatically detects your code's language using:
1. File extension analysis
2. Shebang line detection
3. Syntax pattern matching
4. Keyword frequency analysis
5. Confidence scoring system

### Educational Projects Included

#### Python Projects (27 Challenges)
From basic I/O to complex algorithms including password validators, temperature converters, story games, quadratic solvers, and prime number checkers.

#### Java Projects (17 Programs)
Real-world applications like weight converters, Connect Four game, GPS distance calculator, tuition calculator, and SSN validator.

#### C++ Projects (3 Applications)
Advanced programs including a bike race calculator, e-commerce shop simulator, and scientific calculator with multiple modes.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/coding-terminal-collective.git

# Navigate to the project
cd coding-terminal-collective

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

The project uses Supabase for code execution. Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎮 How to Use

### Running Educational Projects
1. Select a tab (Python, Java, or C++)
2. Click **EXECUTE** to see the project menu
3. Enter a challenge number
4. Follow the prompts to provide inputs
5. Watch your results appear in the hexagon terminal

### Running Custom Code
1. Switch to **"Upload Your Code"** tab
2. Click **Upload File** or paste code directly
3. The system auto-detects your language
4. Click **EXECUTE** to run
5. Provide inputs in the terminal as needed

## 🏗️ Project Structure

```
coding-terminal-collective/
├── src/
│   ├── main.js           # Main application logic & event handlers
│   ├── matrix.js         # Matrix rain animation engine
│   ├── languageDetector.js  # Multi-language detection system
│   ├── codeData.js       # Educational project source code
│   └── style.css         # Matrix-themed styling
├── supabase/
│   └── functions/
│       └── code-executor/    # Edge function for code execution
├── index.html            # Main HTML structure
└── package.json          # Dependencies & scripts
```

## 🎨 Design Philosophy

The Matrix theme wasn't chosen randomly - it represents:
- **Code as Reality** - In The Matrix, code defines everything. Here, code execution is the core reality.
- **Green Terminal Aesthetic** - A nostalgic nod to classic computing and hacker culture
- **Cyberpunk Learning** - Making computer science education visually engaging
- **Technical Elegance** - Proving that educational projects can be both functional and beautiful

## 🔧 Technical Challenges Solved

### 1. Multi-Language Execution
Built a smart routing system that attempts edge function execution first, then falls back to Piston API, ensuring high availability.

### 2. Interactive Input Handling
Developed a batch input collection system that works with remote execution APIs that don't support real-time stdin.

### 3. Language Detection Accuracy
Created a multi-strategy detection algorithm achieving 90%+ accuracy across 100+ languages using syntax patterns, file extensions, and keyword analysis.

### 4. Performance Optimization
Implemented CodeMirror 6 with lazy loading, canvas-based animations with requestAnimationFrame, and optimized re-renders.

### 5. Responsive Matrix Effects
Built a canvas-based animation system that scales efficiently across devices while maintaining 60fps performance.

## 🌟 Future Enhancements

- [ ] Code collaboration features
- [ ] Project sharing via unique URLs
- [ ] Execution history and saved sessions
- [ ] AI-powered code suggestions
- [ ] More educational project categories
- [ ] Execution time and memory tracking
- [ ] Custom theme support
- [ ] Code snippet library

## 📊 Stats

- **100+** Programming languages supported
- **47** Educational projects included
- **3** Years of coursework represented
- **3** API providers for execution
- **6** Custom canvas animations
- **1000+** Lines of carefully crafted code

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs
- Suggest new features
- Share your own educational coding projects
- Fork and adapt for your own portfolio

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Connect

Created by **Maximiliano Garcia**

- Portfolio: [maxgarcia642.github.io](https://maxgarcia642.github.io/)
- LinkedIn: [Maximiliano Garcia](https://www.linkedin.com/in/maximiliano-garcia642/)

## 🙏 Acknowledgments

- My computer science teachers who assigned these original projects
- The Matrix movie for the aesthetic inspiration
- CodeMirror team for the excellent editor
- Piston API for free code execution
- Supabase for serverless infrastructure

---

**Built with 💚 and lots of nostalgia**

*"The Matrix is everywhere. It is all around us. Even now, in this very code."*
