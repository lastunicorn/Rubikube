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
dust.rubikube.singmaster = dust.rubikube.singmaster || {};

dust.rubikube.singmaster.SingmasterNotation = {};

dust.rubikube.singmaster.SingmasterNotation.toString = function (moveId) {
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

        case dust.rubikube.CubeMove.turnXInverse:
            //return "\u25BC";
            return "X'";

        case dust.rubikube.CubeMove.turnY:
            //return "\u25C0";
            return "Y";

        case dust.rubikube.CubeMove.turnYInverse:
            //return "\u25B6";
            return "Y'";

        case dust.rubikube.CubeMove.turnZ:
            return "Z";

        case dust.rubikube.CubeMove.turnZInverse:
            return "Z'";

        case dust.rubikube.CubeMove.middle:
            return "M";

        case dust.rubikube.CubeMove.middleInverse:
            return "M'";

        case dust.rubikube.CubeMove.equator:
            return "E";

        case dust.rubikube.CubeMove.equatorInverse:
            return "E'";

        case dust.rubikube.CubeMove.standing:
            return "S";

        case dust.rubikube.CubeMove.standingInverse:
            return "S'";

        default:
            return "?";
    }
};

dust.rubikube.singmaster.SingmasterNotation.parse = function (str) {
    var parser = new dust.rubikube.singmaster.Parser();
    return parser.parse(str);
};

dust.rubikube.singmaster.SingmasterNotation.removeXYZ = function (str) {
    var remover = new dust.rubikube.singmaster.XYZRemover();
    return remover.execute(str);
};