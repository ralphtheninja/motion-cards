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

  // TODO using hardcoded cards and slides for now

  state.app = {
    allCards,
    slides,
    play: null,
    settings: {
      // show: false
      show: true,
      activeTab: 'cards',
      tabs: {
        cards: {
          foo: 'bar'
        },
        slides: {

        }
      }
    }
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
        totalCount: toPlay.length,
        toPlay,
        played: [],
        cardsTurned: false
      }
      state.app.settings.show = false
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

  emitter.on('settings:toggle', () => {
    state.app.settings.show = !state.app.settings.show
    emitter.emit('render')
  })
  emitter.on('settings:set-tab', (tab) => {
    state.app.settings.activeTab = tab
    emitter.emit('render')
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
      background-size: 100px;
      background-blend-mode: overlay;
    }
    #negative-wrapper {
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #d3d3d3;
      background-image: url('minus.png');
      background-size: 100px;
      background-blend-mode: overlay;
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
      border: 2px solid black;
      border-radius: 1em;
      padding: 0.5em;
      width: 14em;
      height: 3em;
      margin-right: 1em;
      line-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #settings {
      padding: 1em;
      position: absolute;
      top: 10%;
      bottom: 10%;
      left: 10%;
      right: 10%;
      border: 5px solid black;
      background: #d0edcf;
      z-index: 10;
      display: flex;
      flex-direction: column;
      font-weight: bold;
    }
    #settings-toolbar {
      display: flex;
    }
    #settings-toolbar div {
      line-height: 3em;
      padding: 0 40px;
    }
    #settings-toolbar div:nth-child(1) {
      border-top: 2px solid black;
      border-left: 2px solid black;
      border-right: 2px solid black;
    }
    #settings-toolbar div:nth-child(2) {
      border-top: 2px solid black;
      border-right: 2px solid black;
    }

    #settings-body {
      border: 2px solid black;
      height: calc(100% - 60px);
    }

    #settings-cards-tab {
      display: flex;
      height: 100%;
    }

    #settings-all-cards {
      min-width: 500px;
      overflow: auto;
    }
    #settings-all-cards div {
      border-bottom: 2px solid grey;
      line-height: 4em;
      padding-left: 1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #settings-selected-card {
      border: 1px solid blue;
      width: 100%;
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
  const totalPlayed = upCards.length + downCards.length
  const totalCount = playState?.totalCount || 0

  return html`<div id='app'>
    ${(state.app.settings.show && renderSettings(state, emit)) || null}
    ${(nextCard && renderNextCard(nextCard, totalPlayed, totalCount, emit)) || null}
    <div id='toolbar'>
      <div>
        <button disabled=${!canStart} onclick=${() => emit('start', slideName)} class='emoji-icon' style='cursor: ${canStart ? 'pointer' : 'default'}'>▶</button>
        <button disabled=${!canStop} onclick=${() => emit('stop')} class='emoji-icon' style='cursor: ${canStop ? 'pointer' : 'default'}'>⏹</button>
        <button disabled=${!canBack} onclick=${() => emit('back')} class='emoji-icon' style='cursor: ${canBack ? 'pointer' : 'default'}'>⏪</button>
        <button disabled=${!canTurnCards} onclick=${() => emit('turn-cards')} class='emoji-icon' style='cursor: ${canTurnCards ? 'pointer' : 'default'}'>🔁</button>
      </div>
        <button disabled=${!canShowSettings} onclick=${() => emit('settings:toggle')} class='emoji-icon' style='cursor: ${canShowSettings ? 'pointer' : 'default'}'>⚙</button>
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

function renderNextCard (card, totalPlayed, totalCount, emit) {
  return html`<div id='next-card'>
    <div style="font-size: 2em; line-height: 2em;"><center>${card.title}</center></div>
    <div style="display: flex; justify-content: space-between;">
      <button onclick=${() => emit('vote-up', card)} class='emoji-icon'>➕</button>
      <div>( ${totalPlayed + 1} / ${totalCount} )</div>
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

function renderSettings (state, emit) {
  const { activeTab } = state.app.settings
  return html`<div id='settings'>
    <div id='settings-toolbar'>
      <div onclick=${() => emit('settings:set-tab', 'cards')} style="background: ${activeTab === 'cards' ? '#44ec4f' : 'inherit'}">cards</div>
      <div onclick=${() => emit('settings:set-tab', 'slides')} style="background: ${activeTab === 'slides' ? '#44ec4f' : 'inherit'}">slides</div>
    </div>
    <div id='settings-body'>
      ${(activeTab === 'cards' && renderSettingsCardsTab(state, emit)) || null}
      ${(activeTab === 'slides' && renderSettingsSlidesTab(state, emit)) || null}
    </div>
  </div>`
}

function renderSettingsCardsTab (state, emit) {
  const { allCards } = state.app
  return html`<div id='settings-cards-tab'>
    <div id='settings-all-cards'>
      ${allCards.map(c => {
        return html`<div>${c.title}</div>`
      })}
    </div>
    <div id='settings-selected-card'>${renderSettingsSelectedCard(state, emit)}</div>
  </div>`
}

function renderSettingsSelectedCard (state, emit) {
  const { selected } = state.app.settings.tabs.cards
  if (selected) {
    console.log('selected card', selected)
    return html`<div>
      SELECTED A CARD
    </div>`
  } else {
    return null
  }
}

function renderSettingsSlidesTab (state, emit) {
  return html`<div id='settings-slides-tab'>
    this is the slides tab
  </div>`
}

app.route('*', (state, emit) => {
  return html`<body style="margin: 0; height: 100%; background: lightgray;">
    ${style()}
    ${appView(state, emit)}
  </body>`
})

app.mount(document.body)
