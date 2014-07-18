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

lu.rubikube.Cube = function (faceColors) {
    var state;
    var transformations;
    var history = [];

    var cubeChangedEvent = new lu.Event();
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

        var moveCommand = new lu.rubikube.MoveCommand(cubeCommander, moveId);
        history.push(moveCommand);
        moveCommand.execute();
    }

    this.undoLastMove = function () {
        if (history.length == 0)
            return;

        var moveCommand = history.pop();
        moveCommand.undo();

        cubeChangedEvent.raise(this, null);
    };

    function performMove(moveId) {
        var newState = [];
        var transformationArray = transformations.get(moveId);

        for (var i = 1; i <= 54; i++) {
            var transformationValue = transformationArray[i];
            if (transformationValue === undefined)
                transformationValue = i;

            newState[i] = state[transformationValue];
        }

        state = newState;
    }

    function calculateFace(cellNumber) {
        if (cellNumber >= 1 && cellNumber <= 9)
            return lu.rubikube.CubeFace.left;

        if (cellNumber >= 10 && cellNumber <= 18)
            return lu.rubikube.CubeFace.right;

        if (cellNumber >= 19 && cellNumber <= 27)
            return lu.rubikube.CubeFace.up;

        if (cellNumber >= 28 && cellNumber <= 36)
            return lu.rubikube.CubeFace.down;

        if (cellNumber >= 37 && cellNumber <= 45)
            return lu.rubikube.CubeFace.front;

        if (cellNumber >= 46 && cellNumber <= 54)
            return lu.rubikube.CubeFace.back;

        return lu.rubikube.CubeFace.none;
    }

    this.toColors = function () {
        var colors = [];

        for (var i = 1; i < state.length; i++) {
            var face = calculateFace(state[i]);
            var color = faceColors.getColorFor(face);
            colors.push(color);
        }

        return colors;
    };

    this.toValues = function () {
        return state;
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
            state[i] = i;
        }

        history.length = 0;

        cubeChangedEvent.raise(this, null);
    }

    (function initialize() {
        transformations = new lu.rubikube.Transformations();

        state = [];
        reset();
    }());
};