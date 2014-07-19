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

lu.rubikube.CubeFaceUserControl = function (cube, cubeFaceId) {
    var $parent;
    var $face;
    var $faceCells;
    var $centerCell;
    var isMouseOverCenter = false;
    var isShiftPressed = false;
    var isRightMouseButtonPressed = false;

    this.setParent = function (parentSelector) {
        $parent = $(parentSelector);
        $parent.append($face);
    }

    this.refreshCubeFace = function (cellColors, cellValues, offset) {
        for (var i = 0; i < 9; i++) {
            var $cell = $($faceCells.get(i));
            $cell.css("background-color", cellColors[offset + i]);
            //$cell.text(cellValues[offset + i + 1]);
        }
    };

    function createUi(className) {
        createFace(className);

        $faceCells = $face.find("td");

        $centerCell = $($faceCells.get(4))
            .mousedown(onFaceCenterMouseDown)
            .mouseup(onFaceCenterMouseUp)
            .mouseenter(onFaceCenterMouseEnter)
            .mouseout(onFaceCenterMouseOut)
            .on('contextmenu', onContextMenu);
    }

    function createFace(className) {
        $face = $("<table/>")
            .addClass("cube-face")
            .addClass(className);

        for (var i = 0; i < 3; i++)
            $face.append(createFaceRow());
    }

    function refreshArrow() {
        if (isMouseOverCenter) {
            if (isShiftPressed || isRightMouseButtonPressed) {
                $centerCell.addClass("cell-ccw");
                $centerCell.removeClass("cell-cw");
            }
            else {
                $centerCell.addClass("cell-cw");
                $centerCell.removeClass("cell-ccw");
            }
        }
        else {
            $centerCell.removeClass("cell-cw");
            $centerCell.removeClass("cell-ccw");
        }
    }

    this.keyUp = function (ev) {
        if (ev.which == 16) {
            isShiftPressed = false;
            refreshArrow();
        }
    }

    this.keyDown = function (ev) {
        if (ev.which == 16) {
            isShiftPressed = true;
            refreshArrow();
        }
    }

    function onContextMenu(ev) {
        ev.preventDefault();
    }

    function onFaceCenterMouseUp(ev) {
        ev.preventDefault();

        if (ev.which === 3) {
            isRightMouseButtonPressed = false;
            refreshArrow();
        }
    }

    function onFaceCenterMouseDown(ev) {
        ev.preventDefault();

        if (ev.which === 3) {
            isRightMouseButtonPressed = true;
            refreshArrow();
        }

        switch (cubeFaceId) {
            case lu.rubikube.CubeFace.left:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(lu.rubikube.CubeMove.leftInverse);
                else
                    cube.move(lu.rubikube.CubeMove.left);
                break;

            case lu.rubikube.CubeFace.right:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(lu.rubikube.CubeMove.rightInverse);
                else
                    cube.move(lu.rubikube.CubeMove.right);
                break;

            case lu.rubikube.CubeFace.up:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(lu.rubikube.CubeMove.upInverse);
                else
                    cube.move(lu.rubikube.CubeMove.up);
                break;

            case lu.rubikube.CubeFace.down:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(lu.rubikube.CubeMove.downInverse);
                else
                    cube.move(lu.rubikube.CubeMove.down);
                break;

            case lu.rubikube.CubeFace.front:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(lu.rubikube.CubeMove.frontInverse);
                else
                    cube.move(lu.rubikube.CubeMove.front);
                break;

            case lu.rubikube.CubeFace.back:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(lu.rubikube.CubeMove.backInverse);
                else
                    cube.move(lu.rubikube.CubeMove.back);
                break;
        }
    }

    function onFaceCenterMouseEnter() {
        isMouseOverCenter = true;
        refreshArrow();
    }

    function onFaceCenterMouseOut() {
        isMouseOverCenter = false;
        refreshArrow();
    }

    function createFaceRow() {
        var $tr = $("<tr/>");

        for (var i = 0; i < 3; i++)
            $tr.append($("<td/>"));

        return $tr;
    }

    (function initialize() {
        createUi();
    }());
};