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

lu.rubikube.CubeFaceColors = function () {
    this.getColorFor = function (cubeFaceId) {
        switch (cubeFaceId) {
            case lu.rubikube.CubeFace.left:
                return "#ff9933"; // orange

            case lu.rubikube.CubeFace.right:
                return "#ff3300"; // red

            case lu.rubikube.CubeFace.up:
                return "#ffff66"; // yellow

            case lu.rubikube.CubeFace.down:
                return "#e0e0e0"; // white

            case lu.rubikube.CubeFace.front:
                return "#0066cc"; // blue

            case lu.rubikube.CubeFace.back:
                return "#00c000"; // green

            default:
                return "white";
        }
    };
};