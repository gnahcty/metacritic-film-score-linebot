import 'dotenv/config'
import linebot from 'linebot'
import movie from './commands/movie.js'

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('follow', async event => {
    event.reply(`
    Hi, please enter a movie title to check its score on MetaCritic.
    Please note that due to the lack of funds, it may take up to 15 minutes for the first reply.
    `)
})

bot.on('message', async event => {
    if (event.message.type === 'text') {
        console.log(`searching for ${event.message.text}`);
        movie(event)
    } else {
        event.reply(`Can't find the movie title.`)
    }
})

bot.listen('/', process.env.PORT || 3000, () => {
    console.log('機器人已開啟')
})