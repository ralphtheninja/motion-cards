const BLUE = '#3e3eff'
const RED = '#f96161'
const PURPLE = '#c11eee'

const allCards = [
  {
    title: '2 undantag i LAS för mindre företag',
    color: BLUE,
    id: 1
  },
  {
    title: 'Sjukpenninggrundande inkomst',
    color: RED,
    id: 2
  },
  {
    title: 'Statsbudget 2003',
    color: RED,
    id: 3
  },
  {
    title: 'Finansiering av boendet',
    color: RED,
    id: 4
  },
  {
    title: 'Statsbudget 2004',
    color: RED,
    id: 5
  },
  {
    title: 'Karensdagen',
    color: RED,
    id: 6
  },
  {
    title: 'Flexibla sjukskrivningsnivåer i sjukförsäkringen',
    color: RED,
    id: 7
  },
  {
    title: 'Statsbudget 2005',
    color: RED,
    id: 8
  },
  {
    title: 'Samhällsekonomisk konsekvensanalys vid nedskärning',
    color: RED,
    id: 9
  },
  {
    title: 'Statsbudget 2006',
    color: RED,
    id: 10
  },
  {
    title: 'Första Hjälpen',
    color: RED,
    id: 11
  },
  {
    title: 'Jämställdhet',
    color: BLUE,
    id: 12
  },
  {
    title: 'Statsbudget 2007',
    color: BLUE,
    id: 13
  },
  {
    title: 'Ändring i inkomstskattelagen',
    color: BLUE,
    id: 14
  },
  {
    title: 'En a-kassa för arbete',
    color: BLUE,
    id: 15
  },
  {
    title: 'Höjd sjukersättning',
    color: RED,
    id: 16
  },
  {
    title: 'Friskvård under arbetstid',
    color: RED,
    id: 17
  },
  {
    title: 'Multinationella företag och fackliga rättigheter',
    color: RED,
    id: 18
  },
  {
    title: 'Ytterligare reformer inom arbetsmarknadspolitiken',
    color: BLUE,
    id: 19
  },
  {
    title: 'Auktorisering av bemanningsföretag',
    color: RED,
    id: 20
  },
  {
    title: 'Kollektivavtal vid samhällsstöd till företag',
    color: RED,
    id: 21
  },
  {
    title: 'Bättre möjligheter till tidsbegränsad anställning',
    color: BLUE,
    id: 22
  },
  {
    title: 'Statsbudget 2008',
    color: BLUE,
    id: 23
  },
  {
    title: 'Förbättrad Jämställdhet',
    color: RED,
    id: 24
  },
  {
    title: 'En effektivare a-kassa',
    color: BLUE,
    id: 25
  },
  {
    title: 'Återinför en solidarisk a-kassa',
    color: RED,
    id: 26
  },
  {
    title: 'En reformerad sjukskrivningsprocess för ökad återgång i arbete',
    color: BLUE,
    id: 27
  },
  {
    title: 'Kommunalt vårdnadsbidrag',
    color: BLUE,
    id: 28
  },
  {
    title: 'Beredskapslager av antiviraler inför en pandemi',
    color: RED,
    id: 29
  },
  {
    title: 'Arbetsmiljöverkets resurser',
    color: RED,
    id: 30
  },
  {
    title: 'Statsbudget 2009',
    color: BLUE,
    id: 31
  },
  {
    title: 'Internationella fackliga sympatiåtgärder',
    color: RED,
    id: 32
  },
  {
    title: 'Förbättrade och förenklade villkor för a-kassan',
    color: BLUE,
    id: 33
  },
  {
    title: 'Vinstutdelning i välfärden',
    color: RED,
    id: 34
  },
  {
    title: 'En förenklad semesterlag',
    color: BLUE,
    id: 36
  },
  {
    title: 'Vuxenutbildning',
    color: RED,
    id: 37
  },
  {
    title: 'Rättvis a-kassa även för deltidsanställda',
    color: RED,
    id: 38
  },
  {
    title: 'Förstärkt forskning om och tillsynen av arbetsmiljön',
    color: RED,
    id: 39
  },
  {
    title: 'Åtgärder med anledning av Lavaldomen',
    color: BLUE,
    id: 40
  },
  {
    title: 'Svenska modellen och kollektivavtal',
    color: RED,
    id: 41
  },
  {
    title: 'Statsbudget 2011',
    color: BLUE,
    id: 42
  },
  {
    title: 'En återupprättad välfärd',
    color: BLUE,
    id: 43
  },
  {
    title: 'Nolltolerans mot arbetsolycksfall',
    color: RED,
    id: 44
  },
  {
    title: 'Höjd a-kassa',
    color: RED,
    id: 45
  },
  {
    title: 'Tillämpning av reglerna för a-kassan',
    color: RED,
    id: 46
  },
  {
    title: 'Bättre villkor för småföretagare',
    color: RED,
    id: 47
  },
  {
    title: 'Statsbudget 2012',
    color: BLUE,
    id: 48
  },
  {
    title: 'Nollvision för allvarliga skador på jobbet',
    color: RED,
    id: 49
  },
  {
    title: 'Nolltolerans mot dödsolyckor på jobbet',
    color: RED,
    id: 50
  },
  {
    title: 'Arbetstagares rätt till fackligt skydd',
    color: BLUE,
    id: 51
  },
  {
    title: 'Företrädesrätt till återanställning',
    color: RED,
    id: 52
  },
  {
    title: 'Statsbudget 2013',
    color: BLUE,
    id: 53
  },
  {
    title: 'Stupstocken i sjukförsäkringssystemet',
    color: RED,
    id: 54
  },
  {
    title: 'Rehabiliteringskedjan',
    color: RED,
    id: 55
  },
  {
    title: 'Fas 3 i jobb och utvecklingsgarantin',
    color: RED,
    id: 56
  },
  {
    title: 'Utbildning och utveckling istället för arbetslöshet',
    color: RED,
    id: 57
  },
  {
    title: 'Långsiktigt stöd till kvinnojourer',
    color: RED,
    id: 58
  },
  {
    title: 'Statsbudget 2014',
    color: BLUE,
    id: 59
  },
  {
    title: 'Skapa ett ökat nyföretagande',
    color: RED,
    id: 60
  },
  {
    title: 'Bättre konkurrensvillkor för svenska företag',
    color: RED,
    id: 61
  },
  {
    title: 'Alliansbudget 2015',
    color: BLUE,
    id: 62
  },
  {
    title: 'Huvudentreprenörsansvar',
    color: RED,
    id: 63
  },
  {
    title: 'Statsbudget 2016',
    color: RED,
    id: 64
  },
  {
    title: 'Ungdomsarbetslösheten',
    color: RED,
    id: 65
  },
  {
    title: 'Statsbudget 2017',
    color: RED,
    id: 66
  },
  {
    title: 'En bättre arbetsmiljö för ett mänskligare arbetsliv',
    color: RED,
    id: 67
  },
  {
    title: 'Statsbudget 2018',
    color: RED,
    id: 68
  },
  {
    title: 'Kompetensutveckling i arbetslivet',
    color: RED,
    id: 69
  },
  {
    title: 'Företagshälsovården måste kvalitetssäkras',
    color: RED,
    id: 70
  },
  {
    title: 'Den svenska modellen är det bästa för Sverige',
    color: RED,
    id: 71
  },
  {
    title: 'En sjätte semestervecka',
    color: RED,
    id: 72
  },
  {
    title: 'M och KD budget 2019',
    color: BLUE,
    id: 73
  },
  {
    title: 'Hårdare tag mot arbetsrelaterad psykisk ohälsa',
    color: RED,
    id: 74
  },
  {
    title: 'S C L MP budget 2020',
    color: PURPLE,
    id: 75
  },
  {
    title: 'Utvidgad tillträdesrätt för RSO',
    color: RED,
    id: 76
  },
  {
    title: 'S C L MP budget 2021',
    color: PURPLE,
    id: 77
  },
  {
    title: 'Arbetsmiljö',
    color: BLUE,
    id: 78
  },
  {
    title: 'Höjd semesterersättning',
    color: RED,
    id: 79
  },
  {
    title: 'Lönegaranti vid konkurs',
    color: RED,
    id: 80
  },
  {
    title: 'Heltid som norm',
    color: RED,
    id: 81
  },
  {
    title: 'Utökat skydd mot föreningsrättskränkning',
    color: RED,
    id: 82
  },
  {
    title: 'En nollvision för mäns våld mot kvinnor',
    color: RED,
    id: 83
  },
  {
    title: 'Jämställt arbetsliv',
    color: RED,
    id: 84
  },
  {
    title: 'M SD KD budget 2022',
    color: BLUE,
    id: 85
  }
]

const slides = [
  {
    name: 'slide1',
    cards: allCards.map(c => c.id)
  }
]

module.exports = { allCards, slides }
