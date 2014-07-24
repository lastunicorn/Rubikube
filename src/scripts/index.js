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
    var $dialogImport;
    var $dialogExport;

    function refreshHistory() {
        var text = cube.getHistory();
        $history.text(text);
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
        $dialogExport.dialog("open");
//        var text = $("#historyValue").text();
//        text = $.trim(text);
//
//        if (text.length == 0)
//            alert("No move was performed.");
//        else
//            prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

    function onButtonImportClick() {
        $dialogImport.dialog("open");
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

        $dialogImport = $("#dialogImport").dialog({
            autoOpen: false,
            modal: true,
            width: 435,
            buttons: [
                {
                    text: "Ok",
                    click: function () {
                        var text = $dialogImport.find("#importValue").val();
                        var moves = dust.rubikube.CubeMove.parse(text);

                        cube.reset();
                        cube.move(moves);

                        $dialogImport.dialog("close");
                    }
                },
                {
                    text: "Cancel",
                    click: function () {
                        $dialogImport.dialog("close");
                    }
                }
            ],
            open: function () {
                $dialogImport.find("#importValue").val("");
            }
        });

        $dialogExport = $("#dialogExport").dialog({
            autoOpen: false,
            modal: true,
            width: 435,
            buttons: [
                {
                    text: "Close",
                    click: function () {
                        $dialogExport.dialog("close");
                    }
                }
            ],
            open: function () {
                var text = $("#historyValue").text();
                text = $.trim(text);

//                if (text.length == 0)
//                    alert("No move was performed.");
//                else
                $dialogExport.find("#exportValue").val(text);
                $dialogExport.find("#exportValue").select();
            }
        });
    });

}());