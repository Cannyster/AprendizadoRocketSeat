
const userName = 'cannyster'

fetch(`https://api.github.com/users/${userName}`, {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
})
    .then((response) => {
        //console.log(typeof response)
        //console.log(response)
        return response.json()
    })
    .then((data) => {
        console.log(`Nome: ${data.name}`)
        console.log(`Login: ${data.login}`)
        console.log(`Url: ${data.url}`)
        console.log(`Company: ${data.company}`)
        console.log(`Bio: ${data.bio}`)
        console.log(data)
    })
    .catch((err) => {
        console.log(`Houve algum erro: ${err}`)
    })