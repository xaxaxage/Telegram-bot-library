<h1 align="center"><b>Telegram bot library</b></h1>


### Class TelegramBot with constructor TelegramBot(***token***)


### Bot.data

**Bot.data.update_id - Update id**<br>
**Bot.data.message.message_id** - Message id<br>
**Bot.data.message.from.id** - User id<br>
**Bot.data.message.from.is_bot** - If user is bot. (*true or false*)<br>
**Bot.data.message.from.first_name** - User firstname<br>
**Bot.data.message.from.last_name** - User lastname<br>
**Bot.data.message.from.username** - User username<br>
**Bot.data.message.from.language_code** User laguage code<br>
**Bot.data.message.chat.id** - Chat id<br>
**Bot.data.message.chat.type** - Chat type (*private or public*)<br>
**Bot.data.message.date** - Message date<br>
**Bot.data.message.text** - Message text<br>


### Function getMessage

Takes two arguments: **gettingText**, **callBack**

**gettingText** - Message bot has to answer (*string*) (*required*)<br>
**callBack** - Function that bot has to call if gettingText was sent to bot (*function*) (*required*)<br>


### Function sendMessage

Takes one argument: ***Object*** with **messageText** and **parse_mode** 

**Object** - *{messageText: text, parse_mode: parse_mode}*

**messageText** - Message to response (*string*) (*required)*<br>
**parse_mode** - Parse mode (*string*) (*not required*)<br>

###### Must be called only in getMessage or setCommand functions 


### Function sendSticker

Takes one argument: **sticker_id**

**sticker_id** - Id of sticker to send (*string*) (*required*)

###### Must be called only in getMessage or setCommand functions 


### Function setCommand 

Takes one argument: ***Object*** with **command**, **description** and **callBack** 

**Object** - *{command: command, description: description, callBack: callBackfn}*

**command** - Command to get (*string*) (*required*)<br>
**description** - Description for command. If no description leave '' (*string*) (*required*)<br>
**callBack** - Function that bot has to call if command was sent to bot (*function*)(*required*)<br>


### Function setChatMenu

Takes no arguments

Adding menu button to a telegram bot


### Function setReplyKeyboard

Takes one argument: ***Object*** with **text**, **keyboard**, **is_persisent**, **resize_keyboard**, **input_field_placeholder**, **one_time_keyboard**, **selective**

**Object** - *{text: messageText, keyboard: keyboard, is_persisent: is_persisent, resize_keyboard: resize_keyboard, input_field_placeholder: input_field_placeholder selective: selective}*

**text** - Message to send (*string*) (*required*)<br> 
**keyboard** - Buttons of a keyboard (*Array of a buttons*) (*required*) 

###### Look at [documentation](https://core.telegram.org/bots/api#replykeyboardmarkup):
   &emsp;**is_persisent** (bool) (*not required*)<br>
   &emsp;**resize_keyboard** (bool) (*not required*)<br>
   &emsp;**input_field_placeholder** (bool) (*not required*)<br>
   &emsp;**one_time_keyboard** (bool) (*not required*)<br>
   &emsp;**selective** (bool) (*not required*)<br>


###### Must be called only in getMessage or setCommand functions


### Function replyKeyboardRemove

Takes one argument: **chat_id**

**chat_id** - Id of the chat. Must be: *Bot.data.message.chat.id* (*string or integer*) (*required*)

###### Must be called only in getMessage or setCommand functions


### Function polling

Takes no arguments

Starts the bot


# Example:
```javascript
const Bot = new TelegramBot(token)

Bot.getMessage('message', () => {
   Bot.sendMessage({messageText: 'message to send', parse_mode: 'parse mode'})
})

Bot.setCommand({command: '/command', description: 'description', callBack: () => {
   Bot.sendMessage({messageText: 'message to send', parse_mode: 'parse mode'})
}})

Bot.getMessage('message2', () => {
   Bot.sendSticker('sticker id')
})

Bot.setChatMenu()

Bot.getMessage('keyboard', () => {
   Bot.setReplyKeyboard({text: 'Keyboard', keyboard: [['Button_row_1', 'Button_row_1'], ['Button_row_2', 'Button_row_2'], ['Button_row_3', 'Button_row_3']]})
})

Bot.getMessage('keyboard button message', () => {
   Bot.replyKeyboardRemove(Bot.data.message.chat.id)
})

Bot.polling()
```

