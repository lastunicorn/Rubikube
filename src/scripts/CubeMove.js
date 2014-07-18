// Rubikube
// Copyright (C) 2014 Dust in the Wind
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

window.lu = window.lu || {};
lu.rubikube = lu.rubikube || {};

lu.rubikube.CubeMove = {
    none: 0,
    left: 1,
    leftInverse: 2,
    right: 3,
    rightInverse: 4,
    up: 5,
    upInverse: 6,
    down: 7,
    downInverse: 8,
    front: 9,
    frontInverse: 10,
    back: 11,
    backInverse: 12,
    turnLeft: 13,
    turnRight: 14,
    turnUp: 15,
    turnDown: 16
};

lu.rubikube.CubeMove.toString = function (moveId) {
    switch (moveId) {
        case lu.rubikube.CubeMove.left:
            return "L";

        case lu.rubikube.CubeMove.leftInverse:
            return "L'";

        case lu.rubikube.CubeMove.right:
            return "R";

        case lu.rubikube.CubeMove.rightInverse:
            return "R'";

        case lu.rubikube.CubeMove.up:
            return "U";

        case lu.rubikube.CubeMove.upInverse:
            return "U'";

        case lu.rubikube.CubeMove.down:
            return "D";

        case lu.rubikube.CubeMove.downInverse:
            return "D'";

        case lu.rubikube.CubeMove.front:
            return "F";

        case lu.rubikube.CubeMove.frontInverse:
            return "F'";

        case lu.rubikube.CubeMove.back:
            return "B";

        case lu.rubikube.CubeMove.backInverse:
            return "B'";

        case lu.rubikube.CubeMove.turnLeft:
            return "\u25C0";

        case lu.rubikube.CubeMove.turnRight:
            return "\u25B6";

        case lu.rubikube.CubeMove.turnUp:
            return "\u25B2";

        case lu.rubikube.CubeMove.turnDown:
            return "\u25BC";

        default:
            return "?";
    }
};

lu.rubikube.CubeMove.parse = function (str) {
    var moves = [];
    var items = str.split(" ");

    for (var i = 0; i < items.length; i++) {
        switch (items[i].toLowerCase()) {
            case "l":
                moves.push(lu.rubikube.CubeMove.left);
                break;

            case "l'":
                moves.push(lu.rubikube.CubeMove.leftInverse);
                break;

            case "l2":
                moves.push(lu.rubikube.CubeMove.left);
                moves.push(lu.rubikube.CubeMove.left);
                break;

            case "r":
                moves.push(lu.rubikube.CubeMove.right);
                break;

            case "r'":
                moves.push(lu.rubikube.CubeMove.rightInverse);
                break;

            case "r2":
                moves.push(lu.rubikube.CubeMove.right);
                moves.push(lu.rubikube.CubeMove.right);
                break;

            case "u":
                moves.push(lu.rubikube.CubeMove.up);
                break;

            case "u'":
                moves.push(lu.rubikube.CubeMove.upInverse);
                break;

            case "u2":
                moves.push(lu.rubikube.CubeMove.up);
                moves.push(lu.rubikube.CubeMove.up);
                break;

            case "d":
                moves.push(lu.rubikube.CubeMove.down);
                break;

            case "d'":
                moves.push(lu.rubikube.CubeMove.downInverse);
                break;

            case "d2":
                moves.push(lu.rubikube.CubeMove.down);
                moves.push(lu.rubikube.CubeMove.down);
                break;

            case "f":
                moves.push(lu.rubikube.CubeMove.front);
                break;

            case "f'":
                moves.push(lu.rubikube.CubeMove.frontInverse);
                break;

            case "f2":
                moves.push(lu.rubikube.CubeMove.front);
                moves.push(lu.rubikube.CubeMove.front);
                break;

            case "b":
                moves.push(lu.rubikube.CubeMove.back);
                break;

            case "b'":
                moves.push(lu.rubikube.CubeMove.backInverse);
                break;

            case "b2":
                moves.push(lu.rubikube.CubeMove.back);
                moves.push(lu.rubikube.CubeMove.back);
                break;

            case "\u25C0": // left arrow
                moves.push(lu.rubikube.CubeMove.turnLeft);
                break;

            case "\u25B6": // right arrow
                moves.push(lu.rubikube.CubeMove.turnRight);
                break;

            case "\u25B2": // up arrow
                moves.push(lu.rubikube.CubeMove.turnUp);
                break;

            case "\u25BC": // down arrow
                moves.push(lu.rubikube.CubeMove.turnDown);
                break;

            default:
                moves.push(lu.rubikube.CubeMove.none);
                break;
        }
    }

    return moves;
};

lu.rubikube.CubeMove.inverse = function (moveId) {
    switch (moveId) {
        case lu.rubikube.CubeMove.left:
            return lu.rubikube.CubeMove.leftInverse;

        case lu.rubikube.CubeMove.leftInverse:
            return lu.rubikube.CubeMove.left;

        case lu.rubikube.CubeMove.right:
            return lu.rubikube.CubeMove.rightInverse;

        case lu.rubikube.CubeMove.rightInverse:
            return lu.rubikube.CubeMove.right;

        case lu.rubikube.CubeMove.up:
            return lu.rubikube.CubeMove.upInverse;

        case lu.rubikube.CubeMove.upInverse:
            return lu.rubikube.CubeMove.up;

        case lu.rubikube.CubeMove.down:
            return lu.rubikube.CubeMove.downInverse;

        case lu.rubikube.CubeMove.downInverse:
            return lu.rubikube.CubeMove.down;

        case lu.rubikube.CubeMove.front:
            return lu.rubikube.CubeMove.frontInverse;

        case lu.rubikube.CubeMove.frontInverse:
            return lu.rubikube.CubeMove.front;

        case lu.rubikube.CubeMove.back:
            return lu.rubikube.CubeMove.backInverse;

        case lu.rubikube.CubeMove.backInverse:
            return lu.rubikube.CubeMove.back;

        case lu.rubikube.CubeMove.turnLeft:
            return lu.rubikube.CubeMove.turnRight;

        case lu.rubikube.CubeMove.turnRight:
            return lu.rubikube.CubeMove.turnLeft;

        case lu.rubikube.CubeMove.turnUp:
            return lu.rubikube.CubeMove.turnDown;

        case lu.rubikube.CubeMove.turnDown:
            return lu.rubikube.CubeMove.turnUp;

        default:
            return lu.rubikube.CubeMove.none;
    }
}