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

window.dust = window.dust || {};
dust.rubikube = dust.rubikube || {};

dust.rubikube.CubeMove = {
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

dust.rubikube.CubeMove.toString = function (moveId) {
    switch (moveId) {
        case dust.rubikube.CubeMove.left:
            return "L";

        case dust.rubikube.CubeMove.leftInverse:
            return "L'";

        case dust.rubikube.CubeMove.right:
            return "R";

        case dust.rubikube.CubeMove.rightInverse:
            return "R'";

        case dust.rubikube.CubeMove.up:
            return "U";

        case dust.rubikube.CubeMove.upInverse:
            return "U'";

        case dust.rubikube.CubeMove.down:
            return "D";

        case dust.rubikube.CubeMove.downInverse:
            return "D'";

        case dust.rubikube.CubeMove.front:
            return "F";

        case dust.rubikube.CubeMove.frontInverse:
            return "F'";

        case dust.rubikube.CubeMove.back:
            return "B";

        case dust.rubikube.CubeMove.backInverse:
            return "B'";

        case dust.rubikube.CubeMove.turnLeft:
            return "\u25C0";

        case dust.rubikube.CubeMove.turnRight:
            return "\u25B6";

        case dust.rubikube.CubeMove.turnUp:
            return "\u25B2";

        case dust.rubikube.CubeMove.turnDown:
            return "\u25BC";

        default:
            return "?";
    }
};

dust.rubikube.CubeMove.parse = function (str) {
    var moves = [];
    var items = str.split(" ");

    for (var i = 0; i < items.length; i++) {
        switch (items[i].toLowerCase()) {
            case "l":
                moves.push(dust.rubikube.CubeMove.left);
                break;

            case "l'":
                moves.push(dust.rubikube.CubeMove.leftInverse);
                break;

            case "l2":
                moves.push(dust.rubikube.CubeMove.left);
                moves.push(dust.rubikube.CubeMove.left);
                break;

            case "r":
                moves.push(dust.rubikube.CubeMove.right);
                break;

            case "r'":
                moves.push(dust.rubikube.CubeMove.rightInverse);
                break;

            case "r2":
                moves.push(dust.rubikube.CubeMove.right);
                moves.push(dust.rubikube.CubeMove.right);
                break;

            case "u":
                moves.push(dust.rubikube.CubeMove.up);
                break;

            case "u'":
                moves.push(dust.rubikube.CubeMove.upInverse);
                break;

            case "u2":
                moves.push(dust.rubikube.CubeMove.up);
                moves.push(dust.rubikube.CubeMove.up);
                break;

            case "d":
                moves.push(dust.rubikube.CubeMove.down);
                break;

            case "d'":
                moves.push(dust.rubikube.CubeMove.downInverse);
                break;

            case "d2":
                moves.push(dust.rubikube.CubeMove.down);
                moves.push(dust.rubikube.CubeMove.down);
                break;

            case "f":
                moves.push(dust.rubikube.CubeMove.front);
                break;

            case "f'":
                moves.push(dust.rubikube.CubeMove.frontInverse);
                break;

            case "f2":
                moves.push(dust.rubikube.CubeMove.front);
                moves.push(dust.rubikube.CubeMove.front);
                break;

            case "b":
                moves.push(dust.rubikube.CubeMove.back);
                break;

            case "b'":
                moves.push(dust.rubikube.CubeMove.backInverse);
                break;

            case "b2":
                moves.push(dust.rubikube.CubeMove.back);
                moves.push(dust.rubikube.CubeMove.back);
                break;

            case "\u25C0": // left arrow
                moves.push(dust.rubikube.CubeMove.turnLeft);
                break;

            case "\u25B6": // right arrow
                moves.push(dust.rubikube.CubeMove.turnRight);
                break;

            case "\u25B2": // up arrow
                moves.push(dust.rubikube.CubeMove.turnUp);
                break;

            case "\u25BC": // down arrow
                moves.push(dust.rubikube.CubeMove.turnDown);
                break;

            default:
                moves.push(dust.rubikube.CubeMove.none);
                break;
        }
    }

    return moves;
};

dust.rubikube.CubeMove.inverse = function (moveId) {
    switch (moveId) {
        case dust.rubikube.CubeMove.left:
            return dust.rubikube.CubeMove.leftInverse;

        case dust.rubikube.CubeMove.leftInverse:
            return dust.rubikube.CubeMove.left;

        case dust.rubikube.CubeMove.right:
            return dust.rubikube.CubeMove.rightInverse;

        case dust.rubikube.CubeMove.rightInverse:
            return dust.rubikube.CubeMove.right;

        case dust.rubikube.CubeMove.up:
            return dust.rubikube.CubeMove.upInverse;

        case dust.rubikube.CubeMove.upInverse:
            return dust.rubikube.CubeMove.up;

        case dust.rubikube.CubeMove.down:
            return dust.rubikube.CubeMove.downInverse;

        case dust.rubikube.CubeMove.downInverse:
            return dust.rubikube.CubeMove.down;

        case dust.rubikube.CubeMove.front:
            return dust.rubikube.CubeMove.frontInverse;

        case dust.rubikube.CubeMove.frontInverse:
            return dust.rubikube.CubeMove.front;

        case dust.rubikube.CubeMove.back:
            return dust.rubikube.CubeMove.backInverse;

        case dust.rubikube.CubeMove.backInverse:
            return dust.rubikube.CubeMove.back;

        case dust.rubikube.CubeMove.turnLeft:
            return dust.rubikube.CubeMove.turnRight;

        case dust.rubikube.CubeMove.turnRight:
            return dust.rubikube.CubeMove.turnLeft;

        case dust.rubikube.CubeMove.turnUp:
            return dust.rubikube.CubeMove.turnDown;

        case dust.rubikube.CubeMove.turnDown:
            return dust.rubikube.CubeMove.turnUp;

        default:
            return dust.rubikube.CubeMove.none;
    }
}