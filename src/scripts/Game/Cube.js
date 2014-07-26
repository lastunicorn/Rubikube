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

dust.rubikube.Cube = function () {
    var cells = [];
    var transformations;
    var history = [];
    var redoList = [];

    var cubeChangedEvent = new dust.Event();
    this.cubeChanged = cubeChangedEvent.client;

    this.move = function (moveId) {
        var type = $.type(moveId);
        switch (type) {
            case "number":
                createAndRunMoveCommand(moveId);
                break;

            case "array":
                for (var i = 0; i < moveId.length; i++) {
                    //if ($.type(moveId[i]) === "number")
                    createAndRunMoveCommand(moveId[i]);
                }
        }

        cubeChangedEvent.raise(this, null);
    };

    function createAndRunMoveCommand(moveId) {
        var cubeCommander = {
            move: performMove
        };

        var command = new dust.rubikube.MoveCommand(cubeCommander, moveId);
        history.push(command);

        command.execute();
    }

    this.undoLastMove = function () {
        if (history.length == 0)
            return;

        var command = history.pop();
        redoList.push(command);

        command.undo();

        cubeChangedEvent.raise(this, null);
    };

    this.isUndoAvailable = function () {
        return history.length > 0;
    };

    this.redoMove = function () {
        if (redoList.length == 0)
            return;

        var command = redoList.pop();
        history.push(command);

        command.execute();

        cubeChangedEvent.raise(this, null);
    };

    this.isRedoAvailable = function () {
        return redoList.length > 0;
    };

    function performMove(moveId) {
        var newCells = [];
        var transformationArray = transformations.get(moveId);

        for (var i = 1; i <= 54; i++) {
            var transformationValue = transformationArray[i];
            if (transformationValue === undefined)
                transformationValue = i;

            newCells[i] = cells[transformationValue];
        }

        cells = newCells;
    }

    function calculateFace(cellNumber) {
        if (cellNumber >= 1 && cellNumber <= 9)
            return dust.rubikube.CubeFace.left;

        if (cellNumber >= 10 && cellNumber <= 18)
            return dust.rubikube.CubeFace.right;

        if (cellNumber >= 19 && cellNumber <= 27)
            return dust.rubikube.CubeFace.up;

        if (cellNumber >= 28 && cellNumber <= 36)
            return dust.rubikube.CubeFace.down;

        if (cellNumber >= 37 && cellNumber <= 45)
            return dust.rubikube.CubeFace.front;

        if (cellNumber >= 46 && cellNumber <= 54)
            return dust.rubikube.CubeFace.back;

        return dust.rubikube.CubeFace.none;
    }

    this.toCellArray = function () {
        var items = [];

        for (var i = 1; i < cells.length; i++) {
            items[i] = cells[i];
        }

        return items;
    };

    this.getHistory = function () {
        var sb = [];

        for (var i = 0; i < history.length; i++) {
            sb.push(history[i].toString());
        }

        return sb.join(" ");
    };

    this.reset = reset;

    function reset() {
        for (var i = 1; i <= 54; i++) {
            var cell = {
                id: i,
                faceId: calculateFace(i)
            };

            cells[i] = (cell);
        }

        history.length = 0;

        cubeChangedEvent.raise(this, null);
    }

    function onHistoryChanged(){
        cubeChangedEvent.raise(this, null);
    }

    (function initialize() {
        transformations = new dust.rubikube.Transformations();

        reset();
    }());
};