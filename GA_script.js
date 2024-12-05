// Chessboard and game state
const piecePosition = {};
const moves = [];
let currentMoveIndex = 0;

// Chessboard setup
function setupBoard() {
    const chessboard = document.getElementById("chessboard");
    chessboard.innerHTML = ""; // Clear previous board
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement("div");
            const file = String.fromCharCode(97 + j); // 'a' to 'h'
            const rank = 8 - i; // '8' to '1'
            square.id = `${file}${rank}`;
            chessboard.appendChild(square);
        }
    }
}

// Initialize pieces with the correct image folder and naming convention
function initializePieces() {
    const initialPosition = {
        a2: "Wpawn", b2: "Wpawn", c2: "Wpawn", d2: "Wpawn", e2: "Wpawn", f2: "Wpawn", g2: "Wpawn", h2: "Wpawn",
        a7: "Bpawn", b7: "Bpawn", c7: "Bpawn", d7: "Bpawn", e7: "Bpawn", f7: "Bpawn", g7: "Bpawn", h7: "Bpawn",
        a1: "Wrook", b1: "Wknight", c1: "Wbishop", d1: "Wqueen", e1: "Wking", f1: "Wbishop", g1: "Wknight", h1: "Wrook",
        a8: "Brook", b8: "Bknight", c8: "Bbishop", d8: "Bqueen", e8: "Bking", f8: "Bbishop", g8: "Bknight", h8: "Brook"
    };

    Object.assign(piecePosition, initialPosition);

    Object.entries(initialPosition).forEach(([position, piece]) => {
        const square = document.getElementById(position);
        if (square) {
            const img = document.createElement("img");
            img.src = `photo/${piece}.png`;
            img.style.width = "45px";
            img.style.height = "45px";
            square.appendChild(img);
        }
    });
}

// Move a piece on the board
function movePiece(from, to) {
    const fromSquare = document.getElementById(from);
    const toSquare = document.getElementById(to);

    if (fromSquare && toSquare) {
        const piece = fromSquare.querySelector("img");
        if (piece) {
            toSquare.appendChild(piece);
            fromSquare.innerHTML = ""; // Clear the source square
            piecePosition[to] = piecePosition[from];
            delete piecePosition[from];
        }
    }
}

// Parse PGN
function parsePGN(pgn) {
    const parsedMoves = [];
    pgn.split("\n").forEach((line) => {
        const match = line.match(/\d+\.\s*([^\s]+)\s*([^\s]+)/);
        if (match) {
            const [, whiteMove, blackMove] = match;
            parsedMoves.push(whiteMove, blackMove);
        }
    });
    return parsedMoves.filter(Boolean); // Remove empty moves
}

// Process a single move
function processNextMove() {
    if (currentMoveIndex >= moves.length) {
        document.getElementById("analysisOutput").innerText = "All moves processed.";
        return;
    }

    const move = moves[currentMoveIndex];
    let moveEvaluation;

    // First 10 moves are labeled as "Opening move"
    if (currentMoveIndex < 5) {
        moveEvaluation = "Opening move";
    } else {
        // Randomly evaluate as "Good move" or "Bad move"
        moveEvaluation = Math.random() > 0.5 ? "Good move" : "Bad move";
    }

    // Update the board (assuming PGN format "e2e4")
    const [from, to] = [move.slice(0, 2), move.slice(2)];
    movePiece(from, to);

    // Update the output and move index
    const output = document.getElementById("analysisOutput");
    output.innerHTML += `<p>Move ${currentMoveIndex + 1}: ${move} - ${moveEvaluation}</p>`;
    currentMoveIndex++;
}

// Analyze all moves
function analyzeAll() {
    while (currentMoveIndex < moves.length) {
        processNextMove();
    }
}

// Load PGN and reset the board
document.getElementById("loadPGN").addEventListener("click", () => {
    const pgnInput = document.getElementById("pgnInput").value;
    moves.length = 0; // Clear previous moves
    moves.push(...parsePGN(pgnInput));
    currentMoveIndex = 0;
    setupBoard();
    initializePieces();
});

// Event listeners for buttons
document.getElementById("nextMove").addEventListener("click", processNextMove);
document.getElementById("analyzeAll").addEventListener("click", analyzeAll);

// Initialize the board on page load
setupBoard();
initializePieces();
