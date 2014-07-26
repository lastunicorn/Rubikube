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

    // rotates the left face clockwise
    left: 1,

    // rotates the left face counter-clockwise
    leftInverse: 2,

    // rotates the right face clockwise
    right: 3,

    // rotates the right face counter-clockwise
    rightInverse: 4,

    // rotates the up face clockwise
    up: 5,

    // rotates the up face counter-clockwise
    upInverse: 6,

    // rotates the down face clockwise
    down: 7,

    // rotates the down face counter-clockwise
    downInverse: 8,

    // rotates the front face clockwise
    front: 9,

    // rotates the front face counter-clockwise
    frontInverse: 10,

    // rotates the back face clockwise
    back: 11,

    // rotates the back face counter-clockwise
    backInverse: 12,

    // rotates the whole cube clockwise on the right face (on the x axis)
    turnX: 13,

    // rotates the whole cube counter-clockwise on the right face (on the x axis)
    turnXi: 14,

    // rotates the whole cube clockwise on the up face (on the y axis)
    turnY: 15,

    // rotates the whole cube counter-clockwise on the up face (on the y axis)
    turnYi: 16,

    // rotates the whole cube clockwise on the front face (on the z axis)
    turnZ: 17,

    // rotates the whole cube counter-clockwise on the front face (on the z axis)
    turnZi: 18
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

        case dust.rubikube.CubeMove.turnX:
            //return "\u25B2";
            return "X";

        case dust.rubikube.CubeMove.turnXi:
            //return "\u25BC";
            return "X'";

        case dust.rubikube.CubeMove.turnY:
            //return "\u25C0";
            return "Y";

        case dust.rubikube.CubeMove.turnYi:
            //return "\u25B6";
            return "Y'";

        case dust.rubikube.CubeMove.turnZ:
            return "Z";

        case dust.rubikube.CubeMove.turnZi:
            return "Z'";

        default:
            return "?";
    }
};

dust.rubikube.CubeMove.parse = function (str) {
    var moves = [];
    var items = str.split(" ");

    for (var i = 0; i < items.length; i++) {
        switch (items[i].toUpperCase()) {
            case "L":
                moves.push(dust.rubikube.CubeMove.left);
                break;

            case "L'":
                moves.push(dust.rubikube.CubeMove.leftInverse);
                break;

            case "L2":
                moves.push(dust.rubikube.CubeMove.left);
                moves.push(dust.rubikube.CubeMove.left);
                break;

            case "R":
                moves.push(dust.rubikube.CubeMove.right);
                break;

            case "R'":
                moves.push(dust.rubikube.CubeMove.rightInverse);
                break;

            case "R2":
                moves.push(dust.rubikube.CubeMove.right);
                moves.push(dust.rubikube.CubeMove.right);
                break;

            case "U":
                moves.push(dust.rubikube.CubeMove.up);
                break;

            case "U'":
                moves.push(dust.rubikube.CubeMove.upInverse);
                break;

            case "U2":
                moves.push(dust.rubikube.CubeMove.up);
                moves.push(dust.rubikube.CubeMove.up);
                break;

            case "D":
                moves.push(dust.rubikube.CubeMove.down);
                break;

            case "D'":
                moves.push(dust.rubikube.CubeMove.downInverse);
                break;

            case "D2":
                moves.push(dust.rubikube.CubeMove.down);
                moves.push(dust.rubikube.CubeMove.down);
                break;

            case "F":
                moves.push(dust.rubikube.CubeMove.front);
                break;

            case "F'":
                moves.push(dust.rubikube.CubeMove.frontInverse);
                break;

            case "F2":
                moves.push(dust.rubikube.CubeMove.front);
                moves.push(dust.rubikube.CubeMove.front);
                break;

            case "B":
                moves.push(dust.rubikube.CubeMove.back);
                break;

            case "B'":
                moves.push(dust.rubikube.CubeMove.backInverse);
                break;

            case "B2":
                moves.push(dust.rubikube.CubeMove.back);
                moves.push(dust.rubikube.CubeMove.back);
                break;

            case "X":
                moves.push(dust.rubikube.CubeMove.turnX);
                break;

            case "X'":
                moves.push(dust.rubikube.CubeMove.turnXi);
                break;

            case "X2":
                moves.push(dust.rubikube.CubeMove.turnX);
                moves.push(dust.rubikube.CubeMove.turnX);
                break;

            case "Y":
                moves.push(dust.rubikube.CubeMove.turnY);
                break;

            case "Y'":
                moves.push(dust.rubikube.CubeMove.turnYi);
                break;

            case "Y2":
                moves.push(dust.rubikube.CubeMove.turnY);
                moves.push(dust.rubikube.CubeMove.turnY);
                break;

            case "Z":
                moves.push(dust.rubikube.CubeMove.turnZ);
                break;

            case "Z'":
                moves.push(dust.rubikube.CubeMove.turnZi);
                break;

            case "Z2":
                moves.push(dust.rubikube.CubeMove.turnZ);
                moves.push(dust.rubikube.CubeMove.turnZ);
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

        case dust.rubikube.CubeMove.turnX:
            return dust.rubikube.CubeMove.turnXi;

        case dust.rubikube.CubeMove.turnXi:
            return dust.rubikube.CubeMove.turnX;

        case dust.rubikube.CubeMove.turnY:
            return dust.rubikube.CubeMove.turnYi;

        case dust.rubikube.CubeMove.turnYi:
            return dust.rubikube.CubeMove.turnY;

        case dust.rubikube.CubeMove.turnZ:
            return dust.rubikube.CubeMove.turnZi;

        case dust.rubikube.CubeMove.turnZi:
            return dust.rubikube.CubeMove.turnZ;

        default:
            return dust.rubikube.CubeMove.none;
    }
}