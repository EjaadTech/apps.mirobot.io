// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">Visuelle Programmierumgebung</span><span id="blocklyMessage">Blockly\n\nI translated all the Blockly strings into Riograndenser Hunsrückisch (Hrx / var. of German) using I.E. The translations didn\'t save - I got this message in a faded yellow background: "Saving the translation failed: Unknown error" . \n\nIn Translatewiki.net Web chat Nemo_bis suggested I try and save the translations in Chromium - I tried that and it worked. However, now I have to copy and paste all my work from IE to Chrome, unless there is another way of doing that ... \n\nNow I\'m in the process of transferring over the translations ... but they are all done (so no duplicate work is needed!).\n\n~~~~\nPaul Beppler (talk) 23:30, 12 March 2014 (UTC)</span><span id="codeTooltip">Generierte Java-COde oonsiehn.</span><span id="linkTooltip">Speichre und auf Bausten verlinke.</span><span id="runTooltip">Das Programm ausfüahre, das von den Bausten im Oorweitsbereich definiert ist.</span><span id="runProgram">Programm ausführe</span><span id="resetProgram">Zurücksetze</span><span id="dialogOk">Okay</span><span id="dialogCancel">Abbreche</span><span id="catLogic">Logik</span><span id="catLoops">Schleife</span><span id="catMath">Mathematik</span><span id="catText">Text</span><span id="catLists">Liste</span><span id="catColour">Farreb</span><span id="catVariables">Variable</span><span id="catProcedures">Funktione</span><span id="httpRequestError">Mit der Oonfroch hots en Problem geb.</span><span id="linkAlert">Tel von dein Bausten mit dem Link:\n\n%1</span><span id="hashError">„%1“ stimmt leider mit kenem üweren gespeicherte Programm.</span><span id="xmlError">Dein gespeicherte Datei könnt net gelood sin. Vielleicht woard se mit ener annre Version von Blockly erstellt.</span><span id="listVariable">List</span><span id="textVariable">Text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">Okay</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">Bewecht die Schildkrott um den oongeb Weart voarwäarts orrer rückwäarts.</span><span id="Turtle_moveForward">vorwäarts beweche um</span><span id="Turtle_moveBackward">rückwäarts beweche um</span><span id="Turtle_turnTooltip">Dreht die Schildkrott noh links orrer rechts um die oongeb Gradoonzoohl.</span><span id="Turtle_turnRight">noh rechts drehe um</span><span id="Turtle_turnLeft">noh links drehe um</span><span id="Turtle_widthTooltip">Ännert der Stift sein Breit.</span><span id="Turtle_setWidth">Breit setze uff</span><span id="Turtle_colourTooltip">Ännert der Stift sein Fareeb.</span><span id="Turtle_setColour">ännert die Farreb in</span><span id="Turtle_penTooltip">Hebt orrer senkt den Stift zum Stopp orrer Start von der Zeichnung.</span><span id="Turtle_penUp">Stift noh uwe</span><span id="Turtle_penDown">Stift noh unne</span><span id="Turtle_turtleVisibilityTooltip">Macht die Schildkrott (Kreis und Peil) sichtbar orrer unsichtbar.</span><span id="Turtle_hideTurtle">Schildkrott ausblenne</span><span id="Turtle_showTurtle">Schildkrott oonzeiche</span><span id="Turtle_printHelpUrl">https://herx.wikipedia.org/wiki/Buchdruck</span><span id="Turtle_printTooltip">Zeichnet Text in der Richtung von der Schildkrott bei ehrem Standplatz.</span><span id="Turtle_print">Druck</span><span id="Turtle_fontHelpUrl">https://hrx.wikipedia.org/wiki/Schriftschnitt</span><span id="Turtle_fontTooltip">Leht die Schriftoort fest, die vom Druck-Bausten verwennet weard.</span><span id="Turtle_font">Schriftoort</span><span id="Turtle_fontSize">Schriftgröss</span><span id="Turtle_fontNormal">normal</span><span id="Turtle_fontBold">fett</span><span id="Turtle_fontItalic">kursiv</span><span id="Turtle_unloadWarning">Das Verlosse von die Seit führt zum Verlust von dein Oorweit.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><!-- Extra SVG is temporary hack to fix bug #349701 in Chrome 34. --><!-- Harmless for other browsers. --><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="/assets/apps/blockly/media/icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /></svg><!-- Fast icon. --><!-- Extra SVG is temporary hack to fix bug #349701 in Chrome 34. --><!-- Harmless for other browsers. --><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="/assets/apps/blockly/media/icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></svg></td><td style="text-align: right"><button id="simButton" class="primary"><img src="/assets/apps/blockly/media/1x1.gif" class="run icon21"> Simulate Program</button><button id="resetButton" class="primary" style="display: none"><img src="/assets/apps/blockly/media/1x1.gif" class="stop icon21"> Reset Simulation</button></td></tr><tr><td><button id="codeButton" title="Generierte Java-COde oonsiehn."><img src=\'/assets/apps/blockly/media/1x1.gif\' class="code icon21">View JS Code</button></td><td style="text-align: right"><button id="runButton" class="primary" title="Die Schildkrott macht das, was die Baustene soogn."><img src="/assets/apps/blockly/media/1x1.gif" class="run icon21">Run on Mirobot</button><button id="stopButton" class="primary" style="display: none"><img src="/assets/apps/blockly/media/1x1.gif" class="stop icon21"> Stop Mirobot</button></td></tr></table><button class="secondary" onclick="Blockly.getMainWorkspace().clear()">Clear Program</button><p id="lang">Language: <select id="languageMenu"></select></p><script type="text/javascript" src="/assets/apps/blockly/' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="/assets/apps/blockly/js/common.js"><\/script><script type="text/javascript" src="/assets/apps/blockly/js/turtle.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Schildkrott"><block type="draw_move"><value name="VALUE"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value></block><block type="draw_pen"></block></category><category name="Logik"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Schleife"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Mathematik"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><field name="NUM">1</field></block></value><value name="HIGH"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_float"></block></category><category name="Liste"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><field name="NUM">5</field></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">List</field></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">List</field></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR">List</field></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR">List</field></block></value></block></category><category name="Variable" custom="VARIABLE"></category><category name="Funktione" custom="PROCEDURE"></category></xml>';
};
