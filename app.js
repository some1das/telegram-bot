const Telegraph = require("telegraf").Telegraf;
require("dotenv").config();
const getImage = require("./imageApi");
const getMeme = require("./memeApi");
const covidGen = require("./covidApiGen");
const bot = new Telegraph(process.env.TOKEN);

// bot.use((ctx)=>{
//     ctx.reply("Hi human")
// })
bot.start((ctx) => {
  console.log("started by "+ctx.chat.first_name)
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "Hello and welcome!\n We are really happy to serve you.\nPlease click on any one of the option\n to procees further",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Owner info", callback_data: "Owner" },
            {
              text: "Owmers website",
              url: "http://topshop99.herokuapp.com/",
            },
          ],
          [
            {
              text: "Help",
              callback_data: "help",
            },
            {
              text: "Covid info",
              url: "https://www.who.int/",
            },
          ],
        ],
      },
    }
  );
});
bot.action("help", (ctx) => {
  console.log("helping to "+ctx.chat.first_name)
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "There are several option available in our plateform, choose the below option to know more about them",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "List of services we have", callback_data: "service" }],
          [{ text: "back to start manu", callback_data: "startAgain" }],
        ],
      },
    }
  );
});

bot.action("service", (ctx) => {
  console.log("serving "+ctx.chat.first_name)
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, "services list:\n", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "1. Image providing service", callback_data: "imageService" }],
        [{ text: "2. Meme providing service", callback_data: "meme" }],
        [{ text: "3. Covid related services", callback_data: "covid" }],
        [
          {
            text: "4. Quiz service to improve knowledge",
            callback_data: "quiz",
          },
        ],
        [{ text: "back", callback_data: "help" }],
      ],
    },
  });
});
bot.action("imageService", (ctx) => {
  console.log("showing image to "+ctx.chat.first_name)
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "All you need to know about our image services:\n to search an image type " +
      "/img " +
      "<keyword>"
  );
});
bot.action("meme", (ctx) => {
  console.log("showing meme to "+ctx.chat.first_name)
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "All you need to know about our meme services:\n To get a meme just type meme",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "go back", callback_data: "service" }]],
      },
    }
  );
});

bot.on("sticker", (ctx) => {
  ctx.reply("cool!!");
});
bot.hears("hello", (ctx) => {
  ctx.reply("hello!\n How can I help you?");
});
bot.hears("hi", (ctx) => {
  ctx.reply("How are you?");
});
bot.command("img", (ctx) => {
  const m = ctx.message.text;

  const mArray = m.split(" ");
  const q = mArray[1];

  getImage(q)
    .then(async (res) => {
      await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");
      await ctx.telegram.sendPhoto(ctx.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
bot.hears("meme", (ctx) => {
  getMeme().then(async (res) => {
    await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    await ctx.telegram.sendPhoto(ctx.chat.id, res, {
      reply_to_message_id: ctx.message.message_id,
    });
  });
});
bot.hears("links", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "Important links are comming...", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Go to cowin", url: "https://www.cowin.gov.in/home" },
          {
            text: "Arugya setu APP link",
            url:
              "https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en_IN&gl=US",
          },
        ],
        [
          {
            text: "Covid states chart",
            url: "https://www.worldometers.info/coronavirus/country/india/",
          },
          {
            text: "Covid info",
            url: "https://www.who.int/",
          },
        ],
      ],
    },
  });
});

bot.hears("options", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "Choose any one of them", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Owner info", callback_data: "Owner" },
          {
            text: "Owmers website",
            callback_data: "website",
          },
        ],
        [
          {
            text: "Help",
            callback_data: "help",
          },
          {
            text: "Covid info",
            url: "https://www.who.int/",
          },
        ],
      ],
    },
  });
});

bot.action("Owner", (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "-----owner's info-----\n Name: Suman Das\nPassion: Coding",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "back to start manu", callback_data: "startAgain" }],
        ],
      },
    }
  );
});
bot.action("startAgain", (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "Hello and welcome!\n We are really happy to serve you.\nPlease click on any one of the option\n to procees further",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Owner info", callback_data: "Owner" },
            {
              text: "Owmers website",
              url: "http://topshop99.herokuapp.com/",
            },
          ],
          [
            {
              text: "Help",
              callback_data: "help",
            },
            {
              text: "Covid info",
              url: "https://www.who.int/",
            },
          ],
        ],
      },
    }
  );
});
bot.hears("voting", (ctx) => {
  ctx.telegram.sendPoll(ctx.chat.id, "how are you", ["great", "not good"]);
  ctx.telegram.sendPoll(ctx.chat.id, "Where are you from", [
    "India",
    "Out side india",
  ]);
});
// ......................... covid services
bot.action("covid", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "Different data distribution:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Overall country data", callback_data: "country" }],
        [{ text: "states data", callback_data: "states" }],
      ],
    },
  });
});

// ..................response of different data qry------------------
bot.action("country", (ctx) => {
  covidGen().then((r) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `-----------------India-------------\n
      Total : ${r.totalconfirmed}\n 
      recovered : ${r.totalrecovered}\n 
      Today's confirmed cases: ${r.dailyconfirmed}\n `
    );
  });
});
var stateQ;
bot.action("states", (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "currently we support only one state that is Assam",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Assam", callback_data: "assam" }],
          [{ text: "Arunachal", callback_data: "arunachal" }],
          [{ text: "Nagaland", callback_data: "nagaland" }],
          [{ text: "Manipur", callback_data: "manipur" }],
          [{ text: "Mizoram", callback_data: "mizoram" }],
          [{ text: "Tripura", callback_data: "tripura" }],
          [{ text: "Maghalaya", callback_data: "maghayalaya" }],
          [{ text: "Bihar", callback_data: "bihar" }],
          [{ text: "UP", callback_data: "UP" }],
          [{ text: "Delhi", callback_data: "delhi" }],
          [{ text: "WB", callback_data: "WB" }],
        ],
      },
    }
  );
});
// --------------statewise code written here-----------------------------
// ----------------------Assam------------------------------------

// .........................quiz------------------------------------
bot.action("quiz", (ctx) => {
  console.log(ctx.chat.first_name+" is on quiz")
  ctx.telegram
    .sendQuiz(
      ctx.chat.id,
      "Which of The following is not a object oriented programming language",
      ["Java", "JavaScript", "C"],
      { correct_option_id: 2 }
    )
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      console.log(err);
    });
  ctx.telegram
    .sendQuiz(
      ctx.chat.id,
      "Which of the following is not javaScript framework?",
      ["node", "react", "spring","electron"],
      { correct_option_id: 2 }
    )
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      console.log(err);
    });
    ctx.telegram
    .sendQuiz(
      ctx.chat.id,
      "Between framwork and library, which one is bigger?",
      ["framwork", "library"],
      { correct_option_id: 0 }
    )
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      console.log(err);
    });
    ctx.telegram
    .sendQuiz(
      ctx.chat.id,
      "Which javascript engine does google chrome use?",
      ["spider monkey", "V8", "Chakra","node"],
      { correct_option_id: 1 }
    )
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      console.log(err);
    });
    ctx.telegram
    .sendQuiz(
      ctx.chat.id,
      "Javascript is-",
      ["client side language", "Serverside language", "scripting language","All above"],
      { correct_option_id: 3 }
    )
    .then((r) => {
      console.log(r.chat);
    })
    .catch((err) => {
      console.log(err);
    });
});

bot.launch(() => {
  console.log("successfully started...");
});
