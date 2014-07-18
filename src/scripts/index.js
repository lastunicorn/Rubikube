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

(function () {
    var cube;
    var cubeUserControl;

    var $history;

    function refreshHistory() {
        var text = cube.getHistory();
        $history.text(text);
    }

    function moveCube(moveId) {
        cube.move(moveId);
    }

    function onButtonLClicked() {
        moveCube(lu.rubikube.CubeMove.left);
    }

    function onButtonLiClicked() {
        moveCube(lu.rubikube.CubeMove.leftInverse);
    }

    function onButtonRClicked() {
        moveCube(lu.rubikube.CubeMove.right);
    }

    function onButtonRiClicked() {
        moveCube(lu.rubikube.CubeMove.rightInverse);
    }

    function onButtonUClicked() {
        moveCube(lu.rubikube.CubeMove.up);
    }

    function onButtonUiClicked() {
        moveCube(lu.rubikube.CubeMove.upInverse);
    }

    function onButtonDClicked() {
        moveCube(lu.rubikube.CubeMove.down);
    }

    function onButtonDiClicked() {
        moveCube(lu.rubikube.CubeMove.downInverse);
    }

    function onButtonFClicked() {
        moveCube(lu.rubikube.CubeMove.front);
    }

    function onButtonFiClicked() {
        moveCube(lu.rubikube.CubeMove.frontInverse);
    }

    function onButtonBClicked() {
        moveCube(lu.rubikube.CubeMove.back);
    }

    function onButtonBiClicked() {
        moveCube(lu.rubikube.CubeMove.backInverse);
    }

    function onButtonScrambleClicked() {
        scramble();
    }

    function onButtonUndoClicked() {
        cube.undoLastMove();
    }

    function onButtonResetClicked() {
        cube.reset();
    }

    function onCubeChanged() {
        refreshHistory();
    }

    function scramble() {
        var moves = lu.rubikube.CubeMove.parse("D2 U2 R B D F' L2 F2 D U B' U2 D2 L2 B' L' F R L F2 U2 L2 U2 D' L2");
        cube.move(moves);
    }

    $(function () {
        var faceColors = new lu.rubikube.CubeFaceColors();
        cube = new lu.rubikube.Cube(faceColors);

        cubeUserControl = new lu.rubikube.CubeUserControl("#cubeContainer", cube);

        cube.cubeChanged.subscribe(onCubeChanged);

        var $buttonL = $("#buttonL");
        $buttonL.click(onButtonLClicked);

        var $buttonLi = $("#buttonLi");
        $buttonLi.click(onButtonLiClicked);

        var $buttonR = $("#buttonR");
        $buttonR.click(onButtonRClicked);

        var $buttonRi = $("#buttonRi");
        $buttonRi.click(onButtonRiClicked);

        var $buttonU = $("#buttonU");
        $buttonU.click(onButtonUClicked);

        var $buttonUi = $("#buttonUi");
        $buttonUi.click(onButtonUiClicked);

        var $buttonD = $("#buttonD");
        $buttonD.click(onButtonDClicked);

        var $buttonDi = $("#buttonDi");
        $buttonDi.click(onButtonDiClicked);

        var $buttonF = $("#buttonF");
        $buttonF.click(onButtonFClicked);

        var $buttonFi = $("#buttonFi");
        $buttonFi.click(onButtonFiClicked);

        var $buttonB = $("#buttonB");
        $buttonB.click(onButtonBClicked);

        var $buttonBi = $("#buttonBi");
        $buttonBi.click(onButtonBiClicked);

        var $buttonScramble = $("#buttonScramble");
        $buttonScramble.click(onButtonScrambleClicked);

        var $buttonUndo = $("#buttonUndo");
        $buttonUndo.click(onButtonUndoClicked);

        var $buttonReset = $("#buttonReset");
        $buttonReset.click(onButtonResetClicked);

        $history = $("#historyValue");
    });

}());