const Telegraf = require('telegraf')
const { reply } = Telegraf
var moment = require('moment');
var csv = require('csv-parse');
var fs = require('fs');
let token = '339430072:AAFcwuvCWieA4VG_zkOsJgoNZjATLDnOq4c'
let jadwal = [];
let chatId = '251459956'

fs.readFile('jadwal.csv','utf8', (err,data) => {
    if (err) {
        return console.log(err);
    }
    csv(data,{columns:true},(err,output) => {
        jadwal = output;
    })
})

const bot = new Telegraf(token)
let tempTanggal = ""
let tempWaktu = ""
let test = ""
var interval = setInterval(() => {
    let nowDate = moment().format("YYYY-MM-DD");
    let nowHour = moment().format("HH:mm");
    let index = null;
    if(nowDate !== tempTanggal){
        jadwal.forEach( (d,i) => {
            if(nowDate == d.tanggal) {
                tempTanggal = d.tanggal
                tempWaktu = d
                index = i
            }
        });
    }
        
    if(nowHour == tempWaktu.imsak){
        if(test !== tempWaktu.imsak){
            test = tempWaktu.imsak
            bot.telegram.sendMessage(chatId, "Waktunya Imsak, Hayo siap-siap Solat Subuh")
        } 
    }
    if(nowHour == tempWaktu.subuh){
        if(test !== tempWaktu.subuh){
            test = tempWaktu.subuh
            bot.telegram.sendMessage(chatId, "Solat Subuh gan, Semangat puasa 1 hari full  •.•/")
        }
    }
    if(nowHour == tempWaktu.maghrib){
        if(test !== tempWaktu.maghrib){
            test = tempWaktu.maghrib
            bot.telegram.sendMessage(chatId, "Selamat berbuka puasa untuk daerah jakarta dan sekitarnya ^.^")
        }
        
    }
    
    
},1000)

bot.command('/start', (ctx) => ctx.reply('Hello'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.on('call')
bot.command('/time', (ctx) => {
    ctx.reply("Waktu Imsakiyah Hari ini \nTanggal : " +  tempWaktu.tanggal 
    + "\nImsak : " + tempWaktu.imsak 
    + "\nSubuh : " + tempWaktu.subuh
    + "\nMaghrib : " + tempWaktu.maghrib)
})



//end
bot.startPolling()