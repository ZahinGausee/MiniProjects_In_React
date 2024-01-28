import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // useState Hook
  const [length, setLength] = useState(15);
  const [password, setPassword] = useState('');
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState('');

  // useRef Hook
  const passwordRef = useRef(null);
  const copyRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    setTimeout(() => {
        copyRef.current.textContent = "Copy";
    }, 500);
    copyRef.current.textContent = "Copied";
    console.log(copyRef.current.textContent);
    window.navigator.clipboard.writeText(password);
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += `!@#$%^&*()-=_+[]{}|;:'",.<>?/`;

    for (let i = 0; i <= length; i++) {
      const char = Math.floor((Math.random() * str.length) + 1);
      pass += str.charAt(char);
    }
    if(length>=12)setIsPasswordStrong("Very strong");
    else if(length<12 && length>=10) setIsPasswordStrong("Strong");
    else if(length>=6 && length<10) setIsPasswordStrong("weak");
    else setIsPasswordStrong("")

    setPassword(pass);
    
  }, [length, charAllowed, numberAllowed, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">
          A Random Password Generator
        </h1>
        <div>{isPasswordStrong}</div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 font-bold">
          <input 
            className="outline-none w-full py-1 px-3"
            type="text"
            value={password}
            ref={passwordRef}
            placeholder="Password"
            readOnly />
          <button 
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800"
            onClick={copyPasswordToClipboard}
            ref={copyRef}>Copy</button>
        </div>
        <div className="flex gap-2 justify-between align-middle">
          <div className="flex gap-1">
            <input 
              value={length}
              min={6} 
              max={100} 
              type="range"
              onChange={(e) => setLength(e.target.value)}
            />
            Length: {length}
          </div>
          <label className="flex gap-1">
            <input 
              type="checkbox" 
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
            />
            Numbers
          </label>
          <label className="flex gap-1"> 
            <input 
              type="checkbox" 
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
            />
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
