# ♠️ Blackjack Game Online | Master Your Strategy

[![Live Demo] [Change to deployed URL]]

## Project Overview

Welcome to Blackjack Game Online, a sophisticated and interactive web-based simulation of the classic casino card game, Twenty-One. This project was developed as a hands-on learning experience and a core addition to my portfolio, showcasing my proficiency in modern front-end development technologies and best practices.

Experience the thrill of outsmarting the dealer in a beautifully designed, responsive environment!

## Live Demo

Experience the game live and test your skills:

👉 **[Play Blackjack Online Here!]( [Change to deployed URL])**

## Features

This Blackjack game offers a robust set of features designed for a engaging and intuitive user experience:

- **Interactive Gameplay:** Full implementation of core Blackjack rules including Hit, Stand.
- **Dynamic Betting System:** Place bets using virtual chips, with accurate tracking of player's balance and payouts.
- **Intelligent Dealer AI:** Dealer adheres to standard casino rules (hits on 16 or less, stands on 17 or more).
- **Clear Game State:** Real-time display of player and dealer scores, game messages (Blackjack, Bust, Win, Lose, Push), and current bet.
- **Responsive Design:** Seamlessly adapts to various screen sizes, offering an optimal playing experience on desktop, tablet, and mobile devices.
- **Custom Theming:** A unique, casino-inspired color palette utilizing modern Oklch values for perceptually uniform colors, paired with custom typography.
- **Enhanced User Interface:** Intuitive controls and clear visual feedback for game actions.
- **Basic SEO & Social Sharing:** Configured with essential meta tags (`<title>`, `<meta name="description">`, Open Graph, Twitter Cards) for improved discoverability and compelling social media previews.
- **Custom Favicon:** A thematic card suit icon for brand recognition in browser tabs.

## Technologies Used

This project leverages a modern and robust front-end stack:

- **React:** A declarative, component-based JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing, improving code quality and maintainability.
- **Tailwind CSS:** A highly customizable, utility-first CSS framework for rapid UI development, configured with custom colors (Oklch) and font families.
- **Vite:** A fast build tool that significantly improves the development experience for modern web projects.
- **npm / Yarn:** For package management.

## Installation & Local Setup

To get a local copy of the project up and running on your machine for development or testing, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SantiG11/blackjack.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install  # or yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev  # or yarn dev
    ```
4.  **Open your browser:**
    The application will typically be available at `http://localhost:5173` (or the port specified in your terminal).

## How to Play

1.  **Place Your Bet:** Use the chip buttons to select your desired bet amount.
2.  **Deal Cards:** Click the "Deal" button to start a new round.
3.  **Player's Turn:**
    - **Hit:** Take another card.
    - **Stand:** End your turn.
4.  **Dealer's Turn:** After your turn, the dealer will reveal their hidden card and hit or stand based on standard rules.
5.  **Results:** The game will determine the winner, update your balance, and prompt you to play another round.
6.  **Reset Money:** If you run out of money, a "Reset Money" option will appear to allow you to continue playing.

## Screenshots

### Desktop View

![Desktop Screenshot of Blackjack Game] [Change to deployed image URL path ]

### Mobile View

![Mobile Screenshot of Blackjack Game][Change to deployed image URL path ]

## Challenges & Learnings

Developing this Blackjack game provided invaluable experience and presented several interesting challenges, leading to significant learning outcomes:

- **Complex State Management with React Hooks:** Managing the intricate state of a card game (player hands, dealer hand, deck, bets, game phase, scores) required careful planning. I leveraged custom React Hooks (e.g., `useBlackjackGame`).
- **Dynamic Tailwind CSS Class Generation:** Understanding how Tailwind's JIT compiler processes dynamically generated class names (e.g., for custom Oklch colors or specific chip styles) was crucial. I ensured the `tailwind.config.js` `content` array correctly scanned relevant files to allow for dynamic styling based on game logic.
- **Responsive UI Design:** Adapting the game's layout and controls to provide an optimal experience across a wide range of devices (from large desktops to small mobile phones) was a primary focus, extensively utilizing Tailwind's responsive utility classes.
- **Implementing Core Game Logic:** Translating nuanced Blackjack rules (like splits, double downs, and specific dealer behavior) into robust and bug-free code required meticulous attention to detail and careful logical structuring.
- **Front-End SEO Fundamentals:** Gained practical experience in configuring essential meta tags in `index.html` (Title, Meta Description, Open Graph, Twitter Cards) to enhance search engine visibility and improve social media sharing previews.

## Future Enhancements

I am committed to continuously improving this project and expanding my skills. Upcoming enhancements include:

- **Comprehensive Testing:** Implementing unit and integration tests using **Jest** and **React Testing Library** to ensure the reliability and correctness of game logic and component behavior.
- **Keyboard usage:** The player will be able to use the keyboard to play the game.
- **Animations:** Adding subtle animations for card dealing, chip betting, and score updates to further enhance the game's visual appeal and user experience.
- **Sound Effects:** Incorporating appropriate sound cues for key game events (e.g., card dealt, win/lose) to boost immersion.
- **Advanced Game Features:** Exploring options like split, double down, insurance, surrender, or multi-player capabilities.
