import React, {useState} from 'react';
import {ServerList} from './constaints/ulr_list';

import './App.css';

interface IMessage {
  id: number;
  type: boolean;
  message: string;
}

function App() {
  const [messagesData, setMessagesData] = useState<IMessage[]>([]);

  const [userInput, setUserInput] = useState<string>('');
  const [waitResult, setWaitResult] = useState<boolean>(false);

  const getLastElement = (array: Array<IMessage>) => {
    if (array) {
      return array[array.length - 1];
    } else {
      return null;
    }
  };

  const sendPrompt = async (message: string): Promise<string> => {
    setWaitResult(true);
    const data = await fetch(`${ServerList.palm}/api/prompt/${message}`);
    const json = await data.json();
    return json;
  };

  const sendMessage = async (message: string) => {
    if (waitResult) {
      return;
    }
    const lastId = getLastElement(messagesData)?.id || 0;

    const _message: IMessage = {
      id: lastId + 1,
      type: false,
      message: message,
    };

    const _await_message: IMessage = {
      id: lastId + 2,
      type: true,
      message: 'writing...',
    };

    if (message !== '') {
      const newArray: IMessage[] = [...messagesData, _message, _await_message];
      setMessagesData(newArray);
      const anwser = await sendPrompt(message);
      if (anwser) {
        setMessagesData(previewElement => previewElement.slice(0, -1));
        const newAnwser: IMessage = {
          id: lastId + 2,
          type: true,
          message: anwser,
        };
        setMessagesData(previewE => [...previewE, newAnwser]);
        setWaitResult(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="messages-container">
          {messagesData.map(({id, type, message}) => {
            return (
              <div
                className={type === false ? 'type-user' : 'type-bot'}
                key={id}
              >
                <p>{message}</p>
              </div>
            );
          })}
        </div>
        <div className="button-box">
          <button className="App-button">Tools</button>
          <button className="App-button">Tell</button>
        </div>
        <textarea
          className="App-textarea"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        ></textarea>
        <button className="App-button" onClick={() => sendMessage(userInput)}>
          Send
        </button>
      </header>
    </div>
  );
}

export default App;
