// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">ae veesual programin environment</span><span id="blocklyMessage">Blockly (Blocklie)</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkTooltip">Hain n airt til blocks.</span><span id="runTooltip">Rin the program defined bi the blocks in the wairkspace.</span><span id="runProgram">Rin Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logeec</span><span id="catLoops">Luips</span><span id="catMath">Maths</span><span id="catText">Tex</span><span id="catLists">Leets</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Functions</span><span id="httpRequestError">Thaur wis ae problem wi the request.</span><span id="linkAlert">Shair yer blocks wi this airtin:\n\n%1</span><span id="hashError">Sairrie, \'%1\' disna correspond wi onie hained program.</span><span id="xmlError">Coudnae laid yer hained file.  Perhaps it wis makit wi ae deefferent version o Blockly?</span><span id="listVariable">leet</span><span id="textVariable">tex</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">Muives the turtle forewaird or backwaird bi the speceefied amoont.</span><span id="Turtle_moveForward">muiv forewaird bi</span><span id="Turtle_moveBackward">muiv backwaird bi</span><span id="Turtle_turnTooltip">Turns the turtle cai or richt bi the speceefied nummer o degrees.</span><span id="Turtle_turnRight">turn richt bi</span><span id="Turtle_turnLeft">turn cair bi</span><span id="Turtle_widthTooltip">Chynges the width o the pen.</span><span id="Turtle_setWidth">set width tae</span><span id="Turtle_colourTooltip">Chynges the colour o the pen.</span><span id="Turtle_setColour">set colour tae</span><span id="Turtle_penTooltip">Lifts or lowers the pen, tae stap or stairt drawin.</span><span id="Turtle_penUp">pen up</span><span id="Turtle_penDown">pen doon</span><span id="Turtle_turtleVisibilityTooltip">Maks the turtle (circle n pointer) veesible or onveesible.</span><span id="Turtle_hideTurtle">skauk turtle</span><span id="Turtle_showTurtle">shaw turtle</span><span id="Turtle_printHelpUrl">https://en.wikipedia.org/wiki/Printing</span><span id="Turtle_printTooltip">Draws tex in the turtle\'s direction at its location.</span><span id="Turtle_print">prent</span><span id="Turtle_fontHelpUrl">https://en.wikipedia.org/wiki/Font</span><span id="Turtle_fontTooltip">Sets the font uised bi the prent block.</span><span id="Turtle_font">font</span><span id="Turtle_fontSize">font size</span><span id="Turtle_fontNormal">normal</span><span id="Turtle_fontBold">baud</span><span id="Turtle_fontItalic">italeec</span><span id="Turtle_unloadWarning">Leain this page will ootcome in the loss o yer wark.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><!-- Extra SVG is temporary hack to fix bug #349701 in Chrome 34. --><!-- Harmless for other browsers. --><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="/assets/apps/blockly/media/icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /></svg><!-- Fast icon. --><!-- Extra SVG is temporary hack to fix bug #349701 in Chrome 34. --><!-- Harmless for other browsers. --><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="/assets/apps/blockly/media/icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></svg></td><td style="text-align: right"><button id="simButton" class="primary"><img src="/assets/apps/blockly/media/1x1.gif" class="run icon21"> Simulate Program</button><button id="resetButton" class="primary" style="display: none"><img src="/assets/apps/blockly/media/1x1.gif" class="stop icon21"> Reset Simulation</button></td></tr><tr><td><button id="codeButton" title="See generated JavaScript code."><img src=\'/assets/apps/blockly/media/1x1.gif\' class="code icon21">View JS Code</button></td><td style="text-align: right"><button id="runButton" class="primary" title="Maks the turtle dae whit the blocks say."><img src="/assets/apps/blockly/media/1x1.gif" class="run icon21">Run on Mirobot</button><button id="stopButton" class="primary" style="display: none"><img src="/assets/apps/blockly/media/1x1.gif" class="stop icon21"> Stop Mirobot</button></td></tr></table><button class="secondary" onclick="Blockly.getMainWorkspace().clear()">Clear Program</button><p id="lang">Language: <select id="languageMenu"></select></p><script type="text/javascript" src="/assets/apps/blockly/' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="/assets/apps/blockly/js/common.js"><\/script><script type="text/javascript" src="/assets/apps/blockly/js/turtle.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Turtle"><block type="draw_move"><value name="VALUE"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value></block><block type="draw_pen"></block></category><category name="Logeec"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Luips"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Maths"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><field name="NUM">1</field></block></value><value name="HIGH"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_float"></block></category><category name="Leets"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><field name="NUM">5</field></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">leet</field></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">leet</field></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR">leet</field></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR">leet</field></block></value></block></category><category name="Variables" custom="VARIABLE"></category><category name="Functions" custom="PROCEDURE"></category></xml>';
};
