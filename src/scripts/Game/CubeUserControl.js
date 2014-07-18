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
    var $faceUCells;
    var $faceLCells;
    var $faceFCells;
    var $faceRCells;
    var $faceBCells;
    var $faceDCells;

    function refreshCube() {
        var cellColors = cube.toColors();
        var cellValues = cube.toValues();

        refreshCubeFace($faceLCells, cellColors, cellValues, 0);
        refreshCubeFace($faceRCells, cellColors, cellValues, 9);
        refreshCubeFace($faceUCells, cellColors, cellValues, 18);
        refreshCubeFace($faceDCells, cellColors, cellValues, 27);
        refreshCubeFace($faceFCells, cellColors, cellValues, 36);
        refreshCubeFace($faceBCells, cellColors, cellValues, 45);
    }

    function refreshCubeFace($faceCells, cellColors, cellValues, offset) {
        for (var i = 0; i < 9; i++) {
            var $cell = $($faceCells.get(i));
            $cell.css("background", cellColors[offset + i]);
            $cell.text(cellValues[offset + i + 1]);
        }
    }

    function onCubeChanged() {
        refreshCube();
    }

    function createUi() {
        var $faceU = createFace("faceU");
        var $faceL = createFace("faceL");
        var $faceF = createFace("faceF");
        var $faceR = createFace("faceR");
        var $faceB = createFace("faceB");
        var $faceD = createFace("faceD");

        $faceUCells = $faceU.find("td");
        $faceLCells = $faceL.find("td");
        $faceFCells = $faceF.find("td");
        $faceRCells = $faceR.find("td");
        $faceBCells = $faceB.find("td");
        $faceDCells = $faceD.find("td");

        var $tr1 = $("<tr/>")
            .append(createCell())
            .append(createCell($faceU))
            .append(createCell())
            .append(createCell());

        var $tr2 = $("<tr/>")
            .append(createCell($faceL))
            .append(createCell($faceF))
            .append(createCell($faceR))
            .append(createCell($faceB));

        var $tr3 = $("<tr/>")
            .append(createCell())
            .append(createCell($faceD))
            .append(createCell())
            .append(createCell());

        $cube = $("<table/>")
            .addClass("cube")
            .attr("tabindex", "1")
            .append($tr1)
            .append($tr2)
            .append($tr3);

        $parent.append($cube);
    }

    function createCell($content) {
        return $("<td/>")
            .append($content);
    }

    function createFace(className) {
        var $table = $("<table/>")
            .addClass("cube-face")
            .addClass(className);

        for (var i = 0; i < 3; i++)
            $table.append(createFaceRow());

        return $table;
    }

    function createFaceRow() {
        var $tr = $("<tr/>");

        for (var i = 0; i < 3; i++)
            $tr.append($("<td/>"));

        return $tr;
    }

    function onKeyDown(ev) {
        ev.preventDefault();

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

        createUi();

        cube.cubeChanged.subscribe(onCubeChanged);

        $cube.keydown(onKeyDown);

        refreshCube();
    }());

};