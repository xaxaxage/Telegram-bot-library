# Telegram bot library


### Class TelegramBot with constructor TelegramBot(***token***)


### Function getMessage

   Takes two arguments: **gettingText**, **callBack**

   **gettingText** - Message bot has to answer (*string*) (*required*)
   **callBack** - Function that bot has to call if gettingText was sent to bot (*function*) (*required*)


### Function sendMessage

   Takes one argument: ***Object*** with **messageText** and **parse_mode** *{messageText: text, parse_mode: parse_mode}*

   **messageText** - Message to response (*string*) (*required)*
   **parse_mode** - Parse mode (*string*) (*not required*)

   ###### Must be called only in getMessage function 


### Function sendSticker

   Takes one argument: **sticker_id**

   **sticker_id** - Id of sticker to send (*string*) (*required*)

   ###### Must be called only in getMessage function 


### Function setCommand 

   Takes one argument: ***Object*** with **command**, **description** and **callBack** *{command: command, description: description, callBack: callBackfn}*

   **command** - Command to get (*string*) (*required*)
   **description** - Description for command. If no description leave '' (*string*) (*not required*)
   **callBack** - Function that bot has to call if command was sent to bot (*function*)(*required*)


### Function setChatMenu

   Takes no arguments

   Adding menu button to a telegram bot


### Function polling

   Takes no arguments

   Starts the bot


# Example:

const Bot = new TelegramBot(***token***)

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

Bot.polling()

