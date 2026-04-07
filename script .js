async function sendMessage(){
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const userMessage = input.value;
  chatBox.innerHTML += "<p><b>You:</b> " + userMessage + "</p>";
  const response = await fetch("/.netlify/functions/chat",{
    method:"POST",
    body:JSON.stringify({message:userMessage})
  });
  const data = await response.json();
  chatBox.innerHTML += "<p><b>AI:</b> " + data.reply + "</p>";
  input.value="";
}
function startVoice(){
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = function(event){
    document.getElementById("userInput").value =
      event.results[0][0].transcript;
  }
  recognition.start();
}