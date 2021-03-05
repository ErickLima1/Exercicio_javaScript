const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('Nomes.txt') // Colocando o arquivo que eu estou recebendo em csv ou txt.

const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

const main =  async () => {
    const content = await fetchData("https://stardewvalleywiki.com/Villagers")
    let villagers = []
    const $ = cheerio.load(content)

    $('li.gallerybox').each((i,e) => {
        const title =   $(e).find('.gallerytext > p > a').text()
        const avatar = "https://stardewvalleywiki.com" + $(e).find('.thumb > div > a > img').attr("src")
        const link = "  https://stardewvalleywiki.com" + $(e).find('.gallerytext > p > a').attr("href")
        
        const data = {title, avatar, link}
        villagers.push(data)
        writeStream.write(`${title},${avatar}, ${link} \n`)
   })
        console.log(villagers)

}
main()