export type ContributionType = 'text' | 'image' | 'audio';

export interface Reaction {
  emoji: string;
  count: number;
}

export interface ContributionReply {
  id: string;
  author: string;
  timestamp: string;
  summary: string;
  aiTranslation?: string;
}

export interface Contribution {
  id: string;
  type: ContributionType;
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
  aiTranslation: string;
  imageUrl?: string;
  audioUrl?: string;
  aiTranscript?: string;
  tags?: string[];
  replyCount?: number;
  reactions?: Reaction[];
  replies?: ContributionReply[];
}

export interface Debate {
  id: string;
  title: string;
  description: string;
  participantCount: number;
  contributionCount: number;
  status: 'open' | 'deliberation' | 'closed';
  startDate?: string;
  endDate?: string;
  tags: string[];
  contributions: Contribution[];
  aiSummary?: Array<{
    overview: string;
    keyPoints: string[];
    topics: string[];
    lastUpdated: string;
  }>;
  aiQuestions?: string[];
}

export const mockDebates: Debate[] = [
  {
    id: '1',
    title: 'Baterías autoinstalables de 5kWh también en pisos por menos de 1.500 euros',
    description: 'La idea es que podamos ofrecer la posibilidad de que todo el mundo por fin pueda participar de una forma activa para mover fácilmente consumos de las horas punta y llana a las horas valle. Tan simple como instalar una batería de 5 kWh en cada vivienda, tenga paneles solares o no. Solo hay que cargar las baterías de lunes a viernes de madrugada para evitar luego algunas horas punta. Estas baterías solo requieren instalar un meter en el cuadro eléctrico, enchufar la batería a una base de enchufe bien dimensionada, y una buena conexión wifi. Cualquier friki de Som Energia la puede instalar, pero desde los grupos locales podríamos ayudar.',
    participantCount: 6,
    contributionCount: 10,
    status: 'open',
    startDate: '2026-02-22T00:00:00',
    tags: ['Batteries', 'Self-supply', 'Saving', 'Flexibility'],
    contributions: [
      {
        id: '1-1',
        type: 'text',
        author: 'Jaume Josa Pons',
        timestamp: '2026-02-23T13:05:00',
        content: 'Una idea excelente, que sería una gran iniciativa para la cooperativa si se pudiese ofrecer, quizàs a través de la red de empresas instaladoras, que ya existe. Sería bueno pactar un rango de precios. Pensando en clave futura, y sumando nuestra experiencia en casa, debería ser fácil en un futuro a corto-medio plazo poder ampliar a 10 kWh. A medida que los hogares electrifican lo que aún estén haciendo con fósiles (calefacción, agua caliente, coche de combustión,...) el consumo eléctrico del hogar aumentará y los 5 kWh quedarán muy cortos.',
        aiTranslation: "An excellent idea, which would be a great initiative for the cooperative if it could be offered, perhaps through the network of installation companies that already exists. It would be good to agree on a price range. Thinking ahead, and drawing on our experience at home, it should be easy in the short-to-medium term to expand to 10 kWh. As households electrify what they are still doing with fossil fuels (heating, hot water, combustion engine cars...), household electricity consumption will increase and 5 kWh will fall very short.",
        tags: ['argument'],
        replyCount: 1,
        reactions: [{ emoji: '👍', count: 7 }, { emoji: '🔥', count: 2 }],
        replies: [
          {
            id: 'r1-1-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-02-24T21:27:00',
            summary: 'Totalmente de acuerdo en escalar a 10 kWh, pero discrepa en usar empresas instaladoras: por instalar baterías tan simples cobrarían más que la batería misma. La parte más compleja es el smart meter con su pinza amperimétrica, y eso los grupos locales pueden hacerlo sin problema.',
            aiTranslation: 'Fully agrees on scaling to 10 kWh, but disagrees on using installation companies: for such a simple battery installation they would charge more than the battery itself. The most complex part is the smart meter with its clamp meter, and local groups can handle that without any problem.',
          },
        ],
      },
      {
        id: '1-2',
        type: 'text',
        author: 'José Luis de Hoyos Guerrero',
        timestamp: '2026-02-24T22:05:00',
        content: 'Yo tengo instalación fotovoltaica de autoconsumo con un inversor híbrido de Huawei de la serie SL2000-XXX-L sin batería. Esta versión acabada en "L", no en "L1", no permite poner la instalación en "modo isla" y por tanto, no es compatible con el backup de Toscano y ya tengo un "meter" en el cuadro eléctrico que se comunica con el inversor mediante RS-245. Mi pregunta es: ¿Podría instalar este tipo de batería en mi casa? ¿Sería compatible con mi instalación? ¿Tendría que instalar otro "meter" con WiFi? Mi hermana tiene una instalación similar, pero con un inversor "L1", que sí permite el modo isla. ¿Sería posible en este caso? Como dice Jaume, ¿existen ya baterías de ese tipo de 10 kWh?',
        aiTranslation: "I have a self-supply photovoltaic installation with a Huawei hybrid inverter from the SL2000-XXX-L series without a battery. This version ending in \"L\", not \"L1\", does not allow the installation to be put into \"island mode\" and therefore is not compatible with the Toscano backup, and I already have a \"meter\" in the electrical panel that communicates with the inverter via RS-245. My question is: Could I install this type of battery in my home? Would it be compatible with my installation? Would I need to install another \"meter\" with WiFi? My sister has a similar installation, but with an \"L1\" inverter, which does allow island mode. Would that be possible in her case? As Jaume says, do 10 kWh batteries of that type already exist?",
        tags: ['question'],
        replyCount: 2,
        reactions: [{ emoji: '🤔', count: 5 }, { emoji: '💡', count: 3 }],
        replies: [
          {
            id: 'r1-2-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-02-24T22:39:00',
            summary: 'Estas baterías son compatibles con todos los inversores y microinversores. El smart meter lee si entra o sale energía de la red: si sale (inyección), la batería carga; si entra (demanda), la batería descarga. Es compatible con cualquier inversor mientras el smart meter esté bien instalado en la fase principal.',
            aiTranslation: 'These batteries are compatible with all inverters and microinverters. The smart meter reads whether energy is entering or leaving the grid: if it leaves (injection), the battery charges; if it enters (demand), the battery discharges. It is compatible with any inverter as long as the smart meter is properly installed on the main phase.',
          },
          {
            id: 'r1-2-2',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-02-24T22:40:00',
            summary: 'Se pueden apilar hasta 3 baterías en serie almacenando hasta 15 kWh, aunque ya no sale tan económico. Comparte enlaces a los modelos ampliables de Marstek Venus-A y Venus-D disponibles en Robinsun.',
            aiTranslation: 'Up to 3 batteries can be stacked in series to store up to 15 kWh, though it is no longer as economical. Shares links to the expandable Marstek Venus-A and Venus-D models available at Robinsun.',
          },
        ],
      },
      {
        id: '1-3',
        type: 'text',
        author: 'Sebastià Ribes Garolera',
        timestamp: '2026-02-25T09:52:00',
        content: 'Fascinant! Què esperem?',
        aiTranslation: "Fascinating! What are we waiting for?",
        tags: ['support'],
        replyCount: 0,
        reactions: [{ emoji: '🌱', count: 9 }, { emoji: '❤️', count: 6 }, { emoji: '👏', count: 4 }],
        replies: [],
      },
      {
        id: '1-4',
        type: 'text',
        author: 'Eloi Salcedo Suñol',
        timestamp: '2026-02-25T21:32:00',
        content: 'Lo veo muy interesante. Otra pregunta, ¿se puede instalar al exterior?',
        aiTranslation: "I find it very interesting. Another question: can it be installed outdoors?",
        tags: ['question'],
        replyCount: 1,
        reactions: [{ emoji: '🤔', count: 3 }, { emoji: '👍', count: 2 }],
        replies: [
          {
            id: 'r1-4-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-02-26T09:30:00',
            summary: 'Confirma que los modelos Marstek Venus-A y Venus-D son apilables y están pensados para instalación exterior, compartiendo enlaces a ambos en Robinsun.',
            aiTranslation: 'Confirms that the Marstek Venus-A and Venus-D models are stackable and designed for outdoor installation, sharing links to both on Robinsun.',
          },
        ],
      },
      {
        id: '1-5',
        type: 'text',
        author: 'Joan Talarn Munter',
        timestamp: '2026-02-26T17:35:00',
        content: 'Una molt bona idea! Jo tinc bateria (amb FV) i aquest hivern, que ha estat tan dolent per la baixa insolació, he estat fent el que proposa en Carlos: he carregat la bateria en les hores més barates per descarregar-la en les hores cares. No he fet cap càlcul de rendibilitat perquè jo ja la rendabilitzo carregant-la amb la FV. Ara bé, crec que caldria fer un estudi seriós de la rendibilitat de la bateria sense la FV. Tenint en compte el preu inicial de la bateria, quan temps es trigaria per amortitzar-la? Caldria fer una simulació una mica seriosa per convèncer respecte a la proposta. I un altre tema és com es pot automatitzar la programació de la bateria per no haver d\'estar programant-la cada dia. I un altre: caldria tenir la tarifa indexada per treure-li tot el profit?',
        aiTranslation: "A very good idea! I have a battery (with PV) and this winter, which has been so poor due to low sunlight, I've been doing what Carlos proposes: I've been charging the battery during the cheapest hours to discharge it during the expensive hours. I haven't done any profitability calculation because I already make it profitable by charging it with the PV. However, I think a serious study of the battery's profitability without the PV would be needed. Taking into account the initial price of the battery, how long would it take to pay it off? A fairly serious simulation would be needed to make the proposal convincing. Another issue is how the battery scheduling can be automated so you don't have to program it every day. And another: would you need to have an indexed tariff to get the most out of it?",
        tags: ['argument'],
        replyCount: 1,
        reactions: [{ emoji: '💡', count: 8 }, { emoji: '👍', count: 5 }, { emoji: '🔥', count: 2 }],
        replies: [
          {
            id: 'r1-5-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-03-03T00:08:00',
            summary: 'La variable clave es el precio de los peajes en punta y llana: cuanto más suban, mejor la rentabilidad. Sobre la tarifa, después de analizar la indexada, cree que la tarifa fija sale mejor por los malos días de verano e invierno; aunque con la indexada sí tendría sentido inyectar desde la batería en los momentos más caros.',
            aiTranslation: 'The key variable is the price of peak and off-peak tolls: the higher they rise, the better the profitability. On the tariff, after analysing the indexed option, he believes the fixed tariff works out better due to poor summer and winter days; though with the indexed tariff it would make sense to inject from the battery at the most expensive moments.',
          },
        ],
      },
      {
        id: '1-6',
        type: 'image',
        author: 'Carlos Codina Mellado',
        timestamp: '2026-02-27T10:15:00',
        content: 'Aquí us deixo una foto de la Marstek Venus E instal·lada a casa de la meva sogra. Com podeu veure, simplement s\'endolla a una presa convencional. El smart meter és la caixa negra petita al costat del quadre elèctric. Tota la instal·lació va durar menys d\'una hora.',
        aiTranslation: "Here I leave you a photo of the Marstek Venus E installed at my mother-in-law's home. As you can see, it simply plugs into a standard outlet. The smart meter is the small black box next to the electrical panel. The entire installation took less than an hour.",
        imageUrl: 'https://images.unsplash.com/photo-1591964006776-90b32e88f5ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHBvd2VyJTIwc3RhdGlvbiUyMGJhdHRecnklMjBob21lJTIwZW5lcmd5fGVufDF8fHx8MTc3MzQyMDgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
        tags: ['evidence'],
        replyCount: 3,
        reactions: [{ emoji: '😮', count: 12 }, { emoji: '🔥', count: 9 }, { emoji: '👍', count: 7 }],
        replies: [
          {
            id: 'r1-6-1',
            author: 'Jaume Josa Pons',
            timestamp: '2026-02-27T11:00:00',
            summary: 'Impressionat per com de compacta és. Pregunta quants dB fa de soroll en funcionament i si molesta a la nit quan carrega.',
            aiTranslation: 'Impressed by how compact it is. Asks how many dB of noise it makes during operation and whether it is a nuisance at night when charging.',
          },
          {
            id: 'r1-6-2',
            author: 'Eloi Salcedo Suñol',
            timestamp: '2026-02-27T12:30:00',
            summary: 'Vol saber on s\'ha col·locat exactament el smart meter respecte al magnetotèrmic principal i si cal cap permís de l\'administrador de la finca.',
            aiTranslation: 'Wants to know exactly where the smart meter has been placed relative to the main circuit breaker, and whether any permission from the building manager is required.',
          },
          {
            id: 'r1-6-3',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-02-27T18:45:00',
            summary: 'Respon que el soroll és inapreciable (menys de 30 dB) i que no cal cap permís ja que tot va dins del quadre privat del pis. El smart meter es pinça a la fase principal sense tallar el subministrament.',
            aiTranslation: 'Replies that the noise is imperceptible (less than 30 dB) and that no permission is needed since everything goes inside the private panel of the flat. The smart meter clamps onto the main phase without cutting the supply.',
          },
        ],
      },
      {
        id: '1-7',
        type: 'image',
        author: 'Joan Talarn Munter',
        timestamp: '2026-02-28T09:00:00',
        content: 'Gràfica del meu consum de la setmana passada exportada des de l\'app de la bateria. Les barres blaves són consum de xarxa i les verdes descàrrega de bateria. Es veu clarament com la bateria cobreix quasi tota la punta del matí (7h-10h) i la del vespre (18h-22h). Els dies de cap de setmana la lògica de càrrega/descàrrega és diferent.',
        aiTranslation: "Graph of my consumption from last week exported from the battery app. The blue bars are grid consumption and the green ones are battery discharge. You can clearly see how the battery covers almost the entire morning peak (7am–10am) and the evening peak (6pm–10pm). On weekends, the charge/discharge logic is different.",
        imageUrl: 'https://images.unsplash.com/photo-1766853042063-e7fbaccb42c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMGNvbnN1bXB0iufGVufDF8fHx8MTc3MzQyMDgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
        tags: ['evidence'],
        replyCount: 2,
        reactions: [{ emoji: '📊', count: 10 }, { emoji: '💡', count: 8 }, { emoji: '👏', count: 5 }],
        replies: [
          {
            id: 'r1-7-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-02-28T10:30:00',
            summary: 'Agraeix molt la gràfica real. Confirma que el patró és exactament el que s\'espera i pregunta quin és el consum total diari del pis per calcular el percentatge d\'estalvi real.',
            aiTranslation: 'Very grateful for the real graph. Confirms the pattern is exactly as expected and asks what the total daily consumption of the flat is in order to calculate the actual savings percentage.',
          },
          {
            id: 'r1-7-2',
            author: 'Sebastià Ribes Garolera',
            timestamp: '2026-02-28T14:00:00',
            summary: 'Demana si l\'app permet exportar les dades en CSV per poder-les analitzar amb eines externes o integrar-les amb el portal de Som Energia.',
            aiTranslation: 'Asks whether the app allows data to be exported as CSV so it can be analysed with external tools or integrated with the Som Energia portal.',
          },
        ],
      },
      {
        id: '1-8',
        type: 'audio',
        author: 'Sebastià Ribes Garolera',
        timestamp: '2026-03-01T11:20:00',
        content: 'Nota de veu: experiència intentant comprar una bateria similar al mercat',
        aiTranslation: "Voice note: experience trying to buy a similar battery on the market",
        audioUrl: 'mock-audio-sebastia.mp3',
        aiTranscript: "I've been looking at prices at various online stores and the reality is that the price differences are enormous.The same 5 kWh battery can be found for anywhere between 800 and 2, 200 euros depending on the brand and the sales channel.What Carlos is proposing — that the cooperative import them directly from the factory — would make a lot of sense, because we don't have the structure to go and compare and negotiate with individual Chinese suppliers. Besides, if the cooperative guarantees compatibility and technical support, the added value perfectly justifies the price. I see it as a natural extension of what Som Energia already does with GenerationkWh.",
        tags: ['argument'],
        replyCount: 2,
        reactions: [{ emoji: '👍', count: 9 }, { emoji: '❤️', count: 4 }],
        replies: [
          {
            id: 'r1-8-1',
            author: 'Jaume Josa Pons',
            timestamp: '2026-03-01T13:00:00',
            summary: 'Totalment d\'acord amb la comparació amb GenerationkWh. Afegeix que la cooperativa podria negociar també la garantia i el servei postvenda, que ara és el punt feble de les bateries xineses directes.',
            aiTranslation: 'Fully agrees with the comparison to GenerationkWh. Adds that the cooperative could also negotiate the warranty and after-sales service, which is currently the weak point of direct Chinese batteries.',
          },
          {
            id: 'r1-8-2',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-03-02T09:00:00',
            summary: 'Confirma que Marstek ja té distribuïdors a Espanya i que Robinsun ofereix garantia de 5 anys. Proposa que Som Energia negociï un acord marc amb distribuïdors ja establerts com a primer pas, sense necessitat d\'importació directa.',
            aiTranslation: 'Confirms that Marstek already has distributors in Spain and that Robinsun offers a 5-year warranty. Proposes that Som Energia negotiate a framework agreement with established distributors as a first step, without the need for direct importing.',
          },
        ],
      },
      {
        id: '1-9',
        type: 'audio',
        author: 'José Luis de Hoyos Guerrero',
        timestamp: '2026-03-02T17:45:00',
        content: 'Nota de veu: actualització després d\'instal·lar el smart meter',
        aiTranslation: "Voice note: update after installing the smart meter",
        audioUrl: 'mock-audio-joseluis.mp3',
        aiTranscript: "Great news! Following Carlos's advice, I've installed the smart meter in my electrical panel. The installation was simpler than I expected, although at first I got confused about which was the main phase cable. The smart meter is already visible in the app and perfectly detects when my Huawei inverter feeds into the grid. Now I'm waiting for the battery to arrive to do the full test. If everything goes well, I'll make a short demo video for members who want to do it themselves. I think with a good video tutorial in Catalan and Spanish, many people in the local group could do it without any issues.",
        tags: ['evidence'],
        replyCount: 2,
        reactions: [{ emoji: '🎉', count: 14 }, { emoji: '👏', count: 11 }, { emoji: '🔥', count: 6 }],
        replies: [
          {
            id: 'r1-9-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-03-02T19:00:00',
            summary: 'Molt content de la bona notícia! Confirma que el vídeo seria un recurs fantàstic i s\'ofereix a revisar-ne el guió tècnic abans de gravar-lo.',
            aiTranslation: 'Very pleased with the good news! Confirms the video would be a fantastic resource and offers to review the technical script before recording.',
          },
          {
            id: 'r1-9-2',
            author: 'Joan Talarn Munter',
            timestamp: '2026-03-03T08:30:00',
            summary: 'Proposa que el vídeo s\'allotgi al canal de YouTube de Som Energia i es distribueixi a través dels grups locals de Telegram per arribar al màxim de socis possible.',
            aiTranslation: 'Proposes that the video be hosted on Som Energia\'s YouTube channel and distributed via local Telegram groups to reach as many members as possible.',
          },
        ],
      },
      {
        id: '1-10',
        type: 'image',
        author: 'José Luis de Hoyos Guerrero',
        timestamp: '2026-03-03T10:00:00',
        content: 'Foto del smart meter instal·lat al meu quadre elèctric. La pinça amperimètrica va al cable de la fase principal d\'entrada. El dispositiu es connecta per wifi a l\'app de la bateria. Tot plegat ocupa menys espai del que m\'esperava i el quadre ha quedat molt net.',
        aiTranslation: "Photo of the smart meter installed in my electrical panel. The clamp meter goes on the main incoming phase cable. The device connects via WiFi to the battery app. All together it takes up less space than I expected and the panel looks very tidy.",
        imageUrl: 'https://images.unsplash.com/photo-1564164494009-3876b2d197f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2xlJTIwcGFuZWwlMjBzbWFydCUyMG1ldGVyJTIwaW5zdGFsbGF0iufGVufDF8fHx8MTc3MzQyMDgyNnww&ixlib=rb-4.1.0&q=80&w=1080',
        tags: ['evidence'],
        replyCount: 3,
        reactions: [{ emoji: '👏', count: 13 }, { emoji: '🌱', count: 7 }, { emoji: '😮', count: 5 }],
        replies: [
          {
            id: 'r1-10-1',
            author: 'Carlos Codina Mellado',
            timestamp: '2026-03-03T11:00:00',
            summary: 'Confirma que la instal·lació és perfecta i que la pinça amperimètrica està col·locada exactament on ha de ser. Diu que és la millor foto tutorial que ha vist fins ara per a aquest procés.',
            aiTranslation: 'Confirms the installation is perfect and the clamp meter is placed exactly where it should be. Says it is the best tutorial photo he has seen so far for this process.',
          },
          {
            id: 'r1-10-2',
            author: 'Eloi Salcedo Suñol',
            timestamp: '2026-03-03T12:30:00',
            summary: 'Pregunta si el model de smart meter que apareix a la foto és el que recomana el fabricant de la bateria o si n\'existeixen d\'alternatius compatibles i més econòmics.',
            aiTranslation: 'Asks whether the smart meter model in the photo is the one recommended by the battery manufacturer, or whether compatible and more affordable alternatives exist.',
          },
          {
            id: 'r1-10-3',
            author: 'Jaume Josa Pons',
            timestamp: '2026-03-03T14:00:00',
            summary: 'Demana permís per usar la foto al grup local de Telegram com a referència visual per als socis interessats. Proposa crear un mini-wiki col·laboratiu amb fotos i consells de la comunitat.',
            aiTranslation: 'Asks permission to use the photo in the local Telegram group as a visual reference for interested members. Proposes creating a collaborative mini-wiki with community photos and tips.',
          },
        ],
      },
    ],
    aiSummary: [
      {
        overview: "Carlos Codina Mellado proposes distributing self-installable 5 kWh home batteries for under €1,500, allowing members to shift consumption to off-peak hours. The cooperative would import directly from China, offer them at cost with a loyalty incentive, and aggregate capacity for flexibility markets. Members are enthusiastic but have raised questions about inverter compatibility and scalability to 10 kWh.",
        keyPoints: [
          "Plug-in 5 kWh battery, no construction work required, compatible with any inverter",
          "Target price ~€1,000 by importing from China, with no cooperative markup",
          "Loyalty mechanism: €1,500 with €500 refunded over 10 years (similar to GenerationkWh)",
          'Aggregating batteries to create a "super-battery" and enter flexibility markets',
          "Assisted installation via local groups and instructional videos, no professional installer needed",
          "Pending: serious profitability study without photovoltaic panels and automation of scheduling",
        ],
        topics: ['Energy storage', 'Self-supply', 'Grid flexibility', 'Cooperative economics', 'Energy transition'],
        lastUpdated: '2026-03-03T00:08:00',
      },
      {
        overview: "Citizens have highlighted the need for accessible, low-cost energy storage solutions as a key enabler for the energy transition. The discussion centers on how distributed battery systems could reduce reliance on fossil fuels while empowering households to manage their own energy consumption.",
        keyPoints: [
          "Distributed storage could reduce peak grid demand by up to 30%",
          "Community-based purchasing could lower individual unit costs significantly",
          "Integration with existing solar installations is a top priority for participants",
          "Regulatory clarity on grid connection standards is seen as a critical blocker",
        ],
        topics: ['Distributed energy', 'Battery storage', 'Energy transition', 'Grid stability'],
        lastUpdated: '2026-03-03T09:15:00',
      },
    ],
    aiQuestions: [
      'How can the compatibility of these batteries with all existing types of photovoltaic installations be guaranteed?',
      'What alternative financing strategies could we offer to facilitate the acquisition of batteries for members with fewer resources?',
      'How could we completely automate the charging/discharging schedule of the batteries without user intervention?',
    ],
  },
  {
    id: '2',
    title: 'Millores en la tarifa indexada: transparència i simulador de costos',
    description: 'Debat sobre com millorar la comprensió i l\'accessibilitat de la tarifa indexada entre els socis. Es proposa crear una eina de simulació que permeti comparar costos reals amb la tarifa fixa i la indexada, i millorar les comunicacions explicant el funcionament del mercat horari.',
    participantCount: 18,
    contributionCount: 23,
    status: 'open',
    startDate: '2026-01-10T00:00:00',
    tags: ['Tarifa indexada', 'Transparència', 'Eines digitals'],
    contributions: [
      {
        id: '2-1',
        type: 'text',
        author: 'Mireia Fontana Puig',
        timestamp: '2026-01-12T10:30:00',
        content: 'Molts socis no entenden realment quan els surt millor la tarifa indexada i quan la fixa. Un simulador senzill on puguis introduir el teu perfil de consum i veure la comparativa dels últims 12 mesos seria una eina molt poderosa per a la presa de decisions informada.',
        aiTranslation: "Many members don't really understand when the indexed rate works out better for them versus the fixed rate. A simple simulator where you can enter your consumption profile and see a comparison of the last 12 months would be a very powerful tool for informed decision-making.",
        tags: ['argument'],
        replyCount: 3,
        reactions: [{ emoji: '👍', count: 14 }, { emoji: '💡', count: 9 }, { emoji: '❤️', count: 4 }],
        replies: [
          {
            id: 'r2-1-1',
            author: 'Pol Esteve Mas',
            timestamp: '2026-01-12T14:00:00',
            summary: 'Totalment d\'acord. Afegeix que el simulador hauria de poder importar les dades de consum directament des del portal del soci per evitar entrada manual.',
            aiTranslation: 'Fully agrees. Adds that the simulator should be able to import consumption data directly from the member portal to avoid manual entry.',
          },
          {
            id: 'r2-1-2',
            author: 'Núria Abad Ferrer',
            timestamp: '2026-01-13T09:15:00',
            summary: 'Proposa que el simulador també mostri l\'impacte de tenir bateria o panells solars sobre l\'elecció de tarifa òptima.',
            aiTranslation: 'Proposes that the simulator also show the impact of having a battery or solar panels on the choice of optimal tariff.',
          },
          {
            id: 'r2-1-3',
            author: 'Mireia Fontana Puig',
            timestamp: '2026-01-13T11:00:00',
            summary: 'Molt bona idea la de Núria. Potser es podria fer en col·laboració amb el grup de treball de tecnologia que ja existeix a la cooperativa.',
            aiTranslation: 'Great idea from Núria. Perhaps it could be done in collaboration with the technology working group that already exists in the cooperative.',
          },
        ],
      },
      {
        id: '2-2',
        type: 'audio',
        author: 'Pol Esteve Mas',
        timestamp: '2026-01-14T16:00:00',
        content: 'Nota de veu sobre la complexitat de la factura indexada',
        aiTranslation: "Voice note about the complexity of the indexed invoice",
        audioUrl: 'mock-audio-pol.mp3',
        aiTranscript: "I've looked at my bill for the last six months and honestly it's very hard to understand why some months the indexed rate works out better and others worse. There are many variables: the daily market price, tolls, charges... I think we need much clearer communications — maybe a monthly newsletter explaining how the market performed and why our rate turned out the way it did.",
        tags: ['argument'],
        replyCount: 2,
        reactions: [{ emoji: '🤔', count: 6 }, { emoji: '👍', count: 5 }],
        replies: [
          {
            id: 'r2-2-1',
            author: 'Núria Abad Ferrer',
            timestamp: '2026-01-15T10:00:00',
            summary: 'Comparteix la frustració i suggereix que el butlletí podria incloure un gràfic senzill del preu horari del mes com a referència visual.',
            aiTranslation: 'Shares the frustration and suggests that the newsletter could include a simple graph of the hourly price for the month as a visual reference.',
          },
          {
            id: 'r2-2-2',
            author: 'Mireia Fontana Puig',
            timestamp: '2026-01-15T12:30:00',
            summary: 'Recorda que ja existeix el portal de transparència de OMIE, però que caldria integrar-ne les dades d\'una forma molt més digerible dins el portal Som Energia.',
            aiTranslation: 'Notes that the OMIE transparency portal already exists, but that its data would need to be integrated in a much more digestible form within the Som Energia portal.',
          },
        ],
      },
      {
        id: '2-3',
        type: 'text',
        author: 'Núria Abad Ferrer',
        timestamp: '2026-01-16T11:00:00',
        content: 'Una altra millora important seria poder canviar de tarifa fixa a indexada (i viceversa) des del portal del soci en qualsevol moment, sense haver de trucar a atenció al soci. Ara mateix el procés és massa lent i quan et decideixes ja ha canviat la situació del mercat.',
        aiTranslation: "Another important improvement would be being able to switch from a fixed to an indexed rate (and vice versa) from the member portal at any time, without having to call member support. Right now the process is too slow and by the time you decide, the market situation has already changed.",
        tags: ['question'],
        replyCount: 1,
        reactions: [{ emoji: '👏', count: 11 }, { emoji: '🔥', count: 5 }],
        replies: [
          {
            id: 'r2-3-1',
            author: 'Pol Esteve Mas',
            timestamp: '2026-01-16T15:45:00',
            summary: 'Afegeix que idealment hauria d\'haver-hi una opció de canvi automàtic basat en una previsió de preus, com ja fan alguns agregadors europeus.',
            aiTranslation: 'Adds that ideally there should be an automatic switching option based on a price forecast, as some European aggregators already do.',
          },
        ],
      },
    ],
    aiSummary: [
      {
        overview: 'Els socis demanen més eines i transparència al voltant de la tarifa indexada. Les principals propostes són: un simulador de costos que compari tarifes usant dades reals de consum, comunicacions mensuals explicant el comportament del mercat horari, i la possibilitat de canviar de tarifa des del portal del soci de forma immediata. Hi ha consens en que la complexitat actual desincentiva l\'adopció de la tarifa indexada, que podria ser molt beneficiosa per als perfils amb consum flexible.',
        keyPoints: [
          'Simulador de costos amb dades reals importades del portal del soci',
          'Butlletí mensual explicant el mercat horari i el resultat de la tarifa',
          'Canvi de tarifa autogestionat des del portal sense trucades',
          'Integració de variables com bateria i solar en la recomanació de tarifa',
          'Possibilitat de canvi automàtic basat en previsió de preus horaris',
        ],
        topics: ['Tarifa indexada', 'Portal del soci', 'Mercat elèctric', 'Autogestió', 'Transparència'],
        lastUpdated: '2026-01-16T15:45:00',
      },
      {
        overview: 'El debat evidencia que molts socis no entenen la diferència real de cost entre la tarifa fixa i la indexada en el seu cas concret. Es valora molt la idea d\'una eina personalitzada que, a partir del perfil de consum del soci, recomanés la tarifa òptima i calculés l\'estalvi potencial. La flexibilitat horària del consum emergeix com a factor clau per aprofitar la tarifa indexada.',
        keyPoints: [
          'Eina de recomanació personalitzada basada en el perfil de consum individual',
          'Visualització clara de les hores vall i punta per optimitzar el consum',
          'Notificacions en temps real quan el preu de l\'electricitat és especialment baix',
          'Formació i acompanyament per a socis amb menys coneixements digitals',
          'Comparativa mensual automàtica: cost real vs. cost hipotètic amb tarifa fixa',
        ],
        topics: ['Educació energètica', 'Personalització', 'Eficiència de consum', 'Digitalització'],
        lastUpdated: '2026-01-17T10:30:00',
      },
    ],
  },
  {
    id: '3',
    title: 'Comunitats energètiques locals: model de governança i repartiment de beneficis',
    description: 'Com hauria de ser el model de governança de les comunitats energètiques locals (CEL) impulsades per Som Energia? Debat sobre el repartiment de beneficis, la presa de decisions, la relació amb els ajuntaments i com garantir la inclusió de veïns sense recursos per invertir.',
    participantCount: 31,
    contributionCount: 47,
    status: 'deliberation',
    startDate: '2025-11-01T00:00:00',
    endDate: '2026-03-31T00:00:00',
    tags: ['Comunitats energètiques', 'Governança', 'Inclusió social'],
    contributions: [
      {
        id: '3-1',
        type: 'image',
        author: 'Laia Bosch Verdaguer',
        timestamp: '2025-11-05T10:00:00',
        content: 'Proposta de model de governança en tres capes: ajuntament com a promotor, Som Energia com a gestor tècnic, i veïns com a membres de la CEL amb vot en les decisions clau.',
        aiTranslation: "Proposal for a three-layer governance model: the municipality as promoter, Som Energia as technical manager, and residents as CEL members with voting rights on key decisions.",
        imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        tags: ['argument'],
        replyCount: 4,
        reactions: [{ emoji: '🌱', count: 16 }, { emoji: '👍', count: 11 }, { emoji: '❤️', count: 7 }],
        replies: [
          {
            id: 'r3-1-1',
            author: 'Ferran Olivé Castells',
            timestamp: '2025-11-06T09:00:00',
            summary: 'Valora el model de tres capes però proposa afegir una quarta per a les entitats socials del barri que puguin actuar com a prescriptores per als veïns amb menys recursos digitals.',
            aiTranslation: 'Values the three-layer model but proposes adding a fourth layer for neighbourhood social organisations that can act as facilitators for residents with fewer digital skills.',
          },
          {
            id: 'r3-1-2',
            author: 'Montse Grau Torras',
            timestamp: '2025-11-06T11:30:00',
            summary: 'Demana aclarir qui té la darrera paraula en cas de conflicte entre l\'ajuntament i els veïns sobre la destinació dels beneficis.',
            aiTranslation: 'Asks to clarify who has the final say in the event of a conflict between the municipality and residents over the allocation of profits.',
          },
          {
            id: 'r3-1-3',
            author: 'Laia Bosch Verdaguer',
            timestamp: '2025-11-07T10:15:00',
            summary: 'Respon que en el seu model els veïns tindrien sempre el 51% dels vots en decisions econòmiques, i l\'ajuntament tindria dret de veto només en temes urbanístics.',
            aiTranslation: 'Replies that in her model residents would always hold 51% of the votes on economic decisions, and the municipality would only have veto rights on urban planning matters.',
          },
          {
            id: 'r3-1-4',
            author: 'Bernat Sala Domènech',
            timestamp: '2025-11-07T16:00:00',
            summary: 'Comparteix l\'experiència de la CEL de Rubí on l\'ajuntament va voler quedar-se amb el 30% dels beneficis, cosa que va generar tensió. Demana que Som Energia estableixi uns mínims de governança per a totes les CEL.',
            aiTranslation: 'Shares the experience of the Rubí CEL where the municipality wanted to keep 30% of the profits, causing tension. Asks Som Energia to establish minimum governance standards for all CELs.',
          },
        ],
      },
      {
        id: '3-2',
        type: 'audio',
        author: 'Ferran Olivé Castells',
        timestamp: '2025-11-10T15:30:00',
        content: 'Nota de veu sobre inclusió social a les comunitats energètiques',
        aiTranslation: "Voice note about social inclusion in energy communities",
        audioUrl: 'mock-audio-ferran.mp3',
        aiTranscript: "The big challenge I see is how we make CELs (community energy communities) truly inclusive. If residents have to make an initial contribution to participate, we're automatically excluding lower-income families — who paradoxically would benefit the most. We need to think about participation mechanisms with no upfront contribution, or a minimal one, such as reduced social fees or even free participation for families at risk of energy poverty.",
        tags: ['argument'],
        replyCount: 3,
        reactions: [{ emoji: '❤️', count: 13 }, { emoji: '👏', count: 9 }, { emoji: '💡', count: 6 }],
        replies: [
          {
            id: 'r3-2-1',
            author: 'Montse Grau Torras',
            timestamp: '2025-11-11T09:00:00',
            summary: 'Proposa que una part dels beneficis de la CEL es destini automàticament a un fons de solidaritat per subvencionar la participació de famílies vulnerables.',
            aiTranslation: 'Proposes that a portion of the CEL\'s profits be automatically allocated to a solidarity fund to subsidise the participation of vulnerable families.',
          },
          {
            id: 'r3-2-2',
            author: 'Laia Bosch Verdaguer',
            timestamp: '2025-11-11T11:00:00',
            summary: 'Recorda que la llei ja preveu que les CEL tinguin membres "no inversors" que participen dels beneficis sense aportació de capital. Caldria incorporar-ho explícitament al model.',
            aiTranslation: 'Notes that the law already provides for CELs to have "non-investor" members who share in the profits without a capital contribution. This should be explicitly incorporated into the model.',
          },
          {
            id: 'r3-2-3',
            author: 'Bernat Sala Domènech',
            timestamp: '2025-11-12T10:30:00',
            summary: 'Afegeix que els serveis socials municipals podrien identificar i derivar famílies candidates a la participació gratuïta, fent de pont entre l\'administració i la CEL.',
            aiTranslation: 'Adds that municipal social services could identify and refer candidate families for free participation, acting as a bridge between the administration and the CEL.',
          },
        ],
      },
      {
        id: '3-3',
        type: 'text',
        author: 'Montse Grau Torras',
        timestamp: '2025-11-15T12:00:00',
        content: 'Sobre el repartiment de beneficis: crec que la clau és que sigui proporcional al consum i no a la inversió. Si una família gran consumeix més però no ha pogut invertir tant, no hauria de rebre menys beneficis. Això requereix un model de "crèdits d\'energia" on cada kWh consumit de la CEL es comptabilitza igual independentment de l\'aportació feta.',
        aiTranslation: "On the distribution of benefits: I think the key is that it should be proportional to consumption and not to investment. If a large family consumes more but hasn't been able to invest as much, they shouldn't receive fewer benefits. This requires an 'energy credits' model where each kWh consumed from the CEL is counted equally regardless of the contribution made.",
        tags: ['argument'],
        replyCount: 2,
        reactions: [{ emoji: '💡', count: 14 }, { emoji: '🔥', count: 8 }, { emoji: '👍', count: 6 }],
        replies: [
          {
            id: 'r3-3-1',
            author: 'Ferran Olivé Castells',
            timestamp: '2025-11-16T09:30:00',
            summary: 'Matisa que el model de crèdits d\'energia és just però podria desincentivitzar la inversió privada. Proposa un model híbrid: part dels beneficis proporcionals al consum i part a la inversió.',
            aiTranslation: 'Nuances that the energy credits model is fair but could discourage private investment. Proposes a hybrid model: part of the profits proportional to consumption and part to investment.',
          },
          {
            id: 'r3-3-2',
            author: 'Bernat Sala Domènech',
            timestamp: '2025-11-16T14:00:00',
            summary: 'Comparteix un document de la UE on es detallen tres models de repartiment ja aprovats en països veïns, demanant estudiar-los com a referència per al model Som Energia.',
            aiTranslation: 'Shares an EU document detailing three distribution models already approved in neighbouring countries, asking that they be studied as a reference for the Som Energia model.',
          },
        ],
      },
    ],
    aiSummary: [
      {
        overview: 'Debat profund sobre com estructurar les comunitats energètiques locals (CEL) de Som Energia de manera que siguin democràtiques, financerament sostenibles i socialment inclusives. S\'han plantejat models de governança en múltiples capes (ajuntament, cooperativa, veïns, entitats socials), mecanismes per garantir la participació de famílies sense recursos i sistemes de repartiment de beneficis basats en consum i no sols en inversió. El debat es troba en fase de deliberació amb molts punts per concretar.',
        keyPoints: [
          'Model de governança en tres o quatre capes amb el 51% de vot econòmic per als veïns',
          'Som Energia hauria d\'establir mínims de governança per a totes les CEL que impulsi',
          'Participació sense aportació inicial per a famílies en risc de pobresa energètica',
          'Fons de solidaritat nutrit amb un percentatge dels beneficis de la CEL',
          'Repartiment de beneficis proporcional al consum, no sols a la inversió',
          'Col·laboració amb serveis socials municipals per a la identificació de famílies vulnerables',
        ],
        topics: ['Comunitats energètiques', 'Inclusió social', 'Governança democràtica', 'Pobresa energètica', 'Repartiment de beneficis'],
        lastUpdated: '2025-11-16T14:00:00',
      },
      {
        overview: 'Els participants subratllen que l\'èxit de les CEL depèn tant del model tècnic com de la capacitat de construir confiança entre veïns, ajuntaments i la cooperativa. Es debat la necessitat d\'una figura de facilitador comunitari remunerada per Som Energia que acompanyi cada CEL durant els seus primers anys de vida i asseguri la participació activa dels membres.',
        keyPoints: [
          'Figura de facilitador comunitari com a peça clau per a l\'èxit de les CEL',
          'Procés participatiu per definir les regles de la CEL abans de la seva constitució formal',
          'Plataforma digital pròpia de Som Energia per a la gestió i seguiment de les CEL',
          'Indicadors de salut democràtica: quòrum mínim, rotació de càrrecs, transparència econòmica',
          'Vinculació de les CEL a objectius de reducció de pobresa energètica al municipi',
        ],
        topics: ['Facilitació comunitària', 'Participació ciutadana', 'Plataforma digital', 'Democràcia energètica'],
        lastUpdated: '2025-11-17T09:00:00',
      },
    ],
    aiQuestions: [
      'How could we ensure that the proposed governance model is accepted by all stakeholders involved?',
      'What measures could we take to ensure that the distribution of benefits is fair and transparent for all CEL members?',
      'How could we integrate the participation of social entities into the CEL decision-making process?',
      'What strategies could we use to promote social inclusion in CELs and ensure that all families can benefit from them?',
      'How could we establish a monitoring and evaluation system to ensure that CELs are operating efficiently and fairly?',
    ],
  },
];