var Regex = function (regexIndex) {

  var regexInputChange = () => {
    if(this.IsEmpty()) {
      Regex.triggerReduce(this.index);
    }
    this.regex = new RegExp(this.regexInput.value,this.flagInput.value);
    Regex.triggerRegex();
  }

  var flagInputChange = () => {
    this.regex = new RegExp(this.regexInput.value,this.flagInput.value);
    Regex.triggerRegex();
  }

  var replaceInputChange = () => {
    if(this.IsEmpty()) {
      Regex.triggerReduce(this.index);
    }
    Regex.triggerRegex();
  }

  var flagInputKeydown = () => {
    if((event.keyCode === 71 && !this.flagInput.value.includes('g')) ||
      (event.keyCode === 73 && !this.flagInput.value.includes('i')) ||
      (event.keyCode === 77 && !this.flagInput.value.includes('m')) ||
      (event.keyCode === 85 && !this.flagInput.value.includes('u')) ||
      (event.keyCode === 89 && !this.flagInput.value.includes('y')) ||
      event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  var CreateDOM = () => {
    var div = document.createElement("div");
    div.className = "regex row";

    innerDiv = document.createElement("div");
    innerDiv.className = "six columns";
    this.regexInput = document.createElement("input");
    this.regexInput.setAttribute("placeholder", "REGEX");
    this.regexInput.setAttribute("type", "text");
    this.regexInput.className = "u-full-width";
    this.regexInput.addEventListener("change", regexInputChange);
    innerDiv.appendChild(this.regexInput);
    div.appendChild(innerDiv);

    innerDiv = document.createElement("div");
    innerDiv.className = "five columns u-full-width";
    this.replaceInput = document.createElement("input");
    this.replaceInput.setAttribute("placeholder", "REPLACE");
    this.replaceInput.setAttribute("type", "text");
    this.replaceInput.className = "u-full-width";
    this.replaceInput.addEventListener("change", replaceInputChange);
    innerDiv.appendChild(this.replaceInput);
    div.appendChild(innerDiv);

    innerDiv = document.createElement("div");
    innerDiv.className = "one column u-full-width";
    this.flagInput = document.createElement("input");
    this.flagInput.setAttribute("placeholder", "FLAGS");
    this.flagInput.setAttribute("type", "text");
    this.flagInput.className = "u-full-width";
    this.flagInput.addEventListener("change", regexInputChange);
    this.flagInput.addEventListener('keydown', flagInputKeydown);
    innerDiv.appendChild(this.flagInput);
    div.appendChild(innerDiv);

    return div;
  }

  this.index = regexIndex;
  this.DOM = CreateDOM();
}

Regex.prototype.IsEmpty = function () {
  return (this.regexInput || { value: "" }).value === "" &&
    (this.replaceInput || { value: "" }).value === "";
}

Regex.prototype.Apply = function (str) {
  return str.replace(this.regex, this.replaceInput.value);
}

function App() {
  let regexList =  [];
  let DOMRegexList = document.querySelector('.regex-list');
  let TextInput = document.getElementById('input');
  let TextResult = document.getElementById('result');

  function createNewRegex() {
    regexList.push(new Regex(regexList.length+1));
    DOMRegexList.appendChild(regexList[regexList.length-1].DOM);
  }

  Regex.triggerRegex = function () {
    TextResult.value = regexList.reduce((prev,curr) => { return curr.Apply(prev); }, TextInput.value);
    if(!regexList[regexList.length-1].IsEmpty()) {
      createNewRegex();
    }
  }

  Regex.triggerReduce = function (regexIndex) {
    var remainingList = regexList.splice(regexIndex, regexList.length);
    remainingList.forEach((r) => { DOMRegexList.removeChild(r.DOM); });
  }

  TextInput.addEventListener("change", Regex.triggerRegex);

  createNewRegex();
}

App();
