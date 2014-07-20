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

dust.rubikube.CubeFaceUserControl = function (cube, cubeFaceId) {
    var $parent;
    var $face;
    var $faceCells;
    var $centerCell;
    var $leftCell;
    var $rightCell;
    var $upCell;
    var $downCell;
    var isMouseOverCenterCell = false;
    var isMouseOverLeftCell = false;
    var isMouseOverRightCell = false;
    var isMouseOverUpCell = false;
    var isMouseOverDownCell = false;
    var isShiftPressed = false;
    var isRightMouseButtonPressed = false;
    var allowTurnCube = false;

    this.allowTurnCube = function (value) {
        allowTurnCube = value;
    }

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
            .mousedown(onCellCenterMouseDown)
            .mouseup(onCellCenterMouseUp)
            .mouseenter(onCellCenterMouseEnter)
            .mouseout(onCellCenterMouseOut)
            .on('contextmenu', onContextMenu);

        $leftCell = $($faceCells.get(3))
            .mousedown(onCellLeftMouseDown)
            .mouseenter(onCellLeftMouseEnter)
            .mouseout(onCellLeftMouseOut)
            .on('contextmenu', onContextMenu);

        $rightCell = $($faceCells.get(5))
            .mousedown(onCellRightMouseDown)
            .mouseenter(onCellRightMouseEnter)
            .mouseout(onCellRightMouseOut)
            .on('contextmenu', onContextMenu);

        $upCell = $($faceCells.get(1))
            .mousedown(onCellUpMouseDown)
            .mouseenter(onCellUpMouseEnter)
            .mouseout(onCellUpMouseOut)
            .on('contextmenu', onContextMenu);

        $downCell = $($faceCells.get(7))
            .mousedown(onCellDownMouseDown)
            .mouseenter(onCellDownMouseEnter)
            .mouseout(onCellDownMouseOut)
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
        if (isMouseOverCenterCell) {
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

        if (isMouseOverLeftCell) {
            $leftCell.addClass("cell-left");
        } else {
            $leftCell.removeClass("cell-left");
        }

        if (isMouseOverRightCell) {
            $rightCell.addClass("cell-right");
        } else {
            $rightCell.removeClass("cell-right");
        }

        if (isMouseOverUpCell) {
            $upCell.addClass("cell-up");
        } else {
            $upCell.removeClass("cell-up");
        }

        if (isMouseOverDownCell) {
            $downCell.addClass("cell-down");
        } else {
            $downCell.removeClass("cell-down");
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

    function onCellCenterMouseUp(ev) {
        ev.preventDefault();

        if (ev.which === 3) {
            isRightMouseButtonPressed = false;
            refreshArrow();
        }
    }

    function onCellCenterMouseDown(ev) {
        ev.preventDefault();

        if (ev.which === 3) {
            isRightMouseButtonPressed = true;
            refreshArrow();
        }

        switch (cubeFaceId) {
            case dust.rubikube.CubeFace.left:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(dust.rubikube.CubeMove.leftInverse);
                else
                    cube.move(dust.rubikube.CubeMove.left);
                break;

            case dust.rubikube.CubeFace.right:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(dust.rubikube.CubeMove.rightInverse);
                else
                    cube.move(dust.rubikube.CubeMove.right);
                break;

            case dust.rubikube.CubeFace.up:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(dust.rubikube.CubeMove.upInverse);
                else
                    cube.move(dust.rubikube.CubeMove.up);
                break;

            case dust.rubikube.CubeFace.down:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(dust.rubikube.CubeMove.downInverse);
                else
                    cube.move(dust.rubikube.CubeMove.down);
                break;

            case dust.rubikube.CubeFace.front:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(dust.rubikube.CubeMove.frontInverse);
                else
                    cube.move(dust.rubikube.CubeMove.front);
                break;

            case dust.rubikube.CubeFace.back:
                if (ev.shiftKey || ev.which === 3)
                    cube.move(dust.rubikube.CubeMove.backInverse);
                else
                    cube.move(dust.rubikube.CubeMove.back);
                break;
        }
    }

    function onCellCenterMouseEnter() {
        isMouseOverCenterCell = true;
        refreshArrow();
    }

    function onCellCenterMouseOut() {
        isMouseOverCenterCell = false;
        refreshArrow();
    }

    function onCellLeftMouseEnter() {
        if (!allowTurnCube)
            return;

        isMouseOverLeftCell = true;
        refreshArrow();
    }

    function onCellLeftMouseOut() {
        if (!allowTurnCube)
            return;

        isMouseOverLeftCell = false;
        refreshArrow();
    }

    function onCellLeftMouseDown(ev) {
        ev.preventDefault();

        if (!allowTurnCube)
            return;

        cube.move(dust.rubikube.CubeMove.turnLeft);
    }

    function onCellRightMouseEnter() {
        if (!allowTurnCube)
            return;

        isMouseOverRightCell = true;
        refreshArrow();
    }

    function onCellRightMouseOut() {
        isMouseOverRightCell = false;
        if (!allowTurnCube)
            return;

        refreshArrow();
    }

    function onCellRightMouseDown(ev) {
        ev.preventDefault();

        if (!allowTurnCube)
            return;

        cube.move(dust.rubikube.CubeMove.turnRight);
    }

    function onCellUpMouseEnter() {
        if (!allowTurnCube)
            return;

        isMouseOverUpCell = true;
        refreshArrow();
    }

    function onCellUpMouseOut() {
        if (!allowTurnCube)
            return;

        isMouseOverUpCell = false;
        refreshArrow();
    }

    function onCellUpMouseDown(ev) {
        ev.preventDefault();

        if (!allowTurnCube)
            return;

        cube.move(dust.rubikube.CubeMove.turnUp);
    }

    function onCellDownMouseEnter() {
        if (!allowTurnCube)
            return;

        isMouseOverDownCell = true;
        refreshArrow();
    }

    function onCellDownMouseOut() {
        if (!allowTurnCube)
            return;

        isMouseOverDownCell = false;
        refreshArrow();
    }

    function onCellDownMouseDown(ev) {
        ev.preventDefault();

        if (!allowTurnCube)
            return;

        cube.move(dust.rubikube.CubeMove.turnDown);
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