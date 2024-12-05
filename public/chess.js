
// const piecePosition = {
//     a2: "Wpawn", b2: "Wpawn", c2: "Wpawn", d2: "Wpawn", e2: "Wpawn", f2: "Wpawn", g2: "Wpawn", h2: "Wpawn",
//     a7: "Bpawn", b7: "Bpawn", c7: "Bpawn", d7: "Bpawn", e7: "Bpawn", f7: "Bpawn", g7: "Bpawn", h7: "Bpawn",
//     a1: "Wrook", b1: "Wknight", c1: "Wbishop", d1: "Wqueen", e1: "Wking", f1: "Wbishop", g1: "Wknight", h1: "Wrook",
//     a8: "Brook", b8: "Bknight", c8: "Bbishop", d8: "Bqueen", e8: "Bking", f8: "Bbishop", g8: "Bknight", h8: "Brook"
//   };
  
//   // PGN moves (dummy data)
//   const pgnMoves = [
//   "1. h3 e5",
//         "2. c4 c6",
//         "3. d4 e4",
//         "4. d5 Nf6",
//         "5. Nc3 Bb4",
//         "6. Bd2 d6",
//         "7. e3 O-O",
//         "8. Nxe4 Nxe4",
//         "9. Bxb4 Qf6",
//         "10. Qc2 cxd5",
//         "11. cxd5 Bf5",
//         "12. Bc3 Nxc3",
//         "13. Qxc3 Qxc3+",
//         "14. bxc3 Rc8",
//         "15. c4 Nd7",
//         "16. Nf3 g6",
//         "17. Nd2 Nc5",
//         "18. f3 Rc7",
//         "19. e4 Bd7",
//         "20. Nb3 Na4",
//         "21. Be2 Kg7",
//         "22. Kd2 b6",
//         "23. Rhc1 Rac8",
//         "24. f4 Nb2",
//         "25. c5 bxc5",
//         "26. Ba6 Rd8",
//         "27. Rab1 Na4",
//         "28. Na5 Nb6",
//         "29. Nb7 Rf8",
//         "30. Nxd6 f5",
//         "31. Nb5 Bxb5",
//         "32. Rxb5 fxe4",
//         "33. Rbxc5 e3+",
//         "34. Ke2 Rxc5",
//         "35. Rxc5 Rxf4",
//         "36. Rc7+ Kf6",
//         "37. d6 Rd4",
//         "38. Rxa7 Rxd6",
//         "39. Kxe3 Nd5+",
//         "40. Kf2 Nc3",
//         "41. Bc4 Rd4",
//         "42. Bb3 Rd2+",
//         "43. Kf3 Rd3+",
//         "44. Kf2 Rd2+",
//         "45. Kf1 h5",
//         "46. Rc7 Ne4",
//         "47. Rc2 Ng3+",
//         "48. Ke1 Rd3",
//         "49. Rf2+ Kg5",
//         "50. Bc2 Rc3",
//         "51. Kd2 Ra3",
//         "52. Bb1 Ra5",
//         "53. Rf3 h4",
//         "54. Rb3 Nh5",
//         "55. Rb4 Nf4",
//         "56. a4 Rd5+",
//         "57. Kc3 Rd1",
//         "58. Be4 Re1",
//         "59. Bf3 Re3+",
//         "60. Kc4"
//   ];
  
//   let parsedMoves = [];
  
//   // Step 1: Parse PGN moves
//   function parsePGN(pgnMoves) {
//     const moves = [];
//     pgnMoves.forEach((line) => {
//       const match = line.match(/\d+\.\s*([^\s]+)\s*([^\s]+)/);
//       if (match) {
//         const [, whiteMove, blackMove] = match;
//         moves.push({ color: "white", notation: whiteMove });
//         moves.push({ color: "black", notation: blackMove });
//       }
//     });
//     return moves;
//   }
  
//   // Step 2: Decode PGN move
//   function decodeMove(move) {
// if (move === "O-O") return { piece: "king", special: "kingside_castling" };
// if (move === "O-O-O") return { piece: "king", special: "queenside_castling" };

// const match = move.match(/([KQRBN])?([a-h]?[1-8]?)?x?([a-h][1-8])=?([QRBN])?/);
// if (!match) {
// console.error(`Invalid move notation: ${move}`);
// return null;
// }

// const [, pieceSymbol, disambiguation, targetSquare, promotion] = match;
// const piece = pieceSymbol
// ? { K: "king", Q: "queen", R: "rook", B: "bishop", N: "knight" }[pieceSymbol]
// : "pawn";

// const isCapture = move.includes("x");

// return { piece, disambiguation, targetSquare, promotion, isCapture };
// }

// function isCaptureValid(from, to, color) {
// const targetPiece = piecePosition[to];
// if (!targetPiece) {
// console.error(`Capture invalid: Target square ${to} is empty.`);
// return false;
// }

// const opponentColor = color === "white" ? "B" : "W";
// if (!targetPiece.startsWith(opponentColor)) {
// console.error(`Capture invalid: Target piece ${targetPiece} is not an opponent's.`);
// return false;
// }

// return true;
// }



  

// function performCastling(color, side) {
// const kingStart = color === "white" ? "e1" : "e8";
// const rookStart = color === "white" ? (side === "kingside" ? "h1" : "a1") : (side === "kingside" ? "h8" : "a8");
// const kingEnd = color === "white" ? (side === "kingside" ? "g1" : "c1") : (side === "kingside" ? "g8" : "c8");
// const rookEnd = color === "white" ? (side === "kingside" ? "f1" : "d1") : (side === "kingside" ? "f8" : "d8");

// // Check that the king and rook are in their starting positions
// if (piecePosition[kingStart] !== `${color[0].toUpperCase()}king` || piecePosition[rookStart] !== `${color[0].toUpperCase()}rook`) {
// console.error(`${color} cannot castle ${side}: King or rook not in starting position.`);
// return false;
// }

// // Check that the squares between the king and rook are empty
// const intermediateSquares = side === "kingside"
// ? [kingStart[0] + (parseInt(kingStart[1], 10) + 1), kingEnd]
// : [kingStart[0] + (parseInt(kingStart[1], 10) - 1), kingEnd];
// for (const square of intermediateSquares) {
// if (piecePosition[square]) {
//   console.error(`${color} cannot castle ${side}: Squares between king and rook are not empty.`);
//   return false;
// }
// }

// // Perform the castling move
// movePiece(kingStart, kingEnd);
// movePiece(rookStart, rookEnd);
// console.log(`${color} castled ${side}`);
// return true;
// }

//   // Step 3: Find the correct piece to move
//   function findPieceToMove(piece, targetSquare, color, disambiguation) {
//     const possiblePieces = Object.entries(piecePosition).filter(([position, pieceType]) => {
//       return pieceType === `${color[0].toUpperCase()}${piece}`;
//     });
  
//     for (const [position] of possiblePieces) {
//       if (isValidMove(piece, position, targetSquare, color)) {
//         return position;
//       }
//     }
  
//     return null;
//   }
  
//   // Step 4: Validate movement rules
//   function isValidMove(piece, from, to, color) {
//     const fromFile = from[0];
//     const fromRank = parseInt(from[1], 10);
//     const toFile = to[0];
//     const toRank = parseInt(to[1], 10);
  
//     switch (piece) {
//       case "pawn":
//         const direction = color === "white" ? 1 : -1;
//         if (fromFile === toFile && toRank === fromRank + direction) return true;
//         if (fromFile === toFile && toRank === fromRank + 2 * direction && (fromRank === 2 || fromRank === 7)) return true;
//         if (Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) === 1 && toRank === fromRank + direction) return true;
//         break;
//       case "knight":
//         if ((Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) === 2 && Math.abs(fromRank - toRank) === 1) ||
//             (Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) === 1 && Math.abs(fromRank - toRank) === 2)) return true;
//         break;
//       case "bishop":
//         if (Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) === Math.abs(fromRank - toRank)) return true;
//         break;
//       case "rook":
//         if (fromFile === toFile || fromRank === toRank) return true;
//         break;
//       case "queen":
//         if (fromFile === toFile || fromRank === toRank ||
//             Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) === Math.abs(fromRank - toRank)) return true;
//         break;
//       case "king":
//         if (Math.abs(fromFile.charCodeAt(0) - toFile.charCodeAt(0)) <= 1 && Math.abs(fromRank - toRank) <= 1) return true;
//         break;
//     }
  
//     return false;
//   }
  
//   // Step 5: Move piece on the board
//   function movePiece(from, to) {
//     const fromCell = document.querySelector(`[data-position="${from}"]`);
//     const toCell = document.querySelector(`[data-position="${to}"]`);
  
//     if (fromCell && toCell) {
//       const img = fromCell.querySelector("img");
  
//       if (img) {
//         toCell.appendChild(img);
//         fromCell.innerHTML = "";
//         piecePosition[to] = piecePosition[from];
//         delete piecePosition[from];
//       }
//     }
//   }
  
//   // Step 6: Process the next move
//   function processNextMove() {
// if (parsedMoves.length === 0) {
// console.log("No more moves to process.");
// return;
// }

// const { color, notation } = parsedMoves.shift();
// const { piece, targetSquare, disambiguation, isCapture } = decodeMove(notation);

// if (isCapture) {
// const from = findPieceToMove(piece, targetSquare, color, disambiguation);

// if (from && isCaptureValid(from, targetSquare, color)) {
//   movePiece(from, targetSquare); // Move the capturing piece
//   console.log(`${color} ${piece} captured on ${targetSquare}`);
// } else {
//   console.error(`Capture move ${notation} is invalid.`);
// }
// } else {
// const from = findPieceToMove(piece, targetSquare, color, disambiguation);
// if (from) {
//   movePiece(from, targetSquare);
//   console.log(`${color} ${piece} moved from ${from} to ${targetSquare}`);
// } else {
//   console.error(`Move ${notation} is invalid.`);
// }
// }
// }


  
//   // Step 7: Initialize the board
//   function setupBoard() {
//     const chessTable = document.createElement("table");
  
//     for (let i = 0; i < 8; i++) {
//       const tr = document.createElement("tr");
//       for (let j = 0; j < 8; j++) {
//         const td = document.createElement("td");
//         td.dataset.position = `${String.fromCharCode(97 + j)}${8 - i}`;
//         td.style.backgroundColor = (i + j) % 2 === 0 ? "white" : "black";
//         td.style.width = "50px";
//         td.style.height = "50px";
//         td.style.textAlign = "center";
//         td.style.border = "1px solid gray";
  
//         tr.appendChild(td);
//       }
//       chessTable.appendChild(tr);
//     }
  
//     document.body.appendChild(chessTable);
//   }
  
//   function initializePieces() {
//     Object.entries(piecePosition).forEach(([position, piece]) => {
//       const cell = document.querySelector(`[data-position="${position}"]`);
//       if (cell) {
//         const img = document.createElement("img");
//         img.src = `photo/${piece}.png`;
//         img.style.width = "45px";
//         img.style.height = "45px";
//         cell.appendChild(img);
//       }
//     });
//   }
  
//   // Initialize everything
//   setupBoard();
//   initializePieces();
//   parsedMoves = parsePGN(pgnMoves);
  
//   document.getElementById("processMoveButton").addEventListener("click", processNextMove);
  
