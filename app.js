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
    #app {
      border: 0px solid black;
    }
    #toolbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      border-bottom: 1px solid black;
    }
    #card-area {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 0;
      border: 0px solid blue;
    }
    #positive-wrapper {
      position: absolute;
      top: 0;
      bottom: 50%;
      left: 0;
      right: 0;
      border: 0px solid green;
      border-bottom: 1px solid green;
    }
    #negative-wrapper {
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      border: 0px solid red;
    }
    .card-holder {
      position: absolute;
      border: 0px solid blue;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
    }
    .card {
      border: 1px solid black;
      padding: 10px;
      width: 100px;
      height: 50px;
      margin-right: 10px;
      margin-bottom: 10px;
      width: 100px;
    }
  </style>`
}

function appView (state, emit) {
  const { app } = state
  // TODO figure out what we can do with flex to have
  // items just wrap around but not space out vertically
  return html`<div id='app'>
    <div id='toolbar'>toolbar</div>
    <div id='card-area'>
      <div id='positive-wrapper'>
        <div class='card-holder'>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
        </div>
      </div>
      <div id='negative-wrapper'>
        <div class='card-holder'>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
          <div class='card'>card</div>
        </div>
      </div>
    </div>
  </div>`
}

app.route('*', (state, emit) => {
  return html`<body style="margin: 0; height: 100%; background: #bbbaba; border: 0px solid red;">
    ${style()}
    ${appView(state, emit)}
  </body>`
})

app.mount(document.body)
