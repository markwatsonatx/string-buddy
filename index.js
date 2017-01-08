const {clipboard} = require('electron');

let inputElement;
let outputElement;
let tabPlugins = [];
let selectedTabPlugin;

function bodyLoaded() {
    inputElement = document.getElementById("inputText");
    outputElement = document.getElementById("outputText");
    let tabs = document.getElementsByClassName("tab");
    for (let tab of tabs) {
        tabPlugins.push({
            tab: tab,
            plugin: getPlugin(tab.getAttribute("data-plugin"))
        });
    }
    //
    inputElement.value = clipboard.readText('selection');
    selectTab(tabs[0]);
}

function bodyFocused() {
    inputElement.value = clipboard.readText('selection');
    if (tabs) {
        selectTab(tabs[0]);
    }
}

function getPlugin(id) {
    let Plugin = require(`./plugins/${id}.js`);
    return new Plugin();
}

function selectTab(e) {
    let newTabPlugin;
    for (let tabPlugin of tabPlugins) {
        if (e == tabPlugin.tab) {
            newTabPlugin = tabPlugin;
            break;
        }
    }
    if (selectedTabPlugin) {
        selectedTabPlugin.tab.className = "tab";
    }
    selectedTabPlugin = newTabPlugin;
    selectedTabPlugin.tab.className = "tab selected";
    setOutput();
}

function setOutput() {
    let output = '';
    let textFragments = selectedTabPlugin.plugin.process(inputElement.value);
    for(let textFragment of textFragments) {
        if (output != '') {
            output += '\n\n';
        }
        output += textFragment.title + '\n';
        for (let i=0; i<textFragment.title.length; i++) {
            output += '-';
        }
        output += '\n';
        output += textFragment.text;
    }
    outputElement.innerText = output;
}