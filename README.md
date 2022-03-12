# Nike raffle notifier

## Description

If the feed, Story post is added to the Nike Instagram, send notifications.

## Make .env

like `.env.example`

1. SESSION_ID, USER_ID
<img width="1597" alt="스크린샷 2022-03-13 오전 1 08 59" src="https://user-images.githubusercontent.com/6022539/158025567-ef37f934-e1fa-4a3f-9692-496a0a81ad45.png">

2. TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID
Please check this [article](https://gabrielkim.tistory.com/entry/Telegram-Bot-Token-%EB%B0%8F-Chat-Id-%EC%96%BB%EA%B8%B0)

## Usage

```zsh
$ npm i
$ npm start
```

## Settings

Currently, set the 7th nike stores. (nike_thehyundaiseoul, nike_apgujeong, nike_snkrs_hongdae, ipark_yongsan_nike, lotte_incheon_nike_, nike_myeongdong_official, nike__seohyeon). If you need other store, modify `NIKE_STORE_INFORMATION`

## heroku

heroku not installed devDependencies in package.json. therefore all package move to dependencies.
Do not anything. just upload & deploy.
