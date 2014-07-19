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

lu.rubikube.CubeUserControl = function (parentSelector, cube) {
    var $parent;
    var $cube;

    var faceL;
    var faceR;
    var faceU;
    var faceD;
    var faceF;
    var faceB;

    function refreshCube() {
        var cellColors = cube.toColors();
        var cellValues = cube.toValues();

        faceL.refreshCubeFace(cellColors, cellValues, 0);
        faceR.refreshCubeFace(cellColors, cellValues, 9);
        faceU.refreshCubeFace(cellColors, cellValues, 18);
        faceD.refreshCubeFace(cellColors, cellValues, 27);
        faceF.refreshCubeFace(cellColors, cellValues, 36);
        faceB.refreshCubeFace(cellColors, cellValues, 45);
    }

    function onCubeChanged() {
        refreshCube();
    }

    function createUi() {

        $cube = createTable(3, 4);
        $cube
            .addClass("cube")
            .attr("tabindex", "1")
            .mouseenter(onMouseEnter);

        var $cubeCells = $cube.find("td");

        faceL.setParent($cubeCells.get(4));
        faceR.setParent($cubeCells.get(6));
        faceU.setParent($cubeCells.get(1));
        faceD.setParent($cubeCells.get(9));
        faceF.setParent($cubeCells.get(5));
        faceB.setParent($cubeCells.get(7));

        $parent.append($cube);
    }

    function onMouseEnter() {
        $cube.focus();
    }

    function createTable(rowCount, columnCount) {
        var sb = [];

        sb.push("<table>");

        for (var i = 0; i < rowCount; i++) {
            sb.push("<tr>");

            for (var j = 0; j < columnCount; j++)
                sb.push("<td></td>");

            sb.push("</tr>");
        }

        sb.push("</table>");

        return $(sb.join(''));
    }

    function onKeyup(ev) {
        ev.preventDefault();

        faceL.keyUp(ev);
        faceR.keyUp(ev);
        faceU.keyUp(ev);
        faceD.keyUp(ev);
        faceF.keyUp(ev);
        faceB.keyUp(ev);
    }

    function onKeydown(ev) {
        ev.preventDefault();

        faceL.keyDown(ev);
        faceR.keyDown(ev);
        faceU.keyDown(ev);
        faceD.keyDown(ev);
        faceF.keyDown(ev);
        faceB.keyDown(ev);

        switch (ev.which) {
            case 76: // l
                if (ev.shiftKey)
                    cube.move(lu.rubikube.CubeMove.leftInverse);
                else
                    cube.move(lu.rubikube.CubeMove.left);
                break;

            case 82: // r
                if (ev.shiftKey)
                    cube.move(lu.rubikube.CubeMove.rightInverse);
                else
                    cube.move(lu.rubikube.CubeMove.right);
                break;

            case 85: // u
                if (ev.shiftKey)
                    cube.move(lu.rubikube.CubeMove.upInverse);
                else
                    cube.move(lu.rubikube.CubeMove.up);
                break;

            case 68: // d
                if (ev.shiftKey)
                    cube.move(lu.rubikube.CubeMove.downInverse);
                else
                    cube.move(lu.rubikube.CubeMove.down);
                break;

            case 70: // f
                if (ev.shiftKey)
                    cube.move(lu.rubikube.CubeMove.frontInverse);
                else
                    cube.move(lu.rubikube.CubeMove.front);
                break;

            case 66: // b
                if (ev.shiftKey)
                    cube.move(lu.rubikube.CubeMove.backInverse);
                else
                    cube.move(lu.rubikube.CubeMove.back);
                break;

            case 37: // left arrow
                cube.move(lu.rubikube.CubeMove.turnLeft);
                break;

            case 38:
                // up arrow
                cube.move(lu.rubikube.CubeMove.turnUp);
                break;

            case 39:
                // right arrow
                cube.move(lu.rubikube.CubeMove.turnRight);
                break;

            case 40:
                // down arrow
                cube.move(lu.rubikube.CubeMove.turnDown);
                break;
        }
    }

    (function initialize() {
        $parent = $(parentSelector);

        faceL = new lu.rubikube.CubeFaceUserControl(cube, lu.rubikube.CubeFace.left);
        faceR = new lu.rubikube.CubeFaceUserControl(cube, lu.rubikube.CubeFace.right);
        faceU = new lu.rubikube.CubeFaceUserControl(cube, lu.rubikube.CubeFace.up);
        faceD = new lu.rubikube.CubeFaceUserControl(cube, lu.rubikube.CubeFace.down);
        faceF = new lu.rubikube.CubeFaceUserControl(cube, lu.rubikube.CubeFace.front);
        faceB = new lu.rubikube.CubeFaceUserControl(cube, lu.rubikube.CubeFace.back);

        createUi();

        cube.cubeChanged.subscribe(onCubeChanged);

        $cube.keydown(onKeydown);
        $cube.keyup(onKeyup);

        refreshCube();
    }());

};