const app = require('choo')({ history: false })
const html = require('choo/html')
// const level = require('level')
// const sub = require('subleveldown')
// const db = level('polslides')

app.use((state, emitter) => {
  // TODO load cards from db
  // const cardsDb = sub(db, 'cards', {
  //   valueEncoding: 'json'
  // })
  // TODO load slides from db
  // const slidesDb = sub(db, 'slides', {
  //   valueEncoding: 'json'
  // })

  const cards = [
    {
      name: 'card1',
      color: 'blue'
    },
    {
      name: 'card2',
      color: 'blue'
    },
    {
      name: 'card3',
      color: 'blue'
    },
    {
      name: 'card4',
      color: 'red'
    },
    {
      name: 'card5',
      color: 'red'
    }
  ]

  const slides = [
    {
      name: 'slide1',
      cards: []
    },
    {
      name: 'slides',
      cards: []
    }
  ]

  state.app = {
    cards,
    slides
  }
})

function style () {
  return html`<style>
    body {
      margin: 0px;
      overflow: hidden;
      font-family: monospace;
    }
  </style>`
}

function appView (state, emit) {
  // const { app } = state
  return html`<div id='app'>
  </div>`
}

app.route('*', (state, emit) => {
  return html`<body>
    ${style()}
    ${appView(state, emit)}
  </body>`
})

app.mount(document.body)
