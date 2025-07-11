const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById ('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

//AIzaSyAPDIRMEdQPkiq4ie9gwc6mRiGovgfZ24E
const perguntarAI = async (question, game, apiKey) => {
    const model = "gemini-2.0-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    
    `
    const contents = [{
        parts: [{
            text: pergunta
        }]
    }]

   // chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}

const enviarFormulario = (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value.trim()
    const game = gameSelect.value.trim()
    const  question =  questionInput.value.trim()

    console.log({apiKey, game, question})

   if (apiKey === '' || game === '' || question === '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        // perguntar para IA
        perguntarAI(question, game, apiKey)
    } catch(error) {
        console.log('Error ', error)

    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }

}

form.addEventListener('submit', enviarFormulario)