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
    var $dialogHelp;

    function refreshHistory() {
        var text = cube.getHistory();
        $history.text(text);
    }

    function moveCube(moveId) {
        cube.move(moveId);
    }

    function onButtonLClicked() {
        moveCube(dust.rubikube.CubeMove.left);
    }

    function onButtonLiClicked() {
        moveCube(dust.rubikube.CubeMove.leftInverse);
    }

    function onButtonRClicked() {
        moveCube(dust.rubikube.CubeMove.right);
    }

    function onButtonRiClicked() {
        moveCube(dust.rubikube.CubeMove.rightInverse);
    }

    function onButtonUClicked() {
        moveCube(dust.rubikube.CubeMove.up);
    }

    function onButtonUiClicked() {
        moveCube(dust.rubikube.CubeMove.upInverse);
    }

    function onButtonDClicked() {
        moveCube(dust.rubikube.CubeMove.down);
    }

    function onButtonDiClicked() {
        moveCube(dust.rubikube.CubeMove.downInverse);
    }

    function onButtonFClicked() {
        moveCube(dust.rubikube.CubeMove.front);
    }

    function onButtonFiClicked() {
        moveCube(dust.rubikube.CubeMove.frontInverse);
    }

    function onButtonBClicked() {
        moveCube(dust.rubikube.CubeMove.back);
    }

    function onButtonBiClicked() {
        moveCube(dust.rubikube.CubeMove.backInverse);
    }

    function onButtonCubeLeftClicked() {
        moveCube(dust.rubikube.CubeMove.turnLeft);
    }

    function onButtonCubeRightClicked() {
        moveCube(dust.rubikube.CubeMove.turnRight);
    }

    function onButtonCubeUpClicked() {
        moveCube(dust.rubikube.CubeMove.turnUp);
    }

    function onButtonCubeDownClicked() {
        moveCube(dust.rubikube.CubeMove.turnDown);
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

    function onButtonExportClick() {
        var text = $("#historyValue").text();
        text = $.trim(text);

        if (text.length == 0)
            alert("No move was performed.");
        else
            prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

    function onButtonImportClick() {
        var text = window.prompt("Copy to clipboard: Ctrl+C, Enter", "");

        var moves = dust.rubikube.CubeMove.parse(text);

        cube.reset();
        cube.move(moves);
    }

    function onButtonHelpClick() {
        $dialogHelp.dialog("open");
    }

    function scramble() {
        var moves = dust.rubikube.CubeMove.parse("D2 U2 R B D F' L2 F2 D U B' U2 D2 L2 B' L' F R L F2 U2 L2 U2 D' L2");
        cube.move(moves);
    }

    $(function () {
        var faceColors = new dust.rubikube.CubeFaceColors();
        cube = new dust.rubikube.Cube(faceColors);

        cubeUserControl = new dust.rubikube.CubeUserControl("#cubeContainer", cube);

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

        var $buttonCubeLeft = $("#buttonCubeLeft");
        $buttonCubeLeft.click(onButtonCubeLeftClicked);

        var $buttonCubeRight = $("#buttonCubeRight");
        $buttonCubeRight.click(onButtonCubeRightClicked);

        var $buttonCubeUp = $("#buttonCubeUp");
        $buttonCubeUp.click(onButtonCubeUpClicked);

        var $buttonCubeDown = $("#buttonCubeDown");
        $buttonCubeDown.click(onButtonCubeDownClicked);

        var $buttonScramble = $("#buttonScramble");
        $buttonScramble.click(onButtonScrambleClicked);

        var $buttonUndo = $("#buttonUndo");
        $buttonUndo.click(onButtonUndoClicked);

        var $buttonReset = $("#buttonReset");
        $buttonReset.click(onButtonResetClicked);

        var $buttonExport = $("#buttonExport");
        $buttonExport.click(onButtonExportClick);

        var $buttonImport = $("#buttonImport");
        $buttonImport.click(onButtonImportClick);

        var $buttonHelp = $("#buttonHelp");
        $buttonHelp.click(onButtonHelpClick);

        $history = $("#historyValue");

        $dialogHelp = $("#dialogHelp").dialog({
            autoOpen: false,
            buttons: [
                {
                    text: "Close",
                    click: function () {
                        $dialogHelp.dialog("close");
                    }
                }
            ],
            width: 500
        });
    });

}());