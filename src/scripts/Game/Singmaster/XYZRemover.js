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

dust.rubikube.singmaster.XYZRemover = function () {

    this.execute = function (str) {
        var moveIds = dust.rubikube.singmaster.SingmasterNotation.parse(str);

        var newMoveIds = [];
        var transformations = [];

        for (var i = 0; i < moveIds.length; i++) {
            switch (moveIds[i]) {
                case dust.rubikube.CubeMove.turnX:
                    transformations.push(transformX);
                    break;

                case dust.rubikube.CubeMove.turnXInverse:
                    transformations.push(transformXInverse);
                    break;

                case dust.rubikube.CubeMove.turnY:
                    transformations.push(transformY);
                    break;

                case dust.rubikube.CubeMove.turnYInverse:
                    transformations.push(transformYInverse);
                    break;

                case dust.rubikube.CubeMove.turnZ:
                    transformations.push(transformZ);
                    break;

                case dust.rubikube.CubeMove.turnZInverse:
                    transformations.push(transformZInverse);
                    break;

                default:
                    var newMoveId = applyTransformations(moveIds[i], transformations);
                    newMoveIds.push(newMoveId);
                    break;
            }
        }

        return toString(newMoveIds);
    };

    function toString(moveIds) {
        var sb = [];

        for (var i = 0; i < moveIds.length; i++) {
            var s = dust.rubikube.singmaster.SingmasterNotation.toString(moveIds[i]);
            sb.push(s);
        }

        return sb.join(" ");
    }

    function applyTransformations(moveId, transformations) {
        for (var i = 0; i < transformations.length; i++) {
            moveId = transformations[i](moveId);
        }

        return moveId;
    }

    function transformY(moveId) {
        switch (moveId) {
            case dust.rubikube.CubeMove.left:
                return dust.rubikube.CubeMove.back;

            case dust.rubikube.CubeMove.leftInverse:
                return dust.rubikube.CubeMove.backInverse;

            case dust.rubikube.CubeMove.right:
                return dust.rubikube.CubeMove.front;

            case dust.rubikube.CubeMove.rightInverse:
                return dust.rubikube.CubeMove.frontInverse;

            case dust.rubikube.CubeMove.front:
                return dust.rubikube.CubeMove.left;

            case dust.rubikube.CubeMove.frontInverse:
                return dust.rubikube.CubeMove.leftInverse;

            case dust.rubikube.CubeMove.back:
                return dust.rubikube.CubeMove.right;

            case dust.rubikube.CubeMove.backInverse:
                return dust.rubikube.CubeMove.rightInverse;

            default:
                return moveId;
        }
    }

    function transformYInverse(moveId) {
        switch (moveId) {
            case dust.rubikube.CubeMove.left:
                return dust.rubikube.CubeMove.front;

            case dust.rubikube.CubeMove.leftInverse:
                return dust.rubikube.CubeMove.frontInverse;

            case dust.rubikube.CubeMove.right:
                return dust.rubikube.CubeMove.back;

            case dust.rubikube.CubeMove.rightInverse:
                return dust.rubikube.CubeMove.backInverse;

            case dust.rubikube.CubeMove.front:
                return dust.rubikube.CubeMove.right;

            case dust.rubikube.CubeMove.frontInverse:
                return dust.rubikube.CubeMove.rightInverse;

            case dust.rubikube.CubeMove.back:
                return dust.rubikube.CubeMove.left;

            case dust.rubikube.CubeMove.backInverse:
                return dust.rubikube.CubeMove.leftInverse;

            default:
                return moveId;
        }
    }

    function transformX(moveId) {
        switch (moveId) {
            case dust.rubikube.CubeMove.up:
                return dust.rubikube.CubeMove.back;

            case dust.rubikube.CubeMove.upInverse:
                return dust.rubikube.CubeMove.backInverse;

            case dust.rubikube.CubeMove.down:
                return dust.rubikube.CubeMove.front;

            case dust.rubikube.CubeMove.downInverse:
                return dust.rubikube.CubeMove.frontInverse;

            case dust.rubikube.CubeMove.front:
                return dust.rubikube.CubeMove.up;

            case dust.rubikube.CubeMove.frontInverse:
                return dust.rubikube.CubeMove.upInverse;

            case dust.rubikube.CubeMove.back:
                return dust.rubikube.CubeMove.down;

            case dust.rubikube.CubeMove.backInverse:
                return dust.rubikube.CubeMove.downInverse;

            default:
                return moveId;
        }
    }

    function transformXInverse(moveId) {
        switch (moveId) {
            case dust.rubikube.CubeMove.up:
                return dust.rubikube.CubeMove.front;

            case dust.rubikube.CubeMove.upInverse:
                return dust.rubikube.CubeMove.frontInverse;

            case dust.rubikube.CubeMove.down:
                return dust.rubikube.CubeMove.back;

            case dust.rubikube.CubeMove.downInverse:
                return dust.rubikube.CubeMove.backInverse;

            case dust.rubikube.CubeMove.front:
                return dust.rubikube.CubeMove.down;

            case dust.rubikube.CubeMove.frontInverse:
                return dust.rubikube.CubeMove.downInverse;

            case dust.rubikube.CubeMove.back:
                return dust.rubikube.CubeMove.up;

            case dust.rubikube.CubeMove.backInverse:
                return dust.rubikube.CubeMove.upInverse;

            default:
                return moveId;
        }
    }

    function transformZ(moveId) {
        switch (moveId) {
            case dust.rubikube.CubeMove.left:
                return dust.rubikube.CubeMove.up;

            case dust.rubikube.CubeMove.leftInverse:
                return dust.rubikube.CubeMove.upInverse;

            case dust.rubikube.CubeMove.right:
                return dust.rubikube.CubeMove.down;

            case dust.rubikube.CubeMove.rightInverse:
                return dust.rubikube.CubeMove.downInverse;

            case dust.rubikube.CubeMove.up:
                return dust.rubikube.CubeMove.right;

            case dust.rubikube.CubeMove.upInverse:
                return dust.rubikube.CubeMove.rightInverse;

            case dust.rubikube.CubeMove.down:
                return dust.rubikube.CubeMove.left;

            case dust.rubikube.CubeMove.downInverse:
                return dust.rubikube.CubeMove.leftInverse;

            default:
                return moveId;
        }
    }

    function transformZInverse(moveId) {
        switch (moveId) {
            case dust.rubikube.CubeMove.left:
                return dust.rubikube.CubeMove.down;

            case dust.rubikube.CubeMove.leftInverse:
                return dust.rubikube.CubeMove.downInverse;

            case dust.rubikube.CubeMove.right:
                return dust.rubikube.CubeMove.up;

            case dust.rubikube.CubeMove.rightInverse:
                return dust.rubikube.CubeMove.upInverse;

            case dust.rubikube.CubeMove.up:
                return dust.rubikube.CubeMove.left;

            case dust.rubikube.CubeMove.upInverse:
                return dust.rubikube.CubeMove.leftInverse;

            case dust.rubikube.CubeMove.down:
                return dust.rubikube.CubeMove.right;

            case dust.rubikube.CubeMove.downInverse:
                return dust.rubikube.CubeMove.rightInverse;

            default:
                return moveId;
        }
    }

};