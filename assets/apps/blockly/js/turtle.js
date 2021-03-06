/**
 * Blockly Apps: Turtle Graphics
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Turtle application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Turtle = {};

// Supported languages.
BlocklyApps.LANGUAGES =
    ['ar', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'fa', 'fr', 'hi', 'hrx',
     'hu', 'is', 'it', 'ko', 'ms', 'nl', 'pl', 'pms', 'pt-br', 'ro', 'ru',
     'sco', 'sv', 'tr', 'uk', 'vi', 'zh-hans', 'zh-hant'];
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="/assets/apps/blockly/generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

Turtle.HEIGHT = 400;
Turtle.WIDTH = 400;

/**
 * PID of animation task currently executing.
 */
Turtle.pid = 0;

/**
 * Should the turtle be drawn?
 */
Turtle.visible = true;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 */
Turtle.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.isRtl();
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
      onresize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', onresize);
  onresize();

  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blockly'),
      {media: '/assets/apps/blockly/media/',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout();\n';

  window.setTimeout(function() {
    if(Blockly.mainWorkspace.getAllBlocks().length==0){
      var defaultXml =
        '<xml>' +
        '  <block type="draw_move" x="70" y="70">' +
        '    <value name="VALUE">' +
        '      <block type="math_number">' +
        '        <field name="NUM">100</field>' +
        '      </block>' +
        '    </value>' +
        '  </block>' +
        '</xml>';
      BlocklyApps.loadBlocks(defaultXml);
    }
  }, 1000);

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout();\n';

  // Add to reserved word list: API, local variables in execution environment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Turtle,code');

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  Turtle.speedSlider = new Slider(10, 35, 130, sliderSvg);

  Turtle.ctxDisplay = document.getElementById('display').getContext('2d');
  Turtle.ctxScratch = document.getElementById('scratch').getContext('2d');
  Turtle.reset();

  BlocklyApps.bindClick('simButton', Turtle.simButtonClick);
  BlocklyApps.bindClick('resetButton', Turtle.resetButtonClick);
  BlocklyApps.bindClick('runButton', Turtle.runButtonClick);
  BlocklyApps.bindClick('stopButton', Turtle.stopButtonClick);

  document.getElementById('runButton').disabled = true;
  document.getElementById('runButton').className = 'disabled';

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};

Turtle.setMirobot = function(mirobot){
  this.mirobot = mirobot;
  document.getElementById('runButton').disabled = false;
  document.getElementById('runButton').className = 'primary';
}

//window.addEventListener('load', Turtle.init);

/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
Turtle.reset = function() {
  // Starting location and heading of the turtle.
  Turtle.x = Turtle.HEIGHT / 2;
  Turtle.y = Turtle.WIDTH / 2;
  Turtle.heading = 0;
  Turtle.penDownValue = true;
  Turtle.visible = true;

  // Clear the display.
  Turtle.ctxScratch.canvas.width = Turtle.ctxScratch.canvas.width;
  Turtle.ctxScratch.strokeStyle = '#000000';
  Turtle.ctxScratch.fillStyle = '#000000';
  Turtle.ctxScratch.lineWidth = 1;
  Turtle.ctxScratch.lineCap = 'round';
  Turtle.ctxScratch.font = 'normal 18pt Arial';
  Turtle.display();

  // Kill any task.
  if (Turtle.pid) {
    window.clearTimeout(Turtle.pid);
  }
  Turtle.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
Turtle.display = function() {
  Turtle.ctxDisplay.globalCompositeOperation = 'copy';
  Turtle.ctxDisplay.drawImage(Turtle.ctxScratch.canvas, 0, 0);
  Turtle.ctxDisplay.globalCompositeOperation = 'source-over';
  // Draw the turtle.
  if (Turtle.visible) {
    // Make the turtle the colour of the pen.
    Turtle.ctxDisplay.strokeStyle = Turtle.ctxScratch.strokeStyle;
    Turtle.ctxDisplay.fillStyle = Turtle.ctxScratch.fillStyle;

    // Draw the turtle body.
    var radius = Turtle.ctxScratch.lineWidth / 2 + 10;
    Turtle.ctxDisplay.beginPath();
    Turtle.ctxDisplay.arc(Turtle.x, Turtle.y, radius, 0, 2 * Math.PI, false);
    Turtle.ctxDisplay.lineWidth = 3;
    Turtle.ctxDisplay.stroke();

    // Draw the turtle head.
    var WIDTH = 0.3;
    var HEAD_TIP = 10;
    var ARROW_TIP = 4;
    var BEND = 6;
    var radians = 2 * Math.PI * Turtle.heading / 360;
    var tipX = Turtle.x + (radius + HEAD_TIP) * Math.sin(radians);
    var tipY = Turtle.y - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    var leftX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
    var leftY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    var leftControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
    var leftControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    var rightControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
    var rightControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    var rightX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
    var rightY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
    Turtle.ctxDisplay.beginPath();
    Turtle.ctxDisplay.moveTo(tipX, tipY);
    Turtle.ctxDisplay.lineTo(leftX, leftY);
    Turtle.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    Turtle.ctxDisplay.closePath();
    Turtle.ctxDisplay.fill();
  }
};

/**
 * Click the simulate button.  Start the program.
 */
Turtle.simButtonClick = function() {
  var simButton = document.getElementById('simButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = simButton.offsetWidth + 'px';
  }
  simButton.style.display = 'none';
  resetButton.style.display = 'inline';
  // Prevent double-clicks or double-taps.
  resetButton.disabled = true;
  setTimeout(function() {resetButton.disabled = false;},
             BlocklyApps.DOUBLE_CLICK_TIME);

  //document.getElementById('spinner').style.visibility = 'visible';
  Blockly.mainWorkspace.traceOn(true);
  Turtle.stopButtonClick();
  Turtle.execute(true);
};

/**
 * Click the reset button.  Reset the simulation.
 */
Turtle.resetButtonClick = function() {
  var simButton = document.getElementById('simButton');
  simButton.style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  // Prevent double-clicks or double-taps.
  simButton.disabled = true;
  setTimeout(function() {simButton.disabled = false;},
             BlocklyApps.DOUBLE_CLICK_TIME);

  //document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  Turtle.reset();
};

/**
 * Click the run button.  Start the program.
 */
Turtle.runButtonClick = function() {
  var runButton = document.getElementById('runButton');
  var stopButton = document.getElementById('stopButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!stopButton.style.minWidth) {
    stopButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  stopButton.style.display = 'inline';
  // Prevent double-clicks or double-taps.
  stopButton.disabled = true;
  setTimeout(function() {stopButton.disabled = false;},
             BlocklyApps.DOUBLE_CLICK_TIME);

  //document.getElementById('spinner').style.visibility = 'visible';
  Blockly.mainWorkspace.traceOn(true);
  Turtle.resetButtonClick();
  Turtle.execute(false);
};

/**
 * Click the reset button.  Reset the Turtle.
 */
Turtle.stopButtonClick = function() {
  var runButton = document.getElementById('runButton');
  if(Turtle.mirobot){runButton.style.display = 'inline';}
  document.getElementById('stopButton').style.display = 'none';
  // Prevent double-clicks or double-taps.
  runButton.disabled = true;
  setTimeout(function() {runButton.disabled = false;},
             BlocklyApps.DOUBLE_CLICK_TIME);

  //document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  Turtle.reset();
  if(Turtle.mirobot){Turtle.mirobot.stop();}
};


/**
 * Execute the user's code.  Heaven help us...
 */
Turtle.execute = function(simulation) {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 1000000;
  Turtle.simulation = simulation;
  
  var code = Blockly.JavaScript.workspaceToCode();
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== Infinity) {
      alert(e);
    }
  }

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Turtle.reset();
  Turtle.pid = window.setTimeout(Turtle.animate, 100);
};

/**
 * Iterate through the recorded path and animate the turtle's actions.
 */
Turtle.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Turtle.pid = 0;

  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
    //document.getElementById('spinner').style.visibility = 'hidden';    
    if(Turtle.mirobot){document.getElementById('runButton').style.display = 'inline';}
    document.getElementById('stopButton').style.display = 'none';
    BlocklyApps.highlight(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  Turtle.step(command, tuple, function(){
    if(Turtle.simulation){
      // Scale the speed non-linearly, to give better precision at the fast end.
      var stepSpeed = 1000 * Math.pow(1 - Turtle.speedSlider.getValue(), 2);
      Turtle.pid = window.setTimeout(Turtle.animate, stepSpeed);
    }else{
      Turtle.animate();
    }
  });
  Turtle.display();
};

/**
 * Execute one step.
 * @param {string} command Logo-style command (e.g. 'FD' or 'RT').
 * @param {!Array} values List of arguments for the command.
 */
Turtle.step = function(command, values, cb) {
  switch (command) {
    case 'FD':  // Forward
      if (Turtle.penDownValue) {
        Turtle.ctxScratch.beginPath();
        Turtle.ctxScratch.moveTo(Turtle.x, Turtle.y);
      }
      var distance = values[0];
      if (distance) {
        Turtle.x += distance * Math.sin(2 * Math.PI * Turtle.heading / 360);
        Turtle.y -= distance * Math.cos(2 * Math.PI * Turtle.heading / 360);
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (Turtle.penDownValue) {
        Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y + bump);
        Turtle.ctxScratch.stroke();
      }
      if(Turtle.simulation){
        cb();
      }else{
        var complete = function(res){
          if(res === 'complete'){
            cb();
          }
        }
        if(values[0] < 0){
          this.mirobot.back(-values[0], complete);
        }else{
          this.mirobot.forward(values[0], complete);
        }
      }
      break;
    case 'RT':  // Right Turn
      Turtle.heading += values[0];
      Turtle.heading %= 360;
      if (Turtle.heading < 0) {
        Turtle.heading += 360;
      }
      if(Turtle.simulation){
        cb();
      }else{
        var complete = function(res){
          if(res === 'complete'){
            cb();
          }
        }
        if(values[0] < 0){
          this.mirobot.left(-values[0], complete);
        }else{
          this.mirobot.right(values[0], complete);
        }
      }
      break;
    case 'DP':  // Draw Print
      Turtle.ctxScratch.save();
      Turtle.ctxScratch.translate(Turtle.x, Turtle.y);
      Turtle.ctxScratch.rotate(2 * Math.PI * (Turtle.heading - 90) / 360);
      Turtle.ctxScratch.fillText(values[0], 0, 0);
      Turtle.ctxScratch.restore();
      break;
    case 'DF':  // Draw Font
      Turtle.ctxScratch.font = values[2] + ' ' + values[1] + 'pt ' + values[0];
      break;
    case 'PU':  // Pen Up
      Turtle.penDownValue = false;
      if(Turtle.simulation){
        cb();
      }else{
        this.mirobot.penup(function(res){
          if(res === 'complete'){
            cb();
          }
        });
      }
      break;
    case 'PD':  // Pen Down
      Turtle.penDownValue = true;
      if(Turtle.simulation){
        cb();
      }else{
        this.mirobot.pendown(function(res){
          if(res === 'complete'){
            cb();
          }
        });
      }
      break;
    case 'PW':  // Pen Width
      Turtle.ctxScratch.lineWidth = values[0];
      break;
    case 'PC':  // Pen Colour
      Turtle.ctxScratch.strokeStyle = values[0];
      Turtle.ctxScratch.fillStyle = values[0];
      break;
    case 'HT':  // Hide Turtle
      Turtle.visible = false;
      break;
    case 'ST':  // Show Turtle
      Turtle.visible = true;
      break;
  }
};

/**
 * Save an image of the SVG canvas.
 */
Turtle.createImageLink = function() {
  var imgLink = document.getElementById('downloadImageLink');
  imgLink.setAttribute('href',
      document.getElementById('display').toDataURL('image/png'));
  var temp = window.onbeforeunload;
  window.onbeforeunload = null;
  imgLink.click();
  window.onbeforeunload = temp;
};

// Turtle API.

Turtle.forward = function(distance, id) {
  BlocklyApps.log.push(['FD', distance, id]);
};

Turtle.back = function(distance, id) {
  BlocklyApps.log.push(['FD', -distance, id]);
};

Turtle.right = function(angle, id) {
  BlocklyApps.log.push(['RT', angle, id]);
};

Turtle.left = function(angle, id) {
  BlocklyApps.log.push(['RT', -angle, id]);
};

Turtle.penup = function(id) {
  BlocklyApps.log.push(['PU', id]);
};

Turtle.pendown = function(id) {
  BlocklyApps.log.push(['PD', id]);
};

Turtle.penWidth = function(width, id) {
  BlocklyApps.log.push(['PW', Math.max(width, 0), id]);
};

Turtle.penColour = function(colour, id) {
  BlocklyApps.log.push(['PC', colour, id]);
};

Turtle.hideTurtle = function(id) {
  BlocklyApps.log.push(['HT', id]);
};

Turtle.showTurtle = function(id) {
  BlocklyApps.log.push(['ST', id]);
};

Turtle.drawPrint = function(text, id) {
  BlocklyApps.log.push(['DP', text, id]);
};

Turtle.drawFont = function(font, size, style, id) {
  BlocklyApps.log.push(['DF', font, size, style, id]);
};
