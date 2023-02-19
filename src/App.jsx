import { useState } from "react";
import "./app.css";

function App() {
  //passes in this state link to put in iframe
  const [link, setLink] = useState(
    "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?playlist=dQw4w9WgXcQ&autoplay=1&iv_load_policy=3&loop=1&modestbranding=1&start="
  );
  //state to handle input of user
  const [message, setMessage] = useState("");

  //handles input of user
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(event.target[0].value);
  };

  //functions which gets code of youtube video from url
  const linkHandler = (url) => {
    let regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
  };

  //function which handles Enter input and passes to Link state final url
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let link = linkHandler(message);
      let list = message.split("list=").pop().split("&")[0]; //getting code for list watching
      //building last url
      let setter =
        "https://www.youtube-nocookie.com/embed/" +
        link +
        "?list=" +
        list +
        "&autoplay=1&iv_load_policy=3&loop=1&modestbranding=1&start=";
      setLink(
        //passing url to state and to prevent from bugs with link using replace
        setter.replace(`list=https://www.youtube.com/watch?v=${link}`, "")
      );
    }
  };

  //structure of my site, pretty and simple
  return (
    <div className="App">
      <div className="playerHandler">
        <iframe src={link} frameBorder="0"></iframe>
      </div>
      <div className="playerVideos">
        <div class="container">
          <input
            type="text"
            required="required"
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            id="message"
            name="message"
          />
          <label>YouTube link</label>
          <i></i>
        </div>
      </div>
    </div>
  );
}

export default App;
