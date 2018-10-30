import 'bootstrap'
import 'toastr/build/toastr.css' // You need style and css loader installed and set
import Vue from 'vue'
import jQuery from 'jquery'

window.moment = require('moment')
window.ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
window.toastr = require('toastr')
window.Vue = Vue
window.$ = window.jQuery = jQuery

Vue.config.productionTip = false

require('./jsoneditor.js')
require('@/components/main/frontend/event-notification')

window['indexData'] = {
  en: {
    how: {
      title: "Here's How Shift Works.",
      sliderItems: [
        {
          title: "Decentralized apps",
          imageKey: 'dapps',
          descriptions: [
            "Shift is an accessible and open-source blockchain application platform. Developers can create their own decentralized applications (dApp) with the benefit of an easy setup. Each dApp will have its own sidechain that is independent from Shift’s main chain, but sidechains can still connect to and synchronize with the main chain. This enables infinite scalability without endangering the stability of the main chain.",
            "Shift’s blockchain technology is written in JavaScript, encouraging mass-adoption since coders are already familiar with this programming language. Every dApp will have access to Shift’s own IPFS cluster to store data using a promising peer-2-peer hypermedia distribution protocol, the InterPlanetary File System. The existence of the Shift token — defined as a utility coin — allows every dApp owner to implement an intrinsic monetization model or trading platform for digital assets in their dApp."
          ]
        },
        {
          title: "dPOS Blockchain",
          imageKey: 'dpos',
          descriptions: [
            "Shift uses a delegated Proof-of-Stake (dPOS) consensus algorithm, and its network consists of master nodes and delegate nodes. Delegate nodes are allowed to make changes in the blockchain (i.e., the distributed and decentralized ledger). 101 out of an infinite number of delegate nodes are selected to participate in delegate rounds based on obtaining the community’s approval votes to become block producers. Every token holder is able to cast a maximum of 101 different votes on their 101 favorite delegates, and/or become a delegate themselves. A vote is proportional to the token holder’s account balance. Every delegate round, the 101 delegates with the highest approval rate (i.e., backed by the largest amount of Shift tokens) are selected to generate blocks for the delegate round. Block producers are rewarded with block rewards in the form of new tokens that are released by the ShiftNRG software.",
            "The system functions at its best when token holders vote for the delegates with the highest productivity, as well as delegates that reinvest a part of their forged Shift tokens in the project’s development. Shift will introduce a new version of this dPOS consensus algorithm very soon, which will be unique within the ecosystem of dPOS platforms on the market."
          ]
        },
        {
          title: "Hydra CMS",
          imageKey: 'hydra',
          descriptions: [
            "Hydra is a content management system (CMS) written in pure JavaScript: it is compatible with the InterPlanetary File System and being pre-built into the Shift cluster of storage nodes. This makes Shift the first ever project to bring decentralized database solutions to the promising hypermedia distribution protocol. This pre-build allows the Shift application platform to support the decentralized web hosting of dynamic content.",
            "The Shift Team is also working on the compatibility of websockets with IPFS, such that there will be a socket client at IPFS and a socket server at the cluster, even though IPFS’ pubsub is still in development and not yet completed as an alternative to traditional websockets. Shift’s socket solution will support the ability to host “in real-time” websites that are truly decentralized."
          ]
        },
        {
          title: "Jenga DNS monitor",
          imageKey: 'jenga',
          descriptions: [
            "Jenga is a domain name system (DNS) monitor that continuously monitors all storage nodes in the Shift cluster to populate DNS records. Nodes which point to unhealthy DNS records are removed from the cluster. The resulting construction is almost resistant to DDoS attacks. One domain can be pointed to anywhere, from ten to one-thousand nodes that serve your files.",
            "We thus found a smart way to bridge the old internet (DNS/http) to the new web. Jenga is the closest you can get to decentralized DNS, since true decentralized DNS does not exist yet. This is accomplished without requiring the end user to install any third-party extensions, plugins, or browser add-ons. In essence, Shift is already the world’s first taste of Web 3.0: uncensorable, and secure."
          ]
        },
        {
          title: "Decentralized storage layer",
          imageKey: 'phantom',
          descriptions: [
            "Shift uses a peer-2-peer hypermedia distribution protocol, the InterPlanetary File System (IPFS), as a storage layer upon the blockchain. In essence, IPFS is a much smarter protocol than HTTP, since IPFS uses hash-based file storage in contrast to HTTP which uses location-based storage. The Shift Team regards this protocol as a key contributor to the decentralization of the internet. Besides IPFS (Filecoin) itself, Shift is ahead in its IPFS tool development and on the implementation of IPFS with blockchain technology. Shift is the first project to ever successfully build a working IPFS cluster for data storage. The prototype, our pre-beta, is already functional on Shift’s testnet."
          ]
        }
      ],
      dapps: {
        left: [
          {
            title: "Phantom",
            descriptions: [
              "Shift’s first official dApp, called Phantom, is a user interface for file management over the IPFS network on Shift’s cluster. Data can be pinned — based on a tokenomic services model — to be permanently stored on the cluster. Phantom also contains a wizard that enables decentralized web hosting and supports the management of real top level domains."
            ]
          },
          {
            title: "Sidechains",
            descriptions: [
              "Phantom will soon have its own chain, as a sidechain tied to Shift’s main chain. The Phantom sidechain will have its own rules and transaction types, allowing endless possibilities. The prototype, which is a pre-beta, is already functional at Shift’s testnet. This very website is already powered by our storage nodes."
            ]
          }
        ],
        right: [
          {
            title: "Tokenomic services model",
            descriptions: [
              "The cluster consists of a swarm of storage nodes (peers). Every token holder is able to join the cluster, and can provide disk space (storage capacity) to the Shift cluster. In 2018, Shift will present a tokenomic services model which will make it economically beneficial to join the cluster.",
              "Shift tokens can also be used for making a request to use a certain part of the available disk space that is provided by the cluster. Data can be published and pinned on the cluster. This means it will be stored permanently on the cluster — as long as the content publisher holds tokens as Proof-of-Storage."
            ]
          },
          {
            title: "Complimentary file transfers",
            descriptions: [
              "It is also possible to send files (free of charge) outside the cluster, to all peers that are connected to the cluster but which are not part of it. However, these peers running an IPFS daemon will likely have a garbage collector that removes stored files occasionally, creating a cache."
            ]
          }
        ]
      }
    },
    intro: {
      title: "Right now, you're already on the decentralized web",
      subtitle: {
        firstLine: "...with no browser plugins, and real top level domains.",
        secondLine: "This is Phantom: Shift's flagship dApp for disrupting the hosting industry."
      },
      dataTitle: "That’s right: this website is hosted, replicated, and monitored through the Shift IPFS cluster!"
    },
    uses: {
      title: "Join the New Web Revolution",
      items: [
        {
          title: "One of the biggest threats to the web today is the web itself.",
          description: "Businesses can unilaterally shut down (e.g.: Gothamist, DNAinfo), taking independent writers’ data with them. Shift and Phantom allow this kind of disaster to be avoided: user content is stored in a decentralized fashion, ensuring that authors can always retain access."
        },
        {
          title: "In the near future, the web will evolve beyond the existing systems and infrastructure.",
          description: "In order to do so, there must be replacement protocols and services made available for everyone to join the new web revolution. This is the mission of Shift and Phantom: to augment and replace classical hosting and DNS providers."
        },
        {
          title: "For any decentralized system to work, users need to participate and must stand to gain a benefit.",
          description: "Enter Shift: it provides a utility token that users can use within the ecosystem to secure storage on the Phantom dApp or trade with others for services. Shift's delegated Proof-of-Stake consensus algorithm also allows for benefits to be earned by users who participate in the voting process which rewards others for contributing reliable nodes to the network."
        },
        {
          title: "Net Neutrality is one of the top threats today when it comes to accessing the internet.",
          description: "Providers can slow down connectivity, or charge additional fees to access certain services. With Phantom, it’s possible to circumvent the effects of such behavior, as the data is never centralized. Getting a website served from a group of peers is nearly impossible to stop, in contrast to the ease of metering access to certain services which have known internet footprints."
        }
      ],
      specs: {
        title: "Network specifications",
        consensusAlgorithm: "Consensus algorihm",
        delegatedProofOfStake: "Delegated Proof-Of-Stake",
        blockProducers: "Block producers",
        blockTime: "Block time",
        seconds: "seconds",
        roundTime: "Round time",
        minutes: "minutes",
        blockReward: "Block reward",
        forger: "forger",
        project: "project",
        supply: "Supply",
        inflation: "inflation",
        marketListings: "Market listings",
        mediaTitle: "Read About Shift in the Media"
      }
    },
    why: {
      items: [
        {
          title: "What do successful operating systems have in common?",
          descriptions: [
            "Consider the earliest example of a “killer app”: the VisiCalc spreadsheet software catapulted Apple II personal computers to unprecedented levels of adoption in the early 80s, simply because for ten months, the best spreadsheet software on the market was only available for the Apple II.",
            "Likewise, Microsoft invested heavily in promoting Internet Explorer as a user-friendly application with mass appeal because they understood that even without making IE the best browser on the market, including it as a built-in perk with Windows would facilitate adoption of both their application and their OS, driving software developers to follow suit in a snowballing effect which helped to make market dominance all but inevitable."
          ]
        },
        {
          title: "Shift is the first next-gen blockchain with a built-in “killer dApp.”",
          descriptions: [
            "While other companies are busy writing whitepapers and raising hundreds of millions of dollars, Shift has been busy working: we have created the backbone of a robust dApp ecosystem, with a strong and democratic dPOS platform of decentralization that can be used by anyone who knows JavaScript. The Phantom dApp with Shift will create a new decentralized web, empowering everyday users and keeping their content safe.",
            "We are confident that providing the first low cost, easy-to-use decentralized hosting infrastructure, which saves users money over traditional file storage methods and protects their content from external censorship, will act as a massive stimulus for the mainstream adoption of Shift."
          ]
        }
      ]
    }
  },
  fr: {
    how: {
      title: "Voici Comment Shift Fonctionne.",
      sliderItems: [
        {
          title: "Applications décentralisées",
          imageKey: 'dapps',
          descriptions: [
            "Shift est une plateforme d'applications sur la blockchain accessible et open-source. Les développeurs peuvent y créer leurs propres applications décentralisées (dApp) avec l'avantage d'une installation simple. Chaque dApp aura sa propre sidechain indépendante de la mainchain Shift, mais les sidechains pourront quand même s'y connecter afin de se synchroniser avec elle. Cela permet une scalabilité infinie sans mettre en danger la stabilité de la mainchain.",
            "La blockchain Shift a été codée en JavaScript, encourageant ainsi son adoption de masse, la plupart des développeurs étant familiers avec ce langage de programmation. Chaque dApp aura accès au cluster IPFS Shift afin d'y stocker des données en utilisant un protocole de distribution hypermedia prometteur, InterPlanetary File System (IPFS). L'existence du token Shift - un token utilitaire - permet à chaque propriétaire de dApp d'implémenter un modèle de monétisation intrinsèque ou une plateforme d'échange pour des biens virtuels dans leur dApp."
          ]
        },
        {
          title: "Blockchain dPOS",
          imageKey: 'dpos',
          descriptions: [
            "Shift utilise un algorithme de consensus basé sur un Proof-of-Stake 'de délégués' (dPOS), et son réseau consiste en des noeuds maîtres et des noeuds délégués. Les noeuds délégués sont autorisés à effectuer des modifications dans la blockchain (sorte de registre décentralisé et distribué). Parmi un nombre infini de noeuds délégués, 101 sont sélectionnés pour participer à des cycles de délégation basés sur l'obtention des votes d'approbation de la communauté et de devenir des producteurs de blocks. Chaque détenteur de token a la possibilité de voter pour ses 101 délégués préférés, et/ou de devenir lui-même délégué. Le poids d'un vote est proportionnel à l'importance du solde du compte de ce détenteur de tokens. A chaque cycle de délégation, les 101 délégués avec le plus haut taux d'approbation (c'est-à-dire soutenus par le plus grand nombre de tokens Shift) sont sélectionnés pour générer des blocks le temps de ce cycle. Les producteurs de blocks sont rémunérés par des récompenses de blocks sous la forme de nouveaux tokens délivrés par le software ShiftNRG.",
            "Le système atteint son potentiel maximal d'efficacité lorsque les détenteurs de tokens votent pour les délégués avec la productivité la plus importante, ainsi que ceux qui réinvestissent une part de leurs tokens Shift forgés dans le développement du projet. Shift introduira très prochainement une nouvelle version de cet algorithme de consensus dPOS, qui sera le seul du genre dans l'écosystème des plateformes dPOS du marché."
          ]
        },
        {
          title: "CMS Hydra",
          imageKey: 'hydra',
          descriptions: [
            "Hydra est un système de gestion de contenu (CMS) écrit en pur JavaScript: il est compatible avec IPFS (InterPlanetary File Système) et est incorporé dans le cluster de noeuds de stockage de Shift. Cela fait de Shift le tout premier projet à offrir une solution de base de données décentralisée au protocole prometteur de distribution hypermedia. Cela permet à la plateforme applicative Shift de gérer l'hébergement web décentralisé de contenus dynamiques.",
            "L'équipe Shift travaille également sur la compatibilité des websockets avec IPFS, de façon à obtenir un socket 'client' côté IPFS et un socket 'serveur' côté cluster, même si le système de pubsub IPFS est encore en développement et pas encore utilisable en tant qu'alternative aux websockets traditionnels. La solution de sockets Shift permettra d'héberger des sites web de type 'temps réel' qui seront véritablement décentralisés."
          ]
        },
        {
          title: "Controleur de DNS Jenga",
          imageKey: 'jenga',
          descriptions: [
            "Jenga est un contrôleur DNS (Domain Name System) qui surveille en continu tous les noeuds de stockage sur le cluster Shift afin de gérer les entrées DNS. Les noeuds pointant sur des entrées DNS ne fonctionnant pas/mal sont supprimées du cluster. Le résultat est un système presque complètement résistant aux attaques DDoS. Un domaine peut rediriger partout, de dix à mille noeuds qui distribueront vos fichiers.",
            "Nous avons trouvé une façon intelligente pour relier l'internet 'classique' (DNS/http) au nouveau web. Jenga est le plus proche de que l'on pourrait appeler un DNS décentralisé, même si un véritable système de ce type n'existe pas vraiment encore. Tout cela est accompli sans que l'utilisateur final n'ait besoin d'installer une quelconque extension tierce, plugin, ou add-on sur son navigateur. Pour résumer, Shift est un premier pas dans ce que l'on peut appeler le Web 3.0: non censurable, et sécurisé."
          ]
        },
        {
          title: "Couche de stockage décentralisé",
          imageKey: 'phantom',
          descriptions: [
            "Shift utilise un protocole de distribution hypermedia p2p appelé IPFS (InterPlanetary File System) en tant que couche de stockage sur la blockchain. En quelques mots, IPFS est un protocole bien plus intelligent que HTTP, car il utilise un stockage de fichiers basé sur leur hash, contrairement à HTTP qui se base sur leur localisation. L'équipe Shift considère ce protocole comme un contributeur clef de la décentralisation d'Internet. Outre IPFS (Filecoin), Shift est largement en avance dans le développement de son outil IPFS et sur l'implémentation d'IPFS dans la technologie blockchain. Shift est le premier projet à parvenir à la construction d'un cluster IPFS dédié au stockage de données. Le prototype, en pre-beta, est déjà fonctionnel sur le testnet Shift."
          ]
        }
      ],
      dapps: {
        left: [
          {
            title: "Phantom",
            descriptions: [
              "La première dApp officielle de Shift, appelée Phantom, est une interface utilisateur permettant la gestion de fichiers sur le réseau IPFS du cluster Shift. Les données peuvent être épinglées - en se basant sur un modèle de services 'tokenomic' (économie basée sur des tokens) - afin d'être stocké de façon permanente sur le cluster. Phantom permet également l'hébergement web décentralisé, et supporte la gestion de véritables domaines de premier niveau."
            ]
          },
          {
            title: "Sidechains",
            descriptions: [
              "Phantom aura bientôt sa propre chain, qui sera une sidechain reliée à la mainchain Shift. La sidechain Phantom aura ses propres règles et types de transactions, permettant des possibilités infinies. Le prototype, actuellement en pre-beta, est déjà fonctionnel sur le testnet Shift. Le site web que vous visitez actuellement est déjà hébergé sur nos noeuds de stockage."
            ]
          }
        ],
        right: [
          {
            title: "Modèle de services 'tokenomics'",
            descriptions: [
              "Le cluster consiste en une nuée de noeuds de stockages (pairs). Chaque détenteur de token peut rejoindre le cluster, et offrir de l'espace disque (capacité de stockage) au cluster Shift. En 2018, Shift présentera un modèle de services basé sur des tokens qui rendra le fait de rejoindre le cluster financièrement rentable.",
              "Les tokens Shift peuvent également être utilisés pour effectuer une requête afin d'utiliser une certaine partie de l'espace disque proposé par le cluster. Des données peuvent être publiées et épinglées sur le cluster. Cela signifie qu'elles seront stockées de façon permanente sur le cluster - aussi longtemps que le gérant de ce contenu détient des tokens en tant que Proof-of-Storage (preuve de stockage)."
            ]
          },
          {
            title: "Transferts de fichiers complémentaires",
            descriptions: [
              "Il est également possible d'envoyer des fichiers (sans frais) à l'extérieur du cluster, à tous les pairs connectés au cluster mais sans en faire partie. Cependant, ces pairs faisant fonctionner un deamon IPFS auront probablement un 'garbage collector', système nettoyant de leur stockage les fichiers de façon régulière, créant un cache."
            ]
          }
        ]
      }
    },
    intro: {
      title: "Vous êtes déjà sur le web décentralisé",
      subtitle: {
        firstLine: "...sans extensions de navigateur, et sur de véritables domaines de premier niveau.",
        secondLine: "Phantom: la dApp phare de Shift faite pour bouleverser l'industrie de l'hébergement."
      },
      dataTitle: "En effet, ce site est hébergé, répliqué et contrôlé via le cluster IPFS Shift !"
    },
    uses: {
      title: "Rejoignez la Révolution du Nouveau Web",
      items: [
        {
          title: "L'une des plus grandes menaces planant sur le web aujourd'hui n'est autre que le web lui-même.",
          description: "Les entreprises peuvent fermer brutalement (ex: Gothamist, DNAinfo), emportant avec elles des données utilisateur. Shift et Phantom permettent d'éviter ce type de désastres: les contenus utilisateur sont stockés de façon décentralisée, en s'assurant que les propriétaires conservent toujours l'accès à leurs données."
        },
        {
          title: "Dans un futur proche, le web évoluera au-delà des sytèmes et infrastructures existants.",
          description: "Dans cette optique, de nouveaux protocoles et services doivent être rendus accessibles à tous afin de créer une nouvelle révolution web. C'est la mission de Shift et de Phantom: améliorer et remplacer les fournisseurs d'hébergement classique et de DNS."
        },
        {
          title: "Pour qu'un système décentralisé fonctionne, les utilisateurs doivent participer et en tirer un bénéfice.",
          description: "C'est la que Shift entre en jeu: il offre un token 'utilitaire' que les clients peuvent utiliser dans son écosystème afin de sécuriser leur stockage sur la dApp Phantom, ou d'échanger des services avec les autres utilisateurs. L'algorithme de consensus dPOS (Delegated Proof-of-Stake) de Shift permet également d'offrir des bénéfices aux utilisateurs participant au processus de vote, qui récompense les contributeurs apportant des noeuds fiables au réseau."
        },
        {
          title: "La Neutralité du Net est une des plus grandes menaces aujourd'hui en ce qui concerne l'accès à Internet.",
          description: "Les fournisseurs d'accès peuvent ralentir volontairement le débit, ou facturer des frais additionnels pour accéder à certains services. Avec Phantom, il est possible de contourner les effets de telles pratiques, puisque les données ne sont jamais centralisées. Il est quasiment impossible de bloquer un site web fourni par un groupe de pairs, contrairement à la facilité avec laquelle il est possible de filtrer l'accès à certains services ayant des 'empreintes' Internet connues."
        }
      ],
      specs: {
        title: "Spécifications techniques",
        consensusAlgorithm: "Consensus algorithm",
        delegatedProofOfStake: "Delegated Proof-Of-Stake",
        blockProducers: "Block",
        blockTime: "Block time",
        seconds: "secondes",
        roundTime: "Round time",
        minutes: "minutes",
        blockReward: "Block reward",
        forger: "forger",
        project: "project",
        supply: "Supply",
        inflation: "inflation",
        marketListings: "Market listings",
        mediaTitle: "Découvrez Shift dans les Médias"
      }
    },
    why: {
      items: [
        {
          title: "Quel point commun ont tous les systèmes d'exploitation?",
          descriptions: [
            "Prenons un exemple d'application dite 'killer app': le tableur logiciel VisiCalc propulsé par les ordinateurs personnels Apple II ont connu des niveaux d'adoption jamais atteints au début des années 80, simplement du fait que pendant dix mois, le meilleur tableau logiciel du marché n'était disponible que sur ces machines.",
            "De la même façon, Microsoft a investi lourdement dans la prommotion d'Internet Explorer en tant qu'application 'user-friendly' à destination du grand public, car ils avaient compris que même sans faire d'IE le meilleur navigateur web du marché, l'inclure en tant qu'application 'bonus' dans Windows faciliterait l'adoption de ce dernier et de leur OS, menant ensuite les développeurs logiciels à emboîter le pas dans un effet 'boule de neige', ce qui a conduit à rendre inévitable leur dominance sur le marché."
          ]
        },
        {
          title: "Shift est la première blockchain nouvelle génération avec une 'killer dApp' pré-intégrée.",
          descriptions: [
            "Pendant que d'autres sociétés sont occupées à écrire des livres blancs et à lever des centaines de millions de dollars, Shift s'est concentré sur le développement: nous avons créé le squelette d'un écosystème robuste de dApps, parallèlement à une plateforme de décentralisation dPOS solide et démocratique, qui peut être utilisée par n'importe qui maitrisant JavaScript. La dApp Phantom créera un nouveau web décentralisé, autonomisant les utilisateurs de tous les jours et gardant leurs données en lieu sûr.",
            "Nous sommes confiants dans le fait que proposer la première infrastructure d'hébergement à bas prix, facile à utiliser, décentralisée, permettant aux utilisateurs d'économiser de l'argent par rapport aux méthodes traditionnelles de stockage de fichiers et protégeant leurs contenus de censures externes, aura l'effet d'un stimulus massif menant à l'adoption de Shift par le grand public."
          ]
        }
      ]
    }
  },
  kr: {
    how: {
      title: "Shift의 작동 원리는 다음과 같습니다.",
      sliderItems: [
        {
          title: "분권된 앱",
          imageKey: 'dapps',
          descriptions: [
            "Shift는 접근이 가능하고 소스가 공개된 블록 체인 응용 프로그램 플랫폼입니다. 개발자는 누구나 쉽게 접근할 수 있는 설치 방법의 장점을 활용하여 자체 분산 응용 프로그램 (dApp)을 만드는 것이 가능합니다. 각각의 dApp에는 Shift의 메인 체인과 독립적인 자체 사이드 체인이 있지만 사이드 체인은 여전히 메인 체인에 연결하여 동기화 할 수 있습니다. 이것은 메인 체인의 안정성을 해치지 않으며 또한 무한 확장을 가능하게 합니다.",
            "Shift의 블록체인 기술은 JavaScript로 쓰여져  코드 개발자들이 이미 프로그래밍 언어에 친근하기 때문에 대량 채택을 권장합니다. 모든 dApp는 유망한 P2P 하이퍼미디어 분산 프로토콜인 InterPlanetary File System을 사용하여 Shift를 소유한 IPFS 클러스터에 연결하여 데이터를 저장합니다. 유틸리티 코인으로 정의 내려진 Shift 토큰의 존재는 모든 dApp 소유자가 본인의 dApp에서 디지털 자산에 대한 고유의 수익 창출 모델 구현 및 거래 플랫폼을 실행 할 수 있게 합니다."
          ]
        },
        {
          title: "dPOS 블록 체인",
          imageKey: 'dpos',
          descriptions: [
            "Shift는 위임 된 지분증명(dPOS) 방식의 합의 알고리즘을 사용하며, 네트워크는 마스터 노드와 위임 노드로 구성이 이루어 집니다. 대표단 노드는 블록체인 (즉, 분산 및 분산 원장)을 변경할 수 있습니다. 블록을 생성하는 대표가 되기 위해서 커뮤니티의 득표를 얻는 것을 기반으로 무제한의 대리자 노드 중 101개가 대표단에 참여하도록 선택됩니다. 모든 토큰 보유자는 가장 좋아하는 101명의 대표자에게 최대 101개의 투표를 하고 대리인이 될 수 있습니다. 투표는 토큰 보유자의 계정 내의 계좌에 비례합니다. 모든 대표단 라운드에서 승인 비율이 가장 높은 (즉, 가장 많은 양의 Shift 토큰이 뒷받침되는) 101 명의 대표가 대표단 라운드를 위한 블록을 생성하도록 선택됩니다. 블록 생성을 맡은 대표는 ShiftNRG 소프트웨어에서 제공하는 새로운 토큰 형태로 블록 보상을 제공받게 됩니다.",
            "이 시스템은 토큰 보유자가 가장 높은 생산성을 가진 대표자에게 투표 할 때뿐만 아니라 프로젝트 개발에서 시프트 토큰의 일부를 재투자하는 방법으로 대표자에게 최상의 기능을 제공합니다. Shift는 시장에 런칭된 dPOS 플랫폼의 생태계 내에서 독보적  dPOS 합의 알고리즘의 새 버전 도입을 계획하고 있습니다."
          ]
        },
        {
          title: "히드라 CMS",
          imageKey: 'hydra',
          descriptions: [
            "Hydra는 순수 JavaScript로 작성된 콘텐츠 관리 시스템(CMS)입니다. InterPlanetary File System과 호환되며 저장소 노드의 Shift 클러스터에 미리 내장되어 있습니다.  따라서 Shift는 유망한 하이퍼 미디어 배분 프로토콜에 분산 된 데이터베이스 솔루션을 제공하게 되는 최초의 프로젝트입니다. 사전에 구축하는 것을 허용함으로써 Shift 애플리케이션 플랫폼은 동적 컨텐츠의 분산 된 웹 호스팅을 지원할 수 있습니다.",
            "Shift 팀은 웹 소켓과 IPFS의 호환성에 대해서도 연구하고 있습니다. IPFS의 pubsub는 아직 개발 단계이며 아직 이전에 사용되던 방식의 대체안으로 모두 완성되지는 않았지만 IPFS와 소켓 서버에 소켓 클라이언트가 있을 것입니다.  Shift의 소켓 솔루션은 진정으로 분산 된 “실시간”웹 사이트를 호스트 할 수 있는 기능을 지원합니다."
          ]
        },
        {
          title: "Jenga DNS 모니터",
          imageKey: 'jenga',
          descriptions: [
            "Jenga는 DNS 기록들을 채우기 위한 Shift 클러스터의 모든 저장 장치 노드를 지속적으로 모니터링하는 도메인 네임 시스템 (DNS) 모니터입니다. 비정상적인 DNS 기록을 가리키는 노드는 클러스터에서 삭제됩니다. 그 결과로 생성되는 구조는 DDoS 공격에 거의 완벽하게 저항합니다. 하나의 도메인은 파일을 제공하는 10개에서 1천개의 노드로 어디에서든 지목할 수 있습니다.",
            "우리는 오래된 인터넷 (DNS / http)을 새 웹에 연결하는 스마트한 방법을 발견했습니다. Jenga는 분권화 된 DNS에 가장 가까이에 존재합니다.  그 이유는 진정으로 분권화 된 DNS는 아직 존재하지 않기 때문입니다. 이것은 최종 사용자가 타사 확장, 플러그인 또는 브라우저 애드온을 설치하지 않고도 수행됩니다. 본질적으로, Shift는 이미 웹 3.0의 세계 최초의 세련됨을 보여줍니다 : 완벽하며 안전합니다."
          ]
        },
        {
          title: "분산 된 저장 레이어",
          imageKey: 'phantom',
          descriptions: [
            "Shift는 P2P 하이퍼 미디어 배분 프로토콜 인 InterPlanetary File System을 블록 체인의 저장소 레이어로 사용합니다. 본질적으로, IPFS는 위치 기반 저장소를 사용하는 HTTP와는 달리 해시 기반 파일 저장소를 사용하기 때문에 IPFS는 HTTP보다 훨씬 스마트한 프로토콜입니다. Shift 팀은이 프로토콜을 인터넷의 분권화에 주요 핵심으로 간주합니다. IPFS (Filecoin) 외에도 Shift는 IPFS 도구 개발 및 블록 체인 기술을 사용하는 IPFS 구현에 앞장서고 있습니다. Shift는 데이터 저장을 위해 작동하는 IPFS 클러스터를 성공적으로 구축 한 최초의 프로젝트입니다. 프로토 타입 인 우리의 프리-베타는 이미 Shift의 테스트넷에서 작동하게 됩니다."
          ]
        }
      ],
      dapps: {
        left: [
          {
            title: "팬텀",
            descriptions: [
              "Shift의 첫 번째 공식 dApp 인 팬텀은 Shift의 클러스터에서 IPFS 네트워크를 통한 파일 관리를 위한 사용자 맞춤 인터페이스입니다. 토큰 형 서비스 모델을 기반으로 데이터를 고정하여 클러스터에 영구 저장할 수 있습니다. 팬텀은 또한 분산 웹 호스팅이 가능하도록 실제 최상위 도메인의 관리를 지원하는 도우미 프로그램을 포함합니다."
            ]
          },
          {
            title: "사이드 체인",
            descriptions: [
              "팬텀은 Shift의 메인 체인에 연결된 사이드 체인처럼 곧 자체적인 체인을 갖게 됩니다. 팬텀의 사이드 체인은 자체 규칙과 트랜잭션 유형을 가지므로 무한한 가능성을 가능하게 합니다.  프리-베타인 프로토타입은 이미 Shift의 테스트넷에서 작동합니다. 이 웹 사이트는 이미 저장 노드에 운영되고 있습니다."
            ]
          }
        ],
        right: [
          {
            title: "토큰경제 서비스 모델",
            descriptions: [
              "클러스터는 저장 노드들(피어)로 구성됩니다. 모든 토큰 보유자는 클러스터에 참여할 수 있으며 디스크 공간 (저장 용량)을 Shift 클러스터에 제공 할 수 있게 됩니다. 2018년에 Shift는 클러스터에 참여하는 것이 경제적으로 유익한 토큰경제 서비스 모델을 제시합니다.",
              "Shift토큰은 클러스터에서 제공되는 사용 가능한 디스크 공간의 특정 부분을 사용하도록 요청할 수 있습니다. 또한, 데이터를 게시하고 클러스터에 고정 할 수 있습니다. 즉, 컨텐츠 게시자가 토큰을 지분 증명으로 보유하고있는 한 클러스터에 영구 저장됩니다."
            ]
          },
          {
            title: "무료 파일 전송",
            descriptions: [
              "또한 클러스터 외부의 파일 (무료)을 클러스터에 연결시킬 수 도 있지만, 클러스터의 일부가 아닌 모든 동료에게 보낼 수도 있습니다. 그러나 IPFS 데몬을 실행하는 이러한 피어들에는 저장된 파일을 가끔 제거하여 불필요한 파일 조각들을 모을 수 있습니다."
            ]
          }
        ]
      }
    },
    intro: {
      title: "지금부터, 당신은 이미 분권형 웹상에 있습니다.",
      subtitle: {
        firstLine: "브라우저 플러그인도 없으며, 최상위 도메인도 없는 상황입니다.",
        secondLine: "이것은 팬텀입니다 : 호스팅 산업을 붕괴시키기 위한 Shift의 주력 dApp입니다."
      },
      dataTitle: "그것은 맞다: 이 웹사이트는 교대 IPFS 송이를 통해서 접대되고, 복제되고, 감시된다!"
    },
    uses: {
      title: "새로운 웹 혁명에 참여하세요.",
      items: [
        {
          title: "오늘 날의 웹에 대한 가장 큰 위협 중 하나는 웹 그 자체입니다.",
          description: "기업은 예를 들어 Gothamist, DNAinfo와 같은 것들을 일방적으로 폐쇄 할 수 있으며, 독립적인 사용자의 데이터를 수집합니다. Shift 및 팬텀은 이러한 종류의 재앙을 피할 수 있습니다. 사용자의 콘텐츠는 분산 된 방식으로 저장되므로 작성자는 항상 액세스 권한을 유지할 수 있습니다."
        },
        {
          title: "가까운 미래에 웹은 기존 시스템 및 인프라를 넘어 더욱 발전 할 것입니다.",
          description: "그렇게 하기 위해서는 모든 사용자들이 새로운 웹 혁명에 참여할 수 있도록 대체 프로토콜과 서비스가 존재해야 합니다. 이것은 Shift 및 팬텀이 추구하는 목표 : 기존의 호스팅 및 DNS 공급자를 더욱 강화하고 대체합니다."
        },
        {
          title: "모든 분산 시스템이 작동하려면 사용자가 직접 참여해야 하며 수익을 얻기 위해 반드시 유지해야합니다.",
          description: "엔터 Shift : 사용자가 생태계 내에서 팬텀 dApp의 저장소를 보호하거나 서비스를 위해 다른 사람과 거래가 가능한 유틸리티 토큰을 제공합니다. Shift의 위임 된 지분증명 컨센서스 알고리즘을 사용하게 되면 신뢰할 수 있는 노드를 네트워크에 공헌 한 사람들에게 투표 함으로써 사용자가 누릴 수 있는 이익을 얻을 수 있습니다."
        },
        {
          title: "넷 중립성은 인터넷의 접속과 관련하여 오늘날 가장 큰 위협 중 하나로 다가오고 있습니다.",
          description: "공급자는 연결 속도를 낮추거나 특정 서비스에 접속을 위해 추가 요금을 청구 할 수 있게 됩니다. 팬텀을 사용하면 데이터가 중앙 집중화되지 않으므로 이러한 영향을 미리 피할 수 있습니다. 인터넷상 흔적을 알고 있는 특정 서비스에 대한 접속을 쉽게 측정 할 수 있는 것과는 달리, 피어 그룹에서 제공되는 웹 사이트를 얻는 것은 거의 불가능합니다."
        }
      ],
      specs: {
        title: "네트워크 사양",
        consensusAlgorithm: "합의 알고리즘",
        delegatedProofOfStake: "위임 된 지분 증명",
        blockProducers: "블록 생산자들",
        blockTime: "블록 시간",
        seconds: "초",
        roundTime: "라운드 타임",
        minutes: "분",
        blockReward: "블록 보상",
        forger: "대장장이",
        project: "계획",
        supply: "공급",
        inflation: "인플레이션",
        marketListings: "거래소 리스트",
        mediaTitle: "미디어에서 Shift 정보 읽기"
      }
    },
    why: {
      items: [
        {
          title: "성공적인 운영 시스템에는 어떠한 공통점이 있을까요?",
          descriptions: [
            "“킬러 앱”의 초기를 예를 들어 생각해 봅시다. VisiCalc 스프레드 시트 소프트웨어는 80년대 초반 Apple II인 개인용 컴퓨터를 새로운 수준으로 끌어 올렸습니다. 간단히 말해서 10개월 간 마켓에서 가장 좋은 스프레드 시트 소프트웨어는 Apple II에서만 사용 가능했기 때문입니다.",
            "마찬가지로, Microsoft는 Internet Explorer를 대중에게 호소할 수 있는 유저에게 친화적인 응용 프로그램으로 홍보하는 데 많은 투자를 했습니다. IE를 Windows에서 제공하는 최상의 브라우저로 제작하지 않았음에도 Windows의 기본 제공 기능을 포함하여 두 응용 프로그램 소프트웨어 개발자들에게 시장 지배력을 마치 눈덩이처럼 커지는 효과를 만들어내도록 제작하였습니다."
          ]
        },
        {
          title: "Shift는 “킬러 dApp”으로 만들어진 첫번 째 차세대 블록체인입니다.",
          descriptions: [
            "다른 회사들이 백서를 제작하고 수억 달러의 자금을 모으는 데 바쁜 반면 Shift는 바쁘게 우리의 업무에 집중하고 있습니다. 우리는 JavaScript 다룰 줄 아는 모든 사용자들이 이용할 수 있는 강력하고 민주적인 dPOS 플랫폼을 갖춘 견고한 dApp 생태계의 중심을 만들었습니다. 팬텀 dApp과 함께하는 Shift는 새로운 분산 웹을 만들어 일상적인 사용자에게 힘을 실어주고 컨텐츠를 안전하게 유지합니다.",
            "우리는 기존에 제공되던 파일의 저장 방법과 다르게 사용자의 비용을 절감하고 외부 검열로부터 컨텐츠를 보호할 수 있는 저렴한 비용의 간편한 분산형 호스팅 인프라를 제공함으로써 Shift가 주류가 될 수 있는 엄청난 자극제가 될 것이라고 확신합니다."
          ]
        }
      ]
    }
  },
};
