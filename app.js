const app = require('choo')({ history: false })
const html = require('choo/html')
const { allCards, slides } = require('./cards.js')
// const level = require('level')
// const sub = require('subleveldown')
// const db = level('motion-cards')

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

  // TODO using hardcoded cards and series for now

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
        console.error('failed to find card with id', id)
        return false
      }
    }).filter(Boolean)
  }

  emitter.on('start', slideName => {
    const slide = slides.find(s => s.name === slideName)
    if (slide) {
      const toPlay = cardState(slide)
      state.app.play = {
        slideName,
        toPlay,
        played: [],
        cardsTurned: false
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
  emitter.on('back', () => {
    const playState = state.app.play
    if (playState) {
      const toPlay = playState.toPlay.slice()
      const played = playState.played.slice()
      const card = played.pop()
      toPlay.unshift({ ...card, vote: undefined })
      playState.toPlay = toPlay
      playState.played = played
      emitter.emit('render')
    }
  })
  emitter.on('vote-up', card => {
    const playState = state.app.play
    if (playState) {
      const toPlay = playState.toPlay.slice(1)
      const played = playState.played.slice()
      played.push({ ...card, vote: 'up' })
      playState.toPlay = toPlay
      playState.played = played
      emitter.emit('render')
    }
  })
  emitter.on('vote-down', card => {
    const playState = state.app.play
    if (playState) {
      const toPlay = playState.toPlay.slice(1)
      const played = playState.played.slice()
      played.push({ ...card, vote: 'down' })
      playState.toPlay = toPlay
      playState.played = played
      emitter.emit('render')
    }
  })
  emitter.on('turn-cards', () => {
    const playState = state.app.play
    if (playState) {
      playState.cardsTurned = !playState.cardsTurned
      emitter.emit('render')
    }
  })
})

function style () {
  return html`<style>
    #toolbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      display: flex;
      justify-content: space-between;
    }
    .emoji-icon {
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
    }
    #positive-wrapper {
      position: absolute;
      top: 0;
      bottom: 50%;
      left: 0;
      right: 0;
      border: 0;
      border-bottom: 4px gray;
      border-style: dashed;
      background-color: #d3d3d3;
      background-image: url('plus.png');
      background-size: 50px;
      background-blend-mode: overlay;
    }
    #negative-wrapper {
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
    }
    #next-card {
      padding: 3em;
      position: absolute;
      top: 30%;
      bottom: 30%;
      left: 30%;
      right: 30%;
      border: 10px solid black;
      border-radius: 2em;
      background: #eed470;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-weight: bold;
    }
    .card-holder {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2em;
      display: flex;
      flex-wrap: wrap;
    }
    .card {
      border: 4px solid black;
      border-radius: 1em;
      padding: 1.5em;
      width: 14em;
      height: 5em;
      margin-right: 3em;
      line-height: 1.5em;
      font-weight: bold;
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
  const upCards = playState?.played.filter(c => c.vote === 'up') || []
  const downCards = playState?.played.filter(c => c.vote === 'down') || []
  const toPlay = playState?.toPlay
  const played = playState?.played || []
  const canTurnCards = upCards.length || downCards.length
  const cardsTurned = playState?.cardsTurned

  const nextCard = Array.isArray(toPlay) && toPlay.length > 0 && toPlay[0]
  // TODO pick slide name from drop down or similar
  const slideName = 'slide1'

  const canBack = played.length > 0

  return html`<div id='app'>
    ${(nextCard && renderNextCard(nextCard, emit)) || null}
    <div id='toolbar'>
      <div>
        <button disabled=${!canStart} onclick=${() => emit('start', slideName)} class='emoji-icon' style='cursor: ${canStart ? 'pointer' : 'default'}'>▶</button>
        <button disabled=${!canStop} onclick=${() => emit('stop')} class='emoji-icon' style='cursor: ${canStop ? 'pointer' : 'default'}'>⏹</button>
        <button disabled=${!canBack} onclick=${() => emit('back')} class='emoji-icon' style='cursor: ${canBack ? 'pointer' : 'default'}'>⏪</button>
        <button disabled=${!canTurnCards} onclick=${() => emit('turn-cards')} class='emoji-icon' style='cursor: ${canTurnCards ? 'pointer' : 'default'}'>🔁</button>
      </div>
        <button disabled=${!canShowSettings} class='emoji-icon' style='cursor: ${canShowSettings ? 'pointer' : 'default'}'>⚙</button>
      </div>
    </div>
    <div id='card-area'>
      <div id='positive-wrapper'>
        <div class='card-holder'>
          ${upCards.map(c => renderPlayedCard(c, cardsTurned))}
        </div>
      </div>
      <div id='negative-wrapper'>
        <div class='card-holder'>
          ${downCards.map(c => renderPlayedCard(c, cardsTurned))}
        </div>
      </div>
    </div>
  </div>`
}

function renderNextCard (card, emit) {
  return html`<div id='next-card'>
    <div style="font-size: 3em; line-height: 2em;"><center>${card.title}</center></div>
    <div style="display: flex; justify-content: space-between;">
      <button onclick=${() => emit('vote-up', card)} class='emoji-icon'>➕</button>
      <button onclick=${() => emit('vote-down', card)} class='emoji-icon'>➖</button>
    </div>
   </div>`
}

function renderPlayedCard (card, turned) {
  const background = turned ? card.color : '#c0c0c0'
  return html`<div class='card' style='background: ${background}'>
    <center>${card.title}</center>
  </div>`
}

app.route('*', (state, emit) => {
  return html`<body style="margin: 0; height: 100%; background: lightgray;">
    ${style()}
    ${appView(state, emit)}
  </body>`
})

app.mount(document.body)
