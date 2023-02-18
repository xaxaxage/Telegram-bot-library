import get from './requests/get.js';
import post from './requests/post.js';

class TelegramBot {
  constructor(token) {
    this.token = token
    
    this.url = `https://api.telegram.org/bot${token}/`; // URL to send requsts
    
    this.checkingMessages = {} 
    
    this.data = {}

    this.commands = []

    this.messageWithMarkup = ''
  }

  setCommand(props) {
    let {command, description, callBack} = props

    command = command[0] === '/' ? command : false
    description = !description ? 'No description' : description

    if (typeof command === 'string' && typeof description === 'string' && typeof callBack === 'function') {
      this.checkingMessages[command] = callBack
      this.commands.push({command: command, description: description})

      try {  
        post(this.url+'setMyCommands', {commands: this.commands})  
      } catch(err) {
        console.log(err.message)
      }
    } else {
      console.error('Error: Incorrect types')
    }
  } 

  setChatMenu() {
    try {
      post(this.url+'setChatMenuButton')   
    } catch(err) {
      console.log(err.message)
    }
  }

  getMessage(gettingText, callBack) {
    this.checkingMessages[gettingText] = callBack
  }

  sendMessage(props) {
    const {messageText, parse_mode} = props

    try {  
      post(this.url+'sendMessage', {...{text: messageText, chat_id: this.data.message.chat.id}, ...!!parse_mode ? {parse_mode: parse_mode} : {}})  
    } catch(err) {
      if (err.message === "Cannot read properties of undefined (reading 'message')") {
        console.error('Error: Function sendMessage must be called only in getMessage or setCommand functions. Example: Bot.getMessage("message", () => {Bot.sendMessage(messageText)})')
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
        console.error('Error: Function sendSticker must be called only in getMessage or setCommand functions. Example: Bot.getMessage("message", () => {Bot.sendSticker(sticker_id)})')
      } else {
        console.log(err.message)
      }
    }
  }

  setReplyKeyboard(props) {
    const {text, keyboard=[], is_persisent=false, resize_keyboard=false, one_time_keyboard=false, input_field_placeholder='', selective=false} = props

    const markup = {keyboard, is_persisent, resize_keyboard, one_time_keyboard, input_field_placeholder, selective}
    
    try { 
      post(this.url+'sendMessage', {text: text, chat_id: this.data.message.chat.id, reply_markup: markup})
    } catch(err) {
      if (err.message === "Cannot read properties of undefined (reading 'message')") {
        console.error('Error: Function setReplyKeyboard must be called only in getMessage or setCommand functions. Example: Bot.getMessage("message", () => {Bot.setReplyKeyboard(arguments)})')
      } else {
        console.log(err.message)
      }
    }
  }

  async replyKeyboardRemove(chat_id) {
    try {
      const res = await post(this.url+'sendMessage', {text: 'This message is deleting...', chat_id: this.data.message.chat.id, reply_markup: {remove_keyboard: true}})
      await post(this.url+'deleteMessage', {chat_id: chat_id, message_id: res.data.result.message_id})
    } catch(err) {
      if (err.message === "Cannot read properties of undefined (reading 'chat')") {
        console.error('Error: Function setReplyKeyboard must be called only in getMessage or setCommand functions. Example: Bot.getMessage("message", () => {Bot.setReplyKeyboard(arguments)})')
      } else {
        console.log(err.message)
      }
    }
  }

  setInlineKeyboard() {
    const {keyboard=[], is_persisent=false, resize_keyboard=false, one_time_keyboard=false, input_field_placeholder='', selective=false} = props

    const markup = {keyboard, is_persisent, resize_keyboard, one_time_keyboard, input_field_placeholder, selective}
    
    try { 
      post(this.url+'sendMessage', {text: 'Keyboard', chat_id: this.data.message.chat.id, reply_markup: markup})
    } catch(err) {
      if (err.message === "Cannot read properties of undefined (reading 'message')") {
        console.error('Error: Function setReplyKeyboard must be called only in getMessage or setCommand functions. Example: Bot.getMessage("message", () => {Bot.setReplyKeyboard(arguments)})')
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