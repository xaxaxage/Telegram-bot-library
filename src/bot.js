import get from './telegramApi/get.js';
import post from './telegramApi/post.js';


class TelegramBot {
  constructor(token) {
    this.token = token
    
    this.url = `https://api.telegram.org/bot${token}/`; // URL to send requsts
    
    this.checkingMessages = {} 
    
    this.data = {}

    this.commands = []
  }

  setCommand(command, description, callBack) {
    command = command[0] === '/' ? command : false

    if (typeof command === 'string') {
      this.checkingMessages[command] = callBack
      this.commands.push({command: command, description: description})

      try {  
        post(this.url+'setMyCommands', {commands: this.commands})  
      } catch(err) {
        console.log(err.message)
      }
    } else {
      console.error('Error: Command must be a string or starting with /')
    }
  } 

  async setChatMenu() {
    try {
      post(this.url+'setChatMenuButton')   
    } catch(err) {
      console.log(err.message)
    }
  }

  getMessage(gettingText, callBack) {
    this.checkingMessages[gettingText] = callBack
  }

  sendMessage(messageText) {
    try {  
      post(this.url+'sendMessage', {text: messageText, chat_id: this.data.message.chat.id})  
    } catch(err) {
      if (err.message === "Cannot read properties of undefined (reading 'message')") {
        console.error('Error: Function sendMessage must be called only in getMessage function. Example: Bot.getMessage("message", () => {sendMessage(messageText)})')
      } else {
        console.log(err.message)
      }
    }
  }

  sendSticker(sticker_id) {
    try {  
      post(this.url+'sendSticker', {sticker: sticker_id, chat_id: this.data.message.chat.id})  
    } catch(err) {
      if (err.message === "Cannot read properties of undefined (reading 'message')") {
        console.error('Error: Function sendSticker must be called only in getMessage function. Example: Bot.getMessage("message", () => {sendSticker(sticker_id)})')
      } else {
        console.log(err.message)
      }
    }
  }

  polling() {
    try {
      get(this.url+'getUpdates')
      .then((response) => {
        const result = response.data.result
        for (let i = 0; i < result.length; i++) {
          this.data = {...result[i]}  
          if (Object.keys(this.data).length) {
            Object.keys(this.checkingMessages).forEach(element => {
              if (element === this.data.message.text) {
                this.checkingMessages[element]()
              }
            });
          }
        }
      })
      .then(() => {
        get(this.url+'getUpdates?offset='+(this.data.update_id+1))  
        .then(() => {
          this.data = {}
          this.polling()
        })
      })  
    } catch(err) {
      console.log(err.message)
    }
  }
}

export default TelegramBot