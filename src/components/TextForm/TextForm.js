import React, { useState, useEffect } from "react";
import './style.css';

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [highlightWord, setHighlightWord] = useState("");
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();


  // Function to handle text change in the textarea
  const handleOnChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setRedoStack([]); // Clear redo stack when text changes
  };

  // Function to save the current state to the undo stack
  const saveState = () => {
    setUndoStack((prevStack) => [text, ...prevStack]);
  };

  // Function to convert text to uppercase
  const handleUpClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
    saveState();
    props.showAlert("Converted to Upper Case!", "Success :");
  };

  // Function to convert text to lowercase
  const handleLoClick = () => {
    const newText = text.toLowerCase();
    setText(newText);
    saveState();
    props.showAlert("Converted to Lower Case!", "Success :");
  };

  // Function to clear the text
  const handleClearClick = () => {
    setText("");
    saveState();
    props.showAlert("Text Cleared!", "Success :");
  };

  // Function to copy the text to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "Success :");
  };

  // Function to remove extra spaces from the text
  const handleExtraSpaces = () => {
    const newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    saveState();
    props.showAlert("Extra Spaces removed!", "Success :");
  };

  // Function to find and replace text
  const handleFindReplace = () => {
    const findText = prompt("Enter the text to find:");
    const replaceText = prompt("Enter the text to replace it with:");

    if (findText && replaceText) {
      const newText = text.split(findText).join(replaceText);
      setText(newText);
      saveState();
      props.showAlert("Text Replaced!", "Success :");
    } else {
      props.showAlert("Find and Replace canceled.", "Info:");
    }
  };

  // Function to highlight occurrences of a word
  const handleHighlight = () => {
    const wordToHighlight = prompt("Enter the word to highlight:");
    setHighlightWord(wordToHighlight);
    saveState();
    props.showAlert(
      `Highlighted occurrences of '${wordToHighlight}'!`,
      "Success :"
    );
  };

  // Function to start text-to-speech
  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[0];
    synth.speak(utterance);
    props.showAlert("Text-to-Speech started!", "Success :");
  };

  // Function to undo the last action
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const [prevText, ...restUndoStack] = undoStack;
      setUndoStack(restUndoStack);
      setRedoStack((prevStack) => [text, ...prevStack]);
      setText(prevText);
      props.showAlert("Undo successful!", "Success :");
    } else {
      props.showAlert("Nothing to undo.", "Info:");
    }
  };

  // Function to redo the last undone action
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const [nextText, ...restRedoStack] = redoStack;
      setRedoStack(restRedoStack);
      setUndoStack((prevStack) => [text, ...prevStack]);
      setText(nextText);
      props.showAlert("Redo successful!", "Success :");
    } else {
      props.showAlert("Nothing to redo.", "Info:");
    }
  };

  // Function to apply emoji support
  const handleEmojiSupport = () => {
    const emojiMap = {
      ":)": "😊",
      ":(": "😢",
      ":D": "😃",
      "<3": "❤️",
      ":thumbsup:": "👍",
      ":thumbsdown:": "👎",
      ":fire:": "🔥",
      ":star:": "⭐",
      ":heart_eyes:": "😍",
      ":rocket:": "🚀",
      ":moneybag:": "💰",
      ":warning:": "⚠️",
      ":exclamation:": "❗️",
      ":question:": "❓",
      ":smile:": "😄",
      ":angry:": "😠",
      ":clap:": "👏",
      ":pray:": "🙏",
    };

    let newText = text;
    Object.entries(emojiMap).forEach(([keyword, emoji]) => {
      newText = newText.split(keyword).join(emoji);
    });

    setText(newText);
    saveState();
    props.showAlert("Emoji Support Applied!", "Success :");
  };

  // useEffect to update voices when they change
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      const updatedVoices = synth.getVoices();
      if (updatedVoices.length > 0) {
        voices.length = 0;
        voices.push(...updatedVoices);
      }
    };
  }, [synth, voices]);

  // Function to get the text with highlighted occurrences
  const getHighlightedText = () => {
    if (!highlightWord) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlightWord})`, "gi"));
    return (
      <>
        {parts.map((part, index) => (<span key={index} style={part.toLowerCase() === highlightWord.toLowerCase() ? { backgroundColor: "gray" } : {} }> {part} </span>))}
      </>
    );
  };

  return (
    <>
      <div className="container" style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
        <h2 className="my-2"> {props.heading} </h2>
        <div className="mb-3">
          <textarea className="form-control" id="myBox" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === "dark" ? "#13466e" : "white", color: props.mode === "dark" ? "white" : "#042743",}} rows="8"></textarea>
        </div>
        <div className="button-container">
          <button id="button" disabled={text.length === 0} onClick={handleUpClick}><span> Convert to UpperCase </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleLoClick}><span> Convert to LowerCase </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleHighlight}><span> Highlight Text </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleFindReplace}><span> Find and Replace </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleTextToSpeech}><span> Text to Speech </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleEmojiSupport}><span> Emoji Support </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleExtraSpaces}><span> Remove Extra Spaces </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleUndo}><span> Undo </span></button>
          <button id="button" disabled={redoStack.length === 0} onClick={handleRedo}><span> Redo </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleCopy}><span> Copy </span></button>
          <button id="button" disabled={text.length === 0} onClick={handleClearClick}><span> Clear Text </span></button>
        </div>
      </div>
      <div className="container my-3" style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
        <h2> Your text summary</h2>
        <p>{text.split(/\s+/).filter((element) => {return element.length !== 0;}).length}{" "} words and {text.length} characters.{" "}</p>
                          {/* /\s+/ it is a regular expression and \s (backslash s means white space) is for space including new line (and + is for one or more space)   */}
        <p>{" "}{0.008 * text.split(" ").filter((element) => element.length !== 0).length}{" "} minutes required to read.</p>
        <h2> Preview </h2>
        <p>{getHighlightedText()}</p>
      </div>
    </>
  );
}