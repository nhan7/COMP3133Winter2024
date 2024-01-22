const fs = require('fs')
const csv = require('csv-parser')

const input_countries_file_name ='input_countries.csv'
const canada_file_name = 'canada.txt'
const usa_file_name = 'usa.txt'


const deleteFileIfExists =( filename) =>{
    if(fs.existsSync(filename)){
        fs.unlinkSync(filename)
        console.log(`${filename} has been removed.`)
    }
}


function writeToFile(country, outputFile){
    const filteredData = []

    fs.createReadStream(input_countries_file_name).pipe(csv()).on('data', (row) => {
        if (row['country'] == country){
            filteredData.push(`${row.country}, ${row.year}, ${row.population}`)
        }

    })
    .on('end', () => {
        fs.writeFileSync(outputFile, 'country,year,population\n' + filteredData.join('\n'))
    })
}

deleteFileIfExists(canada_file_name)
deleteFileIfExists(usa_file_name)

writeToFile('Canada', canada_file_name)
writeToFile('United States', usa_file_name)