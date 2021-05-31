const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const mongoose = require("mongoose");
const { Translate } = require("@google-cloud/translate").v2;
const trans = new Translate({
  projectId: process.env.GOOGLE_TRANSLATE_PROJECT_ID,
  KeyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// @route POST /users/translation/:conversationId
// translate message from sender's language to
// all other recipients' languages and save the record
exports.postMessageTranslation = asyncHandler(async (req, res) => {
  const conversation_id = req.params.conversationId;
  const user_id = req.user.id;
  const text_to_translate = req.body.message;
  var from_language = "";
  var to_languages = [];

  const conversation = await Conversation.findById(conversation_id);

  // get sender's primary language
  // and all other recipients' primary languages
  for (let uid of conversation.users) {
    let user = await User.findById(uid);
    if (uid == user_id) {
      from_language = user.primaryLanguage;
    } else {
      to_languages.push(user.primaryLanguage);
    }
  }

  // translate
  const translations = await Promise.all(
    to_languages.map(async (l) => {
      const result = await trans.translate(text_to_translate, {
        from: from_language,
        to: l,
      });
      return { language: l, translation: result[0] };
    })
  ).catch((err) => {
    res.status(500).json({ error: err });
    throw new Error("translation error");
  });

  // update database and return response
  conversation.updateOne(
    {
      $push: {
        messages: {
          sender: user_id,
          message: text_to_translate,
          language: from_language,
          translations,
        },
      },
    },
    (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        return res.status(200).json({
          text_to_translate,
          sender_id: user_id,
          chat_id: conversation_id,
          translations,
        });
      }
    }
  );
});
