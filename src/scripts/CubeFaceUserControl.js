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

dust.rubikube.CubeFaceUserControl = function (cube, cubeFaceId, faceColors) {
    var $parent;

    var $face;
    var $cells;

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

    this.refreshCells = function (cells) {
        for (var i = 0; i < 9; i++) {
            var $cell = $($cells.get(i));
            var color = faceColors.getColorFor(cells[i].faceId);
            $cell.css("background-color", color);
            $cell.text(cells[i].id);
        }
    };

    function createUi(className) {
        createFace(className);

        $cells = $face.find("td");

        $centerCell = $($cells.get(4))
            .mousedown(onCellCenterMouseDown)
            .mouseup(onCellCenterMouseUp)
            .mouseenter(onCellCenterMouseEnter)
            .mouseout(onCellCenterMouseOut)
            .on('contextmenu', onContextMenu);

        $leftCell = $($cells.get(3))
            .mousedown(onCellLeftMouseDown)
            .mouseenter(onCellLeftMouseEnter)
            .mouseout(onCellLeftMouseOut)
            .on('contextmenu', onContextMenu);

        $rightCell = $($cells.get(5))
            .mousedown(onCellRightMouseDown)
            .mouseenter(onCellRightMouseEnter)
            .mouseout(onCellRightMouseOut)
            .on('contextmenu', onContextMenu);

        $upCell = $($cells.get(1))
            .mousedown(onCellUpMouseDown)
            .mouseenter(onCellUpMouseEnter)
            .mouseout(onCellUpMouseOut)
            .on('contextmenu', onContextMenu);

        $downCell = $($cells.get(7))
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
            if (isRightMouseButtonPressed) {
                $centerCell.addClass("cell-cw");
                $centerCell.removeClass("cell-ccw");
            }
            else {
                $centerCell.addClass("cell-ccw");
                $centerCell.removeClass("cell-cw");
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

        var cubeMoveId;

        switch (cubeFaceId) {
            case dust.rubikube.CubeFace.left:
                cubeMoveId = dust.rubikube.CubeMove.left;
                break;

            case dust.rubikube.CubeFace.right:
                cubeMoveId = dust.rubikube.CubeMove.right;
                break;

            case dust.rubikube.CubeFace.up:
                cubeMoveId = dust.rubikube.CubeMove.up;
                break;

            case dust.rubikube.CubeFace.down:
                cubeMoveId = dust.rubikube.CubeMove.down;
                break;

            case dust.rubikube.CubeFace.front:
                cubeMoveId = dust.rubikube.CubeMove.front;
                break;

            case dust.rubikube.CubeFace.back:
                cubeMoveId = dust.rubikube.CubeMove.back;
                break;
        }

        if (ev.which === 1) {
            cubeMoveId = dust.rubikube.CubeMove.inverse(cubeMoveId);
        }

        cube.move(cubeMoveId);
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

        if (ev.shiftKey || ev.which === 3)
            cube.move(dust.rubikube.CubeMove.turnY);
        else
            cube.move(dust.rubikube.CubeMove.equatorInverse);
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

        if (ev.shiftKey || ev.which === 3)
            cube.move(dust.rubikube.CubeMove.turnYInverse);
        else
            cube.move(dust.rubikube.CubeMove.equator);
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

        if (ev.shiftKey || ev.which === 3)
            cube.move(dust.rubikube.CubeMove.turnX);
        else
            cube.move(dust.rubikube.CubeMove.middleInverse);
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

        if (ev.shiftKey || ev.which === 3)
            cube.move(dust.rubikube.CubeMove.turnXInverse);
        else
            cube.move(dust.rubikube.CubeMove.middle);
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