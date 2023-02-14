import get from './telegramApi/get.js';
import post from './telegramApi/post.js';


class TelegramBot {
  constructor(token) {
    this.token = token
    
    this.url = `https://api.telegram.org/bot${token}/`; // URL to send requsts
    
    this.chekingMessages = {}
    
    this.data = {}

    this.commands = []
  }

  setCommand(command, callBack) {
    if (typeof command === 'string') {
      this.chekingMessages[command] = callBack
      this.commands.push(command)
      
      try {  
        post([this.commands], this.url+'setMyCommands')  
      } catch(err) {
        console.log(err.message)
      }
    } else {
      console.error('Error: Command must be a string')
    }
  } 

  getMessage(gettingText, callBack) {
    this.chekingMessages[gettingText] = callBack
  }

  sendMessage(messageText) {
    try {  
      post({text: messageText, chat_id: this.data.message.chat.id}, this.url+'sendMessage')  
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
      post({sticker: sticker_id, chat_id: this.data.message.chat.id}, this.url+'sendSticker')  
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
            Object.keys(this.chekingMessages).forEach(element => {
              if (element === this.data.message.text) {
                this.chekingMessages[element]()
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