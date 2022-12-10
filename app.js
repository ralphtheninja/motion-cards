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
  // TODO ids should be uuids

  const allCards = [
    {
      title: 'card1',
      color: 'blue',
      id: 1
    },
    {
      title: 'card2',
      color: 'blue',
      id: 2
    },
    {
      title: 'card3',
      color: 'blue',
      id: 3
    },
    {
      title: 'card4',
      color: 'red',
      id: 4
    },
    {
      title: 'card5',
      color: 'red',
      id: 5
    }
  ]

  // A slide object has a name and an array of cards
  // But the play state, vote state etc should be separate
  const slides = [
    {
      name: 'slide1',
      cards: [5, 1, 4]
    }
  ]

  state.app = {
    allCards,
    slides,
    play: null
  }

  function cardState ({ cards }) {
    return cards.map(id => {
      const card = allCards.find(c => c.id === id)
      if (card) {
        return { ...card }
      } else {
        console.warn('failed to find card with id', id)
        return false
      }
    }).filter(Boolean)
  }

  emitter.on('start', slideName => {
    const slide = slides.find(s => s.name === slideName)
    if (slide) {
      console.log('starting slide', slideName, slide)
      const toPlay = cardState(slide)
      console.log('toPlay card state', JSON.stringify(toPlay, null, 2))
      state.app.play = {
        slideName,
        toPlay,
        played: []
      }
      emitter.emit('render')
    } else {
      console.error('could not find slide', slideName)
    }
  })

  emitter.on('stop', () => {
    state.app.play = null
    emitter.emit('render')
  })
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
      height: 50px;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: space-between;
    }
    .toolbar-icon {
      font-family: "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort;
      font-size: 2.0em;
      cursor: pointer;
      height: 50px;
    }
    #card-area {
      position: absolute;
      top: 50px;
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
  // TODO figure out what we can do with flex to have
  // items just wrap around but not space out vertically

  const playState = state.app.play
  const canStop = playState
  const canStart = !canStop
  const canShowSettings = canStart

  // TODO pick slide name from drop down or similar
  const slideName = 'slide1'

  // TODO can click reverse button if we are playing and if we have
  // played some cards
  const upCards = playState?.played.filter(c => c.vote === 'up') || []
  const downCards = playState?.played.filter(c => c.vote === 'down') || []

  return html`<div id='app'>
    <div id='toolbar'>
      <div>
        <button disabled=${!canStart} onclick=${() => emit('start', slideName)} class='toolbar-icon'>▶</button>
        <button disabled=${!canStop} onclick=${() => emit('stop')} class='toolbar-icon'>⏹</button>
        <button class='toolbar-icon'>⏪</button>
      </div>
        <button disabled=${!canShowSettings} class='toolbar-icon'>⚙</button>
      </div>
    </div>
    <div id='card-area'>
      <div id='positive-wrapper'>
        <div class='card-holder'>
          ${upCards.map(c => html`<div class='card'>${c.title}</div>`)}
        </div>
      </div>
      <div id='negative-wrapper'>
        <div class='card-holder'>
          ${downCards.map(c => html`<div class='card'>${c.title}</div>`)}
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
