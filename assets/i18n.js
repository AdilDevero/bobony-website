/* ==========================================================================
   Language switcher — English / Français / العربية
   Translates the shared chrome and the homepage by matching the English text
   already in the page, so pages can be translated without rewriting markup.
   Everything not in the dictionary stays in English.
   ========================================================================== */

(function () {
  const STORAGE_KEY = "bcsd_lang";
  const LANGS = ["en", "fr", "ar"];

  const fr = {
    /* ---------- navigation & header ---------- */
    "Home": "Accueil",
    "About": "À propos",
    "Rules": "Règlement",
    "News": "Actualités",
    "FAQ": "FAQ",
    "Store": "Boutique",
    "Status": "Statut",
    "Dashboard": "Tableau de bord",
    "Apply": "Postuler",
    "Apply for allowlist": "Postuler à la whitelist",
    "Join our Discord": "Rejoindre notre Discord",
    "Sign in with Discord": "Se connecter avec Discord",

    /* ---------- ticker ---------- */
    "Allowlist": "Whitelist",
    "Server": "Serveur",
    "Players": "Joueurs",
    "Framework": "Framework",
    "Region": "Région",
    "Season 4": "Saison 4",
    "Allowlist:": "Whitelist :",
    "Server:": "Serveur :",
    "Players:": "Joueurs :",
    "Framework:": "Framework :",
    "Region:": "Région :",
    "Discord:": "Discord :",
    "Season 4:": "Saison 4 :",
    "Live": "En direct",
    "Open": "Ouverte",
    "Online": "En ligne",
    "Custom": "Personnalisé",
    "Live now": "En direct",

    /* ---------- hero ---------- */
    "Season 4 live · allowlist open": "Saison 4 en cours · whitelist ouverte",
    "Join a world of limitless opportunities &": "Rejoignez un monde d'opportunités sans limites &",
    "build your legacy": "bâtissez votre héritage",
    "Welcome to Bobony Roleplay. Run a legitimate business, supply the underground, and build your empire. An immersive FiveM server with a custom player economy, progressive heist progression and high-performance UI systems.":
      "Bienvenue sur Bobony Roleplay. Gérez une entreprise légale, approvisionnez le marché souterrain et bâtissez votre empire. Un serveur FiveM immersif avec une économie joueur sur mesure, une progression de braquages et des interfaces hautes performances.",
    "Style": "Style",
    "Serious RP": "RP sérieux",
    "Audience": "Public",
    "Access": "Accès",
    "Whitelist": "Whitelist",
    "Languages": "Langues",

    /* ---------- live card & stat strip ---------- */
    "Server status": "État du serveur",
    "Active players": "Joueurs actifs",
    "Discord members": "Membres Discord",
    "Damana sponsorship": "Parrainage Damana",
    "Active": "Actif",
    "Season": "Saison",
    "4 — New Horizon": "4 — Nouvel horizon",
    "Full status page": "Page de statut complète",
    "Members online": "Membres en ligne",

    /* ---------- story ---------- */
    "Our story": "Notre histoire",
    "A city with a soul": "Une ville avec une âme",
    "Bobony Roleplay was created to offer demanding, immersive and lasting roleplay. Here, the city is more than a backdrop: it is a character with its own history, districts and tensions.":
      "Bobony Roleplay a été créé pour offrir un roleplay exigeant, immersif et durable. Ici, la ville est plus qu'un décor : c'est un personnage avec son histoire, ses quartiers et ses tensions.",
    "Every player portrays a citizen whose choices have real consequences for the community. An honest police officer, an ambitious lawyer, a visionary entrepreneur or an underworld figure — your journey is shaped by your encounters and decisions.":
      "Chaque joueur incarne un citoyen dont les choix ont de vraies conséquences pour la communauté. Policier intègre, avocat ambitieux, entrepreneur visionnaire ou figure de la pègre — votre parcours se construit au fil des rencontres et des décisions.",
    "Our goal is simple: provide a setting where quality roleplay is valued, improvisation meets consistency and everyone can find their place.":
      "Notre objectif est simple : offrir un cadre où le roleplay de qualité est valorisé, où l'improvisation rime avec cohérence et où chacun trouve sa place.",
    "More about the project": "En savoir plus sur le projet",
    "Current season": "Saison actuelle",
    "04 — New Horizon": "04 — Nouvel horizon",

    /* ---------- concept ---------- */
    "The concept": "Le concept",
    "Serious, yet accessible": "Sérieux, mais accessible",
    "A semi-hardcore server where RP rules structure the experience without making it rigid. We value story, nuance and relationships over meaningless action.":
      "Un serveur semi-hardcore où les règles de RP structurent l'expérience sans la rendre rigide. Nous privilégions l'histoire, la nuance et les relations plutôt que l'action gratuite.",
    "Serious roleplay": "Roleplay sérieux",
    "Arabic / French / English": "Arabe / Français / Anglais",
    "Custom, built in-house": "Sur mesure, développé en interne",
    "Session peak": "Pic de session",
    "250 players": "250 joueurs",
    "What defines us": "Ce qui nous définit",
    "Immersion first": "L'immersion avant tout",
    "Serious roleplay without out-of-character interruptions or meaningless actions. Every scene matters.":
      "Un roleplay sérieux, sans interruptions hors personnage ni actions gratuites. Chaque scène compte.",
    "A respectful community": "Une communauté respectueuse",
    "Respect is the golden rule. Our staff listens and toxicity is not tolerated.":
      "Le respect est la règle d'or. Notre staff écoute et la toxicité n'est pas tolérée.",
    "Fairness": "Équité",
    "Clear rules applied equally to everyone, whether it is your first day or your fourth year.":
      "Des règles claires appliquées à tous, que ce soit votre premier jour ou votre quatrième année.",
    "Creativity": "Créativité",
    "Your ideas shape the city through businesses, factions and player-led events.":
      "Vos idées façonnent la ville à travers les entreprises, les factions et les événements menés par les joueurs.",

    /* ---------- features ---------- */
    "The playground": "Le terrain de jeu",
    "Main features": "Fonctionnalités principales",
    "Everything you need to live a second life: work, institutions, territory and stories that keep the city moving.":
      "Tout pour vivre une seconde vie : travail, institutions, territoire et histoires qui font avancer la ville.",
    "Varied jobs": "Métiers variés",
    "Legal or illegal, every job has depth and its own economy. No filler shifts, no copy-paste loops.":
      "Légaux ou illégaux, chaque métier a de la profondeur et sa propre économie. Pas de missions répétitives.",
    "RP institutions": "Institutions RP",
    "Police, justice, hospital and city hall create a structured, living society with real consequences.":
      "Police, justice, hôpital et mairie créent une société structurée et vivante, avec de vraies conséquences.",
    "Factions & gangs": "Factions et gangs",
    "Territories, alliances and rivalries that evolve over time — and a map that remembers them.":
      "Territoires, alliances et rivalités qui évoluent avec le temps — et une carte qui s'en souvient.",
    "Scripted events": "Événements scénarisés",
    "Regular storylines that disrupt the balance of the city and pull every faction into the fallout.":
      "Des intrigues régulières qui bouleversent l'équilibre de la ville et entraînent toutes les factions.",

    /* ---------- systems ---------- */
    "Features": "Systèmes",
    "Immersive server systems": "Des systèmes immersifs",
    "We built Bobony Roleplay from the ground up with high-performance optimization, clean UI design and balanced systems — no stack of mismatched addons.":
      "Bobony Roleplay a été développé de zéro avec une optimisation poussée, une interface propre et des systèmes équilibrés — pas un empilement d'addons disparates.",
    "V3 iOS-style phone": "Téléphone V3 style iOS",
    "A custom lb-phone build skinned to native iOS — signed contracts and ID paperwork, business management, food delivery, in-car CarPlay and a reputation tracker, all wired into the same backend as the rest of the server.":
      "Un lb-phone personnalisé aux allures d'iOS natif — contrats signés et papiers d'identité, gestion d'entreprise, livraisons, CarPlay embarqué et suivi de réputation, connectés au même backend que le reste du serveur.",
    "Full vehicle crime loop": "Boucle complète de vol de véhicules",
    "Chop cars through a real chop-shop pipeline, clean VINs, crack ATMs and safes, hack security systems, and do time in a custom prison if you are caught — with dispatch, MDT and Internal Affairs all seeing the same case.":
      "Démontez des voitures via une vraie filière de chop-shop, lavez les numéros de série, percez des distributeurs et des coffres, piratez des systèmes de sécurité et purgez une peine dans une prison sur mesure — avec dispatch, MDT et affaires internes sur le même dossier.",
    "Legal businesses & jobs": "Entreprises et métiers légaux",
    "Player-run restaurants, vehicle sales and mechanic work, delivery runs, scooter and jet-ski rentals, and skill-based trade jobs — all levelling up through a shared reputation and XP engine with real drop tables.":
      "Restaurants gérés par les joueurs, ventes de véhicules, mécanique, livraisons, locations de scooters et jet-skis, métiers de compétence — le tout avec réputation, XP et tables de butin.",
    "Legal & financial systems": "Systèmes juridiques et financiers",
    "A DOJ-style compliance suite — company registration, financial ledgers and case tracking for a dedicated DA role — paired with real insurance contracts and a DMV plus license-points pipeline feeding straight into MDT charges.":
      "Une suite de conformité façon DOJ — immatriculation d'entreprises, registres financiers et suivi des affaires pour un rôle de procureur — avec assurances réelles et permis à points reliés au MDT.",
    "Custom medical & EMS": "Médical et EMS sur mesure",
    "Tiered treatment items used through targeted EMS interaction instead of a menu, with revive gating so treatment actually matters — backed by performance fixes that hold up under real player load.":
      "Des soins par paliers via une interaction ciblée avec les EMS plutôt qu'un menu, avec réanimation conditionnée pour que les soins aient un sens — et des correctifs de performance qui tiennent en charge.",
    "Player housing & city life": "Logements et vie urbaine",
    "Custom apartments, a database-backed in-game newspaper run by an actual reporter job, a cyberpunk inventory with backpacks and armour plates, and a full recreation layer — golf, bowling, casino, boxing, darts, fishing.":
      "Appartements personnalisés, journal in-game tenu par un vrai métier de journaliste, inventaire cyberpunk avec sacs et plaques, et tout un volet loisirs — golf, bowling, casino, boxe, fléchettes, pêche.",
    "One cohesive UI": "Une interface cohérente",
    "Every custom NUI — inventory, HUD, MDT, radial menu, chat, phone — shares one design language, so the server never feels like a pile of separately-themed addons.":
      "Chaque NUI — inventaire, HUD, MDT, menu radial, chat, téléphone — partage le même langage visuel, pour éviter l'effet patchwork.",
    "Built for performance": "Pensé pour la performance",
    "Custom framework, tuned database layer, profiled NUI. The city keeps 60+ FPS with a full server, because a great scene should never be ruined by a frame drop.":
      "Framework sur mesure, base de données optimisée, NUI profilée. La ville reste à 60+ FPS avec un serveur plein, car une belle scène ne doit jamais être gâchée par un drop de FPS.",
    "See it in motion": "Voir en mouvement",
    "The best way to judge a server is to stand in it. Apply, connect, and take a walk through the city.":
      "La meilleure façon de juger un serveur, c'est d'y être. Postulez, connectez-vous et parcourez la ville.",
    "Start your application": "Commencer ma candidature",

    /* ---------- why join ---------- */
    "Why join us": "Pourquoi nous rejoindre",
    "6 good reasons": "6 bonnes raisons",
    "A demanding whitelist": "Une whitelist exigeante",
    "It protects player quality. Everyone you meet passed the same bar you did.":
      "Elle protège la qualité des joueurs. Tous ceux que vous croiserez ont passé la même barre.",
    "Responsive staff": "Un staff réactif",
    "A team that reads tickets, shows up in-game and actually listens to the community.":
      "Une équipe qui lit les tickets, se montre en jeu et écoute vraiment la communauté.",
    "A balanced economy": "Une économie équilibrée",
    "Designed for the long term, with sinks that stop inflation from eating your progress.":
      "Conçue pour durer, avec des puits qui empêchent l'inflation de ronger vos progrès.",
    "Regular stories & events": "Histoires et événements réguliers",
    "Staff-run arcs and player-led scenes keep the city alive week after week.":
      "Des arcs menés par le staff et des scènes portées par les joueurs font vivre la ville semaine après semaine.",
    "A detailed city": "Une ville détaillée",
    "Believable institutions, real procedures, paperwork that means something.":
      "Des institutions crédibles, de vraies procédures, une paperasse qui a du sens.",
    "A close-knit community": "Une communauté soudée",
    "A welcoming Moroccan and international crowd that treats new citizens like neighbours.":
      "Un public marocain et international accueillant, qui traite les nouveaux citoyens comme des voisins.",
    "250 citizens online": "250 citoyens en ligne",
    "Season 3 · last month": "Saison 3 · le mois dernier",

    /* ---------- achievements ---------- */
    "What we achieved last season": "Ce que nous avons accompli la saison passée",
    "Thousands of players, hundreds of thousands of hours, and half a million items — this is what our community built together.":
      "Des milliers de joueurs, des centaines de milliers d'heures et un demi-million d'objets — voilà ce que notre communauté a bâti ensemble.",
    "Unique players": "Joueurs uniques",
    "Total playtime hours": "Heures de jeu cumulées",
    "Peak players": "Pic de joueurs",
    "Messages sent in phone": "Messages envoyés sur téléphone",
    "Community streamers": "Streamers de la communauté",
    "No community streamers are currently live.": "Aucun streamer de la communauté n'est en direct pour le moment.",

    /* ---------- call to action ---------- */
    "Your turn": "À vous de jouer",
    "The city is waiting for you": "La ville vous attend",
    "Applications take about ten minutes. Connect your Discord, tell us who your character is, and we will handle the rest.":
      "Une candidature prend une dizaine de minutes. Connectez votre Discord, présentez votre personnage, et nous nous occupons du reste.",
    "How to connect": "Comment se connecter",

    /* ---------- FAQ ---------- */
    "Questions": "Questions",
    "Frequently asked questions": "Questions fréquentes",
    "What is Bobony Roleplay?": "Qu'est-ce que Bobony Roleplay ?",
    "Bobony Roleplay is a premium FiveM roleplay server featuring a fully custom framework, a dedicated development team and a passionate community. We focus on serious roleplay with high-quality scripts and strong performance.":
      "Bobony Roleplay est un serveur de roleplay FiveM haut de gamme avec un framework entièrement sur mesure, une équipe de développement dédiée et une communauté passionnée. Nous misons sur un roleplay sérieux, des scripts de qualité et de bonnes performances.",
    "How do I join the server?": "Comment rejoindre le serveur ?",
    "Apply for the allowlist through our": "Postulez à la whitelist via notre",
    "application page": "page de candidature",
    ". Connect your Discord, make sure you meet the requirements and submit your application. Alternatively, a trusted player can sponsor you through the Damana system.":
      ". Connectez votre Discord, vérifiez que vous remplissez les conditions et envoyez votre candidature. Sinon, un joueur de confiance peut vous parrainer via le système Damana.",
    "What are subscriptions for?": "À quoi servent les abonnements ?",
    "Subscriptions support hosting and continuous development. Supporters receive aesthetic perks, queue priority and exclusive Discord roles — with a strict no-pay-to-win policy. Every mechanical advantage stays earnable in game.":
      "Les abonnements financent l'hébergement et le développement continu. Les soutiens reçoivent des avantages esthétiques, une priorité de file et des rôles Discord exclusifs — avec une politique stricte de no pay-to-win. Tout avantage mécanique reste obtainable en jeu.",
    "Do I need prior RP experience?": "Faut-il de l'expérience en RP ?",
    "Experience helps, but we welcome newcomers who are eager to learn. We expect all players to read the":
      "L'expérience aide, mais les débutants motivés sont les bienvenus. Nous demandons à tous les joueurs de lire attentivement le",
    "rules": "règlement",
    "thoroughly and stay in character at all times.": "et de rester en personnage à tout moment.",
    "How do whitelist jobs work?": "Comment fonctionnent les métiers whitelist ?",
    "Whitelist jobs such as Police (LSPD), Medical (EMS) and Mechanics require a separate application in our Discord. Once accepted, you go through training to keep quality high in these vital community roles.":
      "Les métiers whitelist comme Police (LSPD), Médical (EMS) et Mécanicien demandent une candidature séparée sur notre Discord. Une fois accepté, vous suivez une formation pour garantir la qualité de ces rôles essentiels.",
    "Read the full FAQ": "Lire la FAQ complète",

    /* ---------- footer ---------- */
    "Navigate": "Navigation",
    "Community": "Communauté",
    "Legal": "Légal",
    "About us": "À propos",
    "Connect": "Connexion",
    "Careers": "Carrières",
    "Terms of service": "Conditions d'utilisation",
    "Privacy policy": "Politique de confidentialité",
    "Refund policy": "Politique de remboursement",
    "View full status page →": "Voir la page de statut →",
    "Built by the Bobony community, for the Bobony community. A serious roleplay city with custom systems, a player-driven economy and a staff team that listens.":
      "Construit par la communauté Bobony, pour la communauté Bobony. Une ville de roleplay sérieuse avec des systèmes sur mesure, une économie portée par les joueurs et un staff à l'écoute.",
    "Business inquiries:": "Demandes professionnelles :",
    "Business inquiries: ": "Demandes professionnelles : ",
    "Not affiliated with Rockstar Games or Take-Two Interactive.": "Non affilié à Rockstar Games ou Take-Two Interactive.",
    "Powered by": "Propulsé par",

    /* ---------- dashboard ---------- */
    "Player account": "Compte joueur",
    "Characters": "Personnages",
    "My citizen card": "Ma carte de citoyen",
    "My applications": "Mes candidatures",
    "My job requests": "Mes demandes de métier",
    "Damana system": "Système Damana",
    "Support tickets": "Tickets de support",
    "Logout": "Déconnexion",
    "Staff panel": "Panneau staff",
    "Read the FAQ first": "Lire d'abord la FAQ",
    "Open a ticket": "Ouvrir un ticket",

    /* ---------- apply page ---------- */
    "Apply for the allowlist": "Postuler à la whitelist",
    "Whitelist · open": "Whitelist · ouverte",
    "Ten minutes of writing is all it takes. Tell us who your character is and how you roleplay — we read every application by hand.":
      "Dix minutes d'écriture suffisent. Dites-nous qui est votre personnage et comment vous jouez — nous lisons chaque candidature à la main.",
    "Four steps to the city": "Quatre étapes vers la ville",
    "Every application is tied to a Discord account, so staff can verify you and reach you with a decision.":
      "Chaque candidature est liée à un compte Discord, ce qui permet au staff de vous vérifier et de vous transmettre la décision.",
    "Read the rules": "Lisez le règlement",
    "The application asks three questions that you can only answer correctly if you have read them. It takes eight minutes.":
      "Le formulaire pose trois questions auxquelles on ne peut répondre correctement qu'après les avoir lues. Cela prend huit minutes.",
    "Submit your character": "Présentez votre personnage",
    "A name, a background and a reason to be in the city. No essay contest — we look for coherence and intent.":
      "Un nom, un passé et une raison d'être en ville. Pas de concours de dissertation — nous cherchons la cohérence et l'intention.",
    "Get reviewed": "Passez en relecture",
    "Most applications are answered within 48 hours. If you are declined, you can reapply after seven days.":
      "La plupart des candidatures reçoivent une réponse sous 48 heures. En cas de refus, vous pouvez repostuler après sept jours.",
    "Requirements:": "Conditions :",
    "Role you are applying for": "Poste souhaité",
    "Select a role…": "Choisissez un poste…",
    "Legal roles are whitelisted again in Discord once you are through the allowlist.":
      "Les métiers légaux sont revalidés sur Discord une fois la whitelist obtenue.",
    "Desired role / faction": "Poste / faction souhaité",
    "be 18 or older, own a legal copy of GTA V on PC, have a working microphone, and speak one of Arabic, French or English well enough for voice roleplay.":
      "avoir 18 ans ou plus, posséder une copie légale de GTA V sur PC, disposer d'un micro fonctionnel et parler l'arabe, le français ou l'anglais assez bien pour le roleplay vocal.",
    "Sponsored by a citizen?": "Parrainé par un citoyen ?",
    "Trusted players can vouch for a newcomer through the Damana system. A sponsorship does not skip the rules — it puts your application in a faster queue and makes your mentor responsible for your first two weeks.":
      "Des joueurs de confiance peuvent se porter garants d'un nouveau venu via le système Damana. Un parrainage ne dispense pas des règles — il accélère votre file et rend votre mentor responsable de vos deux premières semaines.",
    "Applications open": "Candidatures ouvertes",
    "Yes": "Oui",
    "Average review time": "Délai moyen de relecture",
    "Under 48 h": "Moins de 48 h",
    "Reapply after a decline": "Nouvelle candidature après refus",
    "7 days": "7 jours",
    "Applications are linked to your Discord account so our staff team can confirm who you are and send you the decision. We only read your username and ID — never your messages or your server list.":
      "Les candidatures sont liées à votre compte Discord pour que notre staff confirme votre identité et vous envoie la décision. Nous ne lisons que votre nom d'utilisateur et votre identifiant — jamais vos messages ni votre liste de serveurs.",
    "Continue with Discord": "Continuer avec Discord",
    "Already a member? Sign in with the same account you use in the server.":
      "Déjà membre ? Connectez-vous avec le compte que vous utilisez sur le serveur.",
    "Signed in as": "Connecté en tant que",
    "Sign out": "Se déconnecter",
    "Allowlist application": "Candidature whitelist",
    "Your Discord handle is taken from your sign-in. Everything else is about your character.":
      "Votre pseudo Discord provient de votre connexion. Le reste concerne votre personnage.",
    "Character name": "Nom du personnage",
    "Discord handle": "Pseudo Discord",
    "Age": "Âge",
    "Main language": "Langue principale",
    "Character background": "Passé du personnage",
    "What do you want to build here?": "Que voulez-vous construire ici ?",
    "First Last": "Prénom Nom",
    "Where were they born, what do they do for a living, what brought them to the city?":
      "Où est-il né, que fait-il dans la vie, qu'est-ce qui l'a amené en ville ?",
    "A business, a career in the LSPD, a crew, a quiet life…": "Une entreprise, une carrière au LSPD, un équipage, une vie tranquille…",
    "I have read the": "J'ai lu le",
    ", I am 18 or older, and I understand that this character will be permanently killed if I break the server's core roleplay standards.":
      ", j'ai 18 ans ou plus et je comprends que ce personnage sera définitivement tué si j'enfreins les standards de roleplay fondamentaux du serveur.",
    "Submit application": "Envoyer la candidature",
    "By applying you accept our": "En postulant, vous acceptez nos",
    "and our": "et notre",
    "Before you apply": "Avant de postuler",
    "What we look for": "Ce que nous recherchons",
    "Coherence": "Cohérence",
    "A character that makes sense in the city — a job, a reason to be there, a flaw or two. Perfect characters are boring characters.":
      "Un personnage crédible en ville — un métier, une raison d'y être, quelques défauts. Les personnages parfaits sont ennuyeux.",
    "Intent": "Intention",
    "We want to know what you will bring to other players' scenes, not how much money you plan to make.":
      "Nous voulons savoir ce que vous apporterez aux scènes des autres, pas combien vous comptez gagner.",
    "Respect": "Respect",
    "Written answers tell us a lot about how someone handles a disagreement. Keep it civil, keep it clear.":
      "Les réponses écrites en disent long sur la façon de gérer un désaccord. Restez courtois et clair.",
    "Connect your Discord": "Connectez votre Discord",
    "This site is not connected to a Discord application yet, so the login cannot be verified automatically. Enter your Discord username to continue — staff will confirm it in the server. Once the site is live with its own Discord app, this becomes a real one-click sign-in.":
      "Ce site n'est pas encore relié à une application Discord, la connexion ne peut donc pas être vérifiée automatiquement. Entrez votre nom d'utilisateur Discord pour continuer — le staff le confirmera sur le serveur. Une fois le site relié à sa propre application Discord, cela deviendra une vraie connexion en un clic.",
    "Discord username": "Nom d'utilisateur Discord",
    "yourname": "votre_nom",
    "Cancel": "Annuler",
    "Stored on your device only. Nothing is sent anywhere.": "Stocké uniquement sur votre appareil. Rien n'est envoyé.",

    /* ---------- rules page ---------- */
    "Last updated 12 November 2026": "Dernière mise à jour : 12 novembre 2026",
    "The rulebook": "Le règlement",
    "Rules protect stories, not opinions. Read them once properly — the allowlist application assumes you know them, and staff apply them equally to everyone.":
      "Les règles protègent les histoires, pas les opinions. Lisez-les une fois sérieusement — la candidature suppose que vous les connaissez, et le staff les applique à tous de la même façon.",
    "On this page": "Sur cette page",
    "1. Core roleplay": "1. Roleplay fondamental",
    "2. Characters": "2. Personnages",
    "3. Crime & violence": "3. Crime et violence",
    "4. Police & EMS": "4. Police et EMS",
    "5. Communication": "5. Communication",
    "6. Out of character": "6. Hors personnage",
    "7. Sanctions": "7. Sanctions",
    "Short version: stay in character, value every scene, never ruin someone else's story to win. If you are unsure whether something is allowed, ask a ticket before you do it.":
      "Version courte : restez en personnage, donnez de la valeur à chaque scène, ne détruisez jamais l'histoire de quelqu'un d'autre pour gagner. En cas de doute, ouvrez un ticket avant d'agir.",
    "4. Police, EMS & whitelisted jobs": "4. Police, EMS et métiers whitelist",
    "Stay in character": "Restez en personnage",
    "You are your character for as long as you are connected. Speak, act and react as they would — including when things go badly for you.":
      "Vous êtes votre personnage tant que vous êtes connecté. Parlez, agissez et réagissez comme il le ferait — même quand les choses tournent mal pour vous.",
    "Value of life": "Valeur de la vie",
    "Your character wants to live. When a weapon is aimed at you at close range, comply or escalate believably — never ignore the threat. Repeated disregard is treated as a core roleplay failure.":
      "Votre personnage veut vivre. Quand une arme est pointée sur vous à courte portée, obtempérez ou escaladez de façon crédible — n'ignorez jamais la menace. Un mépris répété est considéré comme une faute de roleplay fondamentale.",
    "No powergaming": "Pas de powergaming",
    "Do not force outcomes on other players, do not play your character as invincible, and do not use mechanics to bypass a roleplay situation that you could lose.":
      "Ne forcez pas les résultats sur les autres joueurs, ne jouez pas un personnage invincible et n'utilisez pas les mécaniques pour éviter une situation de roleplay que vous pourriez perdre.",
    "No metagaming": "Pas de metagaming",
    "Information your character did not learn in character does not exist. That includes streams, Discord messages, support tickets and other players' screens.":
      "Les informations que votre personnage n'a pas apprises en jeu n'existent pas. Cela inclut les streams, les messages Discord, les tickets et les écrans des autres joueurs.",
    "No random deathmatch": "Pas de deathmatch aléatoire",
    "Violence needs a story. A reason to fight must exist in character before the first shot — a debt, a rivalry, a deal gone wrong.":
      "La violence a besoin d'une histoire. Une raison de se battre doit exister en personnage avant le premier coup de feu — une dette, une rivalité, un accord qui a mal tourné.",
    "Fear the consequences": "Craignez les conséquences",
    "Prison, fines, injuries and lost property are part of the story. Do not treat them as an interruption, and never try to escape roleplay by disconnecting.":
      "Prison, amendes, blessures et pertes font partie de l'histoire. Ne les traitez pas comme une interruption et ne fuyez jamais le roleplay en vous déconnectant.",
    "One character at a time": "Un personnage à la fois",
    "Play one character per scene. Switching characters to dodge a scene, a warrant or a debt is not allowed.":
      "Jouez un seul personnage par scène. Changer de personnage pour éviter une scène, un mandat ou une dette est interdit.",
    "Three-strike background death": "Mort de fond après trois fautes",
    "A character permanently dies after three recorded core roleplay failures. Names, businesses and assets do not transfer to a new character.":
      "Un personnage meurt définitivement après trois fautes de roleplay fondamentales enregistrées. Les noms, entreprises et biens ne sont pas transférés à un nouveau personnage.",
    "No protected identities": "Pas d'identités protégées",
    "Do not play real people, public figures, staff members or another player's character. Famous fictional personas need staff approval first.":
      "Ne jouez pas des personnes réelles, des figures publiques, des membres du staff ou le personnage d'un autre joueur. Les personnages fictifs célèbres nécessitent l'accord préalable du staff.",
    "Permadeath is story, not punishment": "La mort définitive est une histoire, pas une punition",
    "Ambient injuries heal after treatment. Anything that would realistically end a life — a headshot in an execution scene, a fall from a bridge — has to be played out and recorded with a witness.":
      "Les blessures courantes guérissent après soin. Tout ce qui mettrait réellement fin à une vie — une balle dans la tête lors d'une exécution, une chute d'un pont — doit être joué et enregistré avec un témoin.",
    "Escalation, not instant violence": "Escalade, pas violence immédiate",
    "Robberies need a verbal phase first: demand, threat, opportunity to comply. Heists need a plan, a crew and a believable exit.":
      "Les braquages exigent d'abord une phase verbale : sommation, menace, possibilité d'obtempérer. Les casses exigent un plan, un équipage et une sortie crédible.",
    "Cooldowns": "Temps de recharge",
    "15 minutes between robberies on the same victim.": "15 minutes entre deux braquages sur la même victime.",
    "30 minutes between armed heists per crew.": "30 minutes entre deux casses armés pour un même équipage.",
    "No crime sprees against the same business within one session.": "Pas de série de crimes contre la même entreprise au cours d'une session.",
    "No crime in safe zones": "Pas de crime en zone sûre",
    "Hospitals, city hall, the DMV and the courthouse are protected. So are scenes involving a downed player who is already being treated.":
      "Les hôpitaux, la mairie, le DMV et le tribunal sont protégés. Le sont aussi les scènes impliquant un joueur à terre déjà soigné.",
    "Kidnapping & execution": "Enlèvement et exécution",
    "Requires a story reason, a recording, and a clear demand. Executions must be a scene, never a silent click. Report them in the designated Discord channel afterwards.":
      "Cela exige une raison scénaristique, un enregistrement et une demande claire. Les exécutions doivent être une scène, jamais un clic silencieux. Signalez-les ensuite dans le salon Discord prévu.",
    "Procedures exist": "Les procédures existent",
    "LSPD, EMS and DOJ operate under written procedures. Breaking them is an in-character offence that Internal Affairs handles — not an out-of-character grievance.":
      "Le LSPD, les EMS et le DOJ suivent des procédures écrites. Les enfreindre est une infraction en personnage traitée par les affaires internes — pas un grief hors personnage.",
    "Nobody is the main character": "Personne n'est le personnage principal",
    "Officers are not action heroes, criminals are not untouchable, medics are not delivery services. Play the role, not the fantasy.":
      "Les officiers ne sont pas des héros d'action, les criminels ne sont pas intouchables, les médecins ne sont pas un service de livraison. Jouez le rôle, pas le fantasme.",
    "No corruption without approval": "Pas de corruption sans accord",
    "Corrupt officers are a great story, but they require a staff-approved arc so that IA scenes stay fair for everyone involved.":
      "Les officiers corrompus font une belle histoire, mais ils exigent un arc validé par le staff pour que les scènes des affaires internes restent équitables.",
    "Voice first": "La voix d'abord",
    "Voice roleplay is the default. Text is for phones, documents and situations where a microphone is impossible.":
      "Le roleplay vocal est la norme. Le texte sert aux téléphones, aux documents et aux situations où un micro est impossible.",
    "Keep the accent clean": "Restez lisible",
    "Use /me and /do for actions and context. No emotes that decide another player's reaction.":
      "Utilisez /me et /do pour les actions et le contexte. Pas d'emotes qui décident de la réaction d'un autre joueur.",
    "Accents, not caricatures": "Des accents, pas des caricatures",
    "Characters may have any background. Mocking a real nationality, religion or disability — in or out of character — is not a character choice.":
      "Les personnages peuvent avoir n'importe quelle origine. Se moquer d'une nationalité, d'une religion ou d'un handicap réels — en jeu ou hors jeu — n'est pas un choix de personnage.",
    "No OOC in local chat": "Pas de HRP dans le chat local",
    "Use the report system or a ticket. Arguing in character about an out-of-character problem breaks the scene for everyone around you.":
      "Utilisez le système de signalement ou un ticket. Débattre en personnage d'un problème hors personnage gâche la scène pour tout le monde.",
    "Streams and recordings": "Streams et enregistrements",
    "Streaming is welcome. Do not use a stream to gain information, and do not stream another player's private scene without their consent.":
      "Le streaming est bienvenu. N'utilisez pas un stream pour obtenir des informations et ne filmez pas la scène privée d'un autre joueur sans son accord.",
    "Exploits & cheats": "Exploits et triches",
    "Any modification, macro, duplication bug or economy exploit results in a permanent ban and the removal of everything earned with it. Report bugs and you get rewarded instead.":
      "Toute modification, macro, duplication ou exploitation de l'économie entraîne un bannissement permanent et la suppression de tout ce qui a été gagné ainsi. Signalez les bugs et vous serez récompensé.",
    "Graduated, then final": "Progressives, puis définitives",
    "Warning, then a temporary ban, then a permanent ban. Severe cases — cheating, harassment, doxxing, hate speech — skip straight to permanent, without appeal.":
      "Avertissement, puis bannissement temporaire, puis permanent. Les cas graves — triche, harcèlement, doxxing, discours haineux — passent directement au permanent, sans appel.",
    "Appeals": "Recours",
    "Every sanction except the permanent category can be appealed once, in a ticket, within 14 days. Bring the recording; we will bring the logs.":
      "Toute sanction hors catégorie permanente peut faire l'objet d'un recours unique, en ticket, sous 14 jours. Apportez l'enregistrement ; nous apporterons les logs.",
    "Staff decisions": "Décisions du staff",
    "Staff are human. If you believe a decision was wrong, escalate it calmly to an administrator — never to the whole Discord.":
      "Le staff est humain. Si vous pensez qu'une décision est erronée, faites-la remonter calmement à un administrateur — jamais à tout le Discord.",
    "I have read the rules — apply": "J'ai lu le règlement — postuler",
    "Ask a question": "Poser une question"
  };

  const ar = {
    /* ---------- navigation & header ---------- */
    "Home": "الرئيسية",
    "About": "من نحن",
    "Rules": "القوانين",
    "News": "الأخبار",
    "FAQ": "الأسئلة الشائعة",
    "Store": "المتجر",
    "Status": "الحالة",
    "Dashboard": "لوحتي",
    "Apply": "تقديم",
    "Apply for allowlist": "قدّم للقائمة البيضاء",
    "Join our Discord": "انضم إلى ديسكورد",
    "Sign in with Discord": "تسجيل الدخول عبر ديسكورد",

    /* ---------- ticker ---------- */
    "Allowlist": "القائمة البيضاء",
    "Server": "السيرفر",
    "Players": "اللاعبون",
    "Framework": "الإطار",
    "Region": "المنطقة",
    "Season 4": "الموسم 4",
    "Allowlist:": "القائمة البيضاء:",
    "Server:": "السيرفر:",
    "Players:": "اللاعبون:",
    "Framework:": "الإطار:",
    "Region:": "المنطقة:",
    "Discord:": "ديسكورد:",
    "Season 4:": "الموسم 4:",
    "Live": "مباشر",
    "Open": "مفتوحة",
    "Online": "متصل",
    "Custom": "مخصص",
    "Live now": "مباشر",

    /* ---------- hero ---------- */
    "Season 4 live · allowlist open": "الموسم 4 مباشر · القائمة البيضاء مفتوحة",
    "Join a world of limitless opportunities &": "انضم إلى عالم من الفرص اللامحدودة &",
    "build your legacy": "وابنِ إرثك",
    "Welcome to Bobony Roleplay. Run a legitimate business, supply the underground, and build your empire. An immersive FiveM server with a custom player economy, progressive heist progression and high-performance UI systems.":
      "مرحبًا بك في Bobony Roleplay. أدِر عملًا قانونيًا، أو زوّد السوق السري، وابنِ إمبراطوريتك. سيرفر FiveM غامر مع اقتصاد لاعبين مخصص وتقدّم في السرقات وواجهات عالية الأداء.",
    "Style": "الأسلوب",
    "Serious RP": "RP جاد",
    "Audience": "الفئة",
    "Access": "الوصول",
    "Whitelist": "قائمة بيضاء",
    "Languages": "اللغات",

    /* ---------- live card & stat strip ---------- */
    "Server status": "حالة السيرفر",
    "Active players": "اللاعبون النشطون",
    "Discord members": "أعضاء ديسكورد",
    "Damana sponsorship": "رعاية ضمانة",
    "Active": "مفعّل",
    "Season": "الموسم",
    "4 — New Horizon": "4 — أفق جديد",
    "Full status page": "صفحة الحالة الكاملة",
    "Members online": "الأعضاء المتصلون",

    /* ---------- story ---------- */
    "Our story": "قصتنا",
    "A city with a soul": "مدينة بروح",
    "Bobony Roleplay was created to offer demanding, immersive and lasting roleplay. Here, the city is more than a backdrop: it is a character with its own history, districts and tensions.":
      "أُنشئ Bobony Roleplay لتقديم لعب أدوار غامر وجاد ودائم. هنا المدينة أكثر من خلفية: إنها شخصية لها تاريخها وأحياؤها وتوتراتها.",
    "Every player portrays a citizen whose choices have real consequences for the community. An honest police officer, an ambitious lawyer, a visionary entrepreneur or an underworld figure — your journey is shaped by your encounters and decisions.":
      "كل لاعب يجسّد مواطنًا لخياراته نتائج حقيقية على المجتمع. شرطي نزيه، محامٍ طموح، رجل أعمال صاحب رؤية أو وجه من العالم السفلي — رحلتك تتشكل بلقاءاتك وقراراتك.",
    "Our goal is simple: provide a setting where quality roleplay is valued, improvisation meets consistency and everyone can find their place.":
      "هدفنا بسيط: توفير بيئة يُقدَّر فيها لعب الأدوار الجيد، ويلتقي فيها الارتجال بالاتساق، ويجد فيها الجميع مكانهم.",
    "More about the project": "المزيد عن المشروع",
    "Current season": "الموسم الحالي",
    "04 — New Horizon": "04 — أفق جديد",

    /* ---------- concept ---------- */
    "The concept": "المفهوم",
    "Serious, yet accessible": "جاد، لكنه متاح",
    "A semi-hardcore server where RP rules structure the experience without making it rigid. We value story, nuance and relationships over meaningless action.":
      "سيرفر شبه صارم تنظّم فيه قواعد لعب الأدوار التجربة دون أن تجعلها جامدة. نقدّر القصة والتفاصيل والعلاقات أكثر من الحركة بلا معنى.",
    "Serious roleplay": "لعب أدوار جاد",
    "Arabic / French / English": "العربية / الفرنسية / الإنجليزية",
    "Custom, built in-house": "مخصص، تطوير داخلي",
    "Session peak": "ذروة الجلسة",
    "250 players": "250 لاعبًا",
    "What defines us": "ما يميزنا",
    "Immersion first": "الانغماس أولًا",
    "Serious roleplay without out-of-character interruptions or meaningless actions. Every scene matters.":
      "لعب أدوار جاد دون مقاطعات خارج الشخصية أو أفعال بلا معنى. كل مشهد مهم.",
    "A respectful community": "مجتمع محترم",
    "Respect is the golden rule. Our staff listens and toxicity is not tolerated.":
      "الاحترام هو القاعدة الذهبية. فريقنا يستمع والسمّية غير مقبولة.",
    "Fairness": "الإنصاف",
    "Clear rules applied equally to everyone, whether it is your first day or your fourth year.":
      "قواعد واضحة تُطبَّق على الجميع، سواء كان يومك الأول أو عامك الرابع.",
    "Creativity": "الإبداع",
    "Your ideas shape the city through businesses, factions and player-led events.":
      "أفكارك تشكّل المدينة عبر الأعمال والفصائل والفعاليات التي يقودها اللاعبون.",

    /* ---------- features ---------- */
    "The playground": "ساحة اللعب",
    "Main features": "أبرز الميزات",
    "Everything you need to live a second life: work, institutions, territory and stories that keep the city moving.":
      "كل ما تحتاجه لحياة ثانية: العمل والمؤسسات والأراضي وقصص تُبقي المدينة نابضة.",
    "Varied jobs": "وظائف متنوعة",
    "Legal or illegal, every job has depth and its own economy. No filler shifts, no copy-paste loops.":
      "قانونية أو غير قانونية، لكل وظيفة عمق واقتصادها الخاص. لا مهام حشو ولا حلقات مكررة.",
    "RP institutions": "مؤسسات لعب الأدوار",
    "Police, justice, hospital and city hall create a structured, living society with real consequences.":
      "الشرطة والعدالة والمستشفى والبلدية تصنع مجتمعًا منظمًا ونابضًا بعواقب حقيقية.",
    "Factions & gangs": "الفصائل والعصابات",
    "Territories, alliances and rivalries that evolve over time — and a map that remembers them.":
      "أراضٍ وتحالفات وخصومات تتطور مع الوقت — وخريطة تتذكرها.",
    "Scripted events": "فعاليات مكتوبة",
    "Regular storylines that disrupt the balance of the city and pull every faction into the fallout.":
      "خطوط درامية منتظمة تخلّ بتوازن المدينة وتجرّ كل الفصائل إلى نتائجها.",

    /* ---------- systems ---------- */
    "Features": "الأنظمة",
    "Immersive server systems": "أنظمة سيرفر غامرة",
    "We built Bobony Roleplay from the ground up with high-performance optimization, clean UI design and balanced systems — no stack of mismatched addons.":
      "بنينا Bobony Roleplay من الصفر بأداء محسّن وواجهات نظيفة وأنظمة متوازنة — لا كومة إضافات متنافرة.",
    "V3 iOS-style phone": "هاتف V3 بأسلوب iOS",
    "A custom lb-phone build skinned to native iOS — signed contracts and ID paperwork, business management, food delivery, in-car CarPlay and a reputation tracker, all wired into the same backend as the rest of the server.":
      "نسخة lb-phone مخصصة بمظهر iOS الأصلي — عقود موقّعة وأوراق هوية، إدارة أعمال، توصيل طعام، CarPlay داخل السيارة ومتابعة سمعة، كلها متصلة بنفس الخادم.",
    "Full vehicle crime loop": "دورة سرقة مركبات كاملة",
    "Chop cars through a real chop-shop pipeline, clean VINs, crack ATMs and safes, hack security systems, and do time in a custom prison if you are caught — with dispatch, MDT and Internal Affairs all seeing the same case.":
      "فكّك السيارات عبر سلسلة تشليح حقيقية، نظّف أرقام الهيكل، اكسر الصرافات والخزائن، اخترق أنظمة الحماية، واقضِ عقوبة في سجن مخصص إن قُبض عليك — مع الإرسال وMDT والشؤون الداخلية على نفس الملف.",
    "Legal businesses & jobs": "أعمال ووظائف قانونية",
    "Player-run restaurants, vehicle sales and mechanic work, delivery runs, scooter and jet-ski rentals, and skill-based trade jobs — all levelling up through a shared reputation and XP engine with real drop tables.":
      "مطاعم يديرها اللاعبون، بيع مركبات وأعمال ميكانيكا، توصيلات، تأجير سكوتر وجت سكي، ووظائف مهارية — كلها تتطور عبر سمعة ونقاط خبرة وجداول مكافآت.",
    "Legal & financial systems": "أنظمة قانونية ومالية",
    "A DOJ-style compliance suite — company registration, financial ledgers and case tracking for a dedicated DA role — paired with real insurance contracts and a DMV plus license-points pipeline feeding straight into MDT charges.":
      "حزمة امتثال بأسلوب وزارة العدل — تسجيل الشركات ودفاتر مالية وتتبّع قضايا لدور المدعي العام — مع عقود تأمين حقيقية ورخص بنقاط متصلة بـ MDT.",
    "Custom medical & EMS": "طب وإسعاف مخصص",
    "Tiered treatment items used through targeted EMS interaction instead of a menu, with revive gating so treatment actually matters — backed by performance fixes that hold up under real player load.":
      "علاجات متدرجة عبر تفاعل موجّه مع الإسعاف بدل القوائم، مع شروط إنعاش تجعل العلاج مهمًا — وإصلاحات أداء تصمد تحت الحمل.",
    "Player housing & city life": "سكن وحياة المدينة",
    "Custom apartments, a database-backed in-game newspaper run by an actual reporter job, a cyberpunk inventory with backpacks and armour plates, and a full recreation layer — golf, bowling, casino, boxing, darts, fishing.":
      "شقق مخصصة، صحيفة داخل اللعبة يديرها دور صحفي حقيقي، حقيبة بأسلوب سايبربانك مع حقائب ظهر ودروع، وطبقة ترفيه كاملة — غولف وبولينغ وكازينو وملاكمة وسهام وصيد.",
    "One cohesive UI": "واجهة واحدة متناسقة",
    "Every custom NUI — inventory, HUD, MDT, radial menu, chat, phone — shares one design language, so the server never feels like a pile of separately-themed addons.":
      "كل واجهة مخصصة — الحقيبة والـHUD وMDT والقائمة الدائرية والدردشة والهاتف — تتشارك لغة تصميم واحدة، فلا يبدو السيرفر كومة إضافات.",
    "Built for performance": "مصمم للأداء",
    "Custom framework, tuned database layer, profiled NUI. The city keeps 60+ FPS with a full server, because a great scene should never be ruined by a frame drop.":
      "إطار مخصص وقاعدة بيانات مضبوطة وواجهات محسّنة. تبقى المدينة فوق 60 إطارًا مع سيرفر ممتلئ، لأن مشهدًا رائعًا لا يجب أن يفسده هبوط الإطارات.",
    "See it in motion": "شاهده أثناء الحركة",
    "The best way to judge a server is to stand in it. Apply, connect, and take a walk through the city.":
      "أفضل طريقة للحكم على سيرفر هي أن تكون داخله. قدّم، اتصل، وتجوّل في المدينة.",
    "Start your application": "ابدأ طلبك",

    /* ---------- why join ---------- */
    "Why join us": "لماذا تنضم إلينا",
    "6 good reasons": "6 أسباب جيدة",
    "A demanding whitelist": "قائمة بيضاء صارمة",
    "It protects player quality. Everyone you meet passed the same bar you did.":
      "تحمي جودة اللاعبين. كل من تقابله اجتاز نفس المعيار.",
    "Responsive staff": "فريق متجاوب",
    "A team that reads tickets, shows up in-game and actually listens to the community.":
      "فريق يقرأ التذاكر ويظهر في اللعبة ويستمع فعلًا للمجتمع.",
    "A balanced economy": "اقتصاد متوازن",
    "Designed for the long term, with sinks that stop inflation from eating your progress.":
      "مصمم للمدى الطويل، مع مصارف تمنع التضخم من أكل تقدمك.",
    "Regular stories & events": "قصص وفعاليات منتظمة",
    "Staff-run arcs and player-led scenes keep the city alive week after week.":
      "أحداث يديرها الفريق ومشاهد يقودها اللاعبون تُبقي المدينة حية أسبوعًا بعد أسبوع.",
    "A detailed city": "مدينة مفصّلة",
    "Believable institutions, real procedures, paperwork that means something.":
      "مؤسسات مقنعة وإجراءات حقيقية وأوراق لها معنى.",
    "A close-knit community": "مجتمع متماسك",
    "A welcoming Moroccan and international crowd that treats new citizens like neighbours.":
      "جمهور مغربي ودولي مرحّب يعامل المواطنين الجدد كالجيران.",
    "250 citizens online": "250 مواطنًا متصلًا",
    "Season 3 · last month": "الموسم 3 · الشهر الماضي",

    /* ---------- achievements ---------- */
    "What we achieved last season": "ما حققناه الموسم الماضي",
    "Thousands of players, hundreds of thousands of hours, and half a million items — this is what our community built together.":
      "آلاف اللاعبين، مئات آلاف الساعات، ونصف مليون عنصر — هذا ما بناه مجتمعنا معًا.",
    "Unique players": "لاعبون فريدون",
    "Total playtime hours": "إجمالي ساعات اللعب",
    "Peak players": "ذروة اللاعبين",
    "Messages sent in phone": "رسائل أُرسلت في الهاتف",
    "Community streamers": "ستريمرز المجتمع",
    "No community streamers are currently live.": "لا يوجد ستريمر من المجتمع يبث مباشرة الآن.",

    /* ---------- call to action ---------- */
    "Your turn": "دورك الآن",
    "The city is waiting for you": "المدينة بانتظارك",
    "Applications take about ten minutes. Connect your Discord, tell us who your character is, and we will handle the rest.":
      "يستغرق التقديم نحو عشر دقائق. اربط ديسكورد، أخبرنا من تكون شخصيتك، ونحن نتولى الباقي.",
    "How to connect": "كيف تتصل",

    /* ---------- FAQ ---------- */
    "Questions": "أسئلة",
    "Frequently asked questions": "الأسئلة الشائعة",
    "What is Bobony Roleplay?": "ما هو Bobony Roleplay؟",
    "Bobony Roleplay is a premium FiveM roleplay server featuring a fully custom framework, a dedicated development team and a passionate community. We focus on serious roleplay with high-quality scripts and strong performance.":
      "Bobony Roleplay سيرفر FiveM متميز للعب الأدوار بإطار مخصص بالكامل وفريق تطوير مخصص ومجتمع شغوف. نركز على لعب أدوار جاد بسكربتات عالية الجودة وأداء قوي.",
    "How do I join the server?": "كيف أنضم إلى السيرفر؟",
    "Apply for the allowlist through our": "قدّم للقائمة البيضاء عبر",
    "application page": "صفحة التقديم",
    ". Connect your Discord, make sure you meet the requirements and submit your application. Alternatively, a trusted player can sponsor you through the Damana system.":
      ". اربط ديسكورد، وتأكد من استيفاء الشروط، وأرسل طلبك. أو يمكن للاعب موثوق أن يرعاك عبر نظام ضمانة.",
    "What are subscriptions for?": "ما فائدة الاشتراكات؟",
    "Subscriptions support hosting and continuous development. Supporters receive aesthetic perks, queue priority and exclusive Discord roles — with a strict no-pay-to-win policy. Every mechanical advantage stays earnable in game.":
      "تدعم الاشتراكات الاستضافة والتطوير المستمر. يحصل الداعمون على مزايا جمالية وأولوية في الطابور وأدوار ديسكورد حصرية — مع سياسة صارمة ضد الدفع مقابل الفوز. كل ميزة ميكانيكية تبقى قابلة للكسب داخل اللعبة.",
    "Do I need prior RP experience?": "هل أحتاج خبرة سابقة في RP؟",
    "Experience helps, but we welcome newcomers who are eager to learn. We expect all players to read the":
      "الخبرة تساعد، لكننا نرحب بالجدد المتحمسين للتعلم. نطلب من كل اللاعبين قراءة",
    "rules": "القوانين",
    "thoroughly and stay in character at all times.": "بعناية والبقاء في الشخصية دائمًا.",
    "How do whitelist jobs work?": "كيف تعمل وظائف القائمة البيضاء؟",
    "Whitelist jobs such as Police (LSPD), Medical (EMS) and Mechanics require a separate application in our Discord. Once accepted, you go through training to keep quality high in these vital community roles.":
      "الوظائف البيضاء مثل الشرطة (LSPD) والطبية (EMS) والميكانيكا تتطلب طلبًا منفصلًا في ديسكورد. بعد القبول تمرّ بتدريب للحفاظ على جودة هذه الأدوار الحيوية.",
    "Read the full FAQ": "اقرأ كل الأسئلة الشائعة",

    /* ---------- footer ---------- */
    "Navigate": "التنقل",
    "Community": "المجتمع",
    "Legal": "قانوني",
    "About us": "من نحن",
    "Connect": "الاتصال",
    "Careers": "الوظائف",
    "Terms of service": "شروط الخدمة",
    "Privacy policy": "سياسة الخصوصية",
    "Refund policy": "سياسة الاسترداد",
    "View full status page →": "عرض صفحة الحالة →",
    "Built by the Bobony community, for the Bobony community. A serious roleplay city with custom systems, a player-driven economy and a staff team that listens.":
      "بُني بواسطة مجتمع Bobony، من أجل مجتمع Bobony. مدينة لعب أدوار جادة بأنظمة مخصصة واقتصاد يقوده اللاعبون وفريق يستمع.",
    "Business inquiries:": "استفسارات الأعمال:",
    "Business inquiries: ": "استفسارات الأعمال: ",
    "Not affiliated with Rockstar Games or Take-Two Interactive.": "غير مرتبط بـ Rockstar Games أو Take-Two Interactive.",
    "Powered by": "مدعوم بواسطة",

    /* ---------- dashboard ---------- */
    "Player account": "حساب اللاعب",
    "Characters": "الشخصيات",
    "My citizen card": "بطاقتي",
    "My applications": "طلباتي",
    "My job requests": "طلبات الوظائف",
    "Damana system": "نظام ضمانة",
    "Support tickets": "تذاكر الدعم",
    "Logout": "خروج",
    "Staff panel": "لوحة الطاقم",
    "Read the FAQ first": "اقرأ الأسئلة الشائعة أولًا",
    "Open a ticket": "افتح تذكرة",

    /* ---------- apply page ---------- */
    "Apply for the allowlist": "قدّم للقائمة البيضاء",
    "Whitelist · open": "القائمة البيضاء · مفتوحة",
    "Ten minutes of writing is all it takes. Tell us who your character is and how you roleplay — we read every application by hand.":
      "عشر دقائق من الكتابة تكفي. أخبرنا من شخصيتك وكيف تلعب الأدوار — نقرأ كل طلب يدويًا.",
    "Four steps to the city": "أربع خطوات إلى المدينة",
    "Every application is tied to a Discord account, so staff can verify you and reach you with a decision.":
      "كل طلب مرتبط بحساب ديسكورد، ليتمكن الفريق من التحقق منك وإبلاغك بالقرار.",
    "Read the rules": "اقرأ القوانين",
    "The application asks three questions that you can only answer correctly if you have read them. It takes eight minutes.":
      "يطرح النموذج ثلاثة أسئلة لا يمكن الإجابة عليها بشكل صحيح إلا بعد قراءتها. يستغرق ذلك ثماني دقائق.",
    "Submit your character": "اعرض شخصيتك",
    "A name, a background and a reason to be in the city. No essay contest — we look for coherence and intent.":
      "اسم وخلفية وسبب للوجود في المدينة. ليس اختبار كتابة — نبحث عن الاتساق والنية.",
    "Get reviewed": "انتظر المراجعة",
    "Most applications are answered within 48 hours. If you are declined, you can reapply after seven days.":
      "يُجاب على معظم الطلبات خلال 48 ساعة. إذا رُفض طلبك يمكنك التقديم مجددًا بعد سبعة أيام.",
    "Requirements:": "الشروط:",
    "Role you are applying for": "الوظيفة المطلوبة",
    "Select a role…": "اختر وظيفة…",
    "Legal roles are whitelisted again in Discord once you are through the allowlist.":
      "تُعتمد الوظائف القانونية مرة أخرى في ديسكورد بعد اجتياز القائمة البيضاء.",
    "Desired role / faction": "الوظيفة / الفصيل المطلوب",
    "be 18 or older, own a legal copy of GTA V on PC, have a working microphone, and speak one of Arabic, French or English well enough for voice roleplay.":
      "أن تكون 18 عامًا أو أكثر، وتملك نسخة قانونية من GTA V على الحاسوب، ولديك ميكروفون يعمل، وتتحدث العربية أو الفرنسية أو الإنجليزية بما يكفي للعب الصوتي.",
    "Sponsored by a citizen?": "هل أنت برعاية مواطن؟",
    "Trusted players can vouch for a newcomer through the Damana system. A sponsorship does not skip the rules — it puts your application in a faster queue and makes your mentor responsible for your first two weeks.":
      "يمكن للاعبين الموثوقين أن يزكّوا قادمًا جديدًا عبر نظام ضمانة. الرعاية لا تتجاوز القوانين — بل تضع طلبك في طابور أسرع وتجعل مرشدك مسؤولًا عن أسبوعيك الأولين.",
    "Applications open": "الطلبات مفتوحة",
    "Yes": "نعم",
    "Average review time": "متوسط وقت المراجعة",
    "Under 48 h": "أقل من 48 ساعة",
    "Reapply after a decline": "إعادة التقديم بعد الرفض",
    "7 days": "7 أيام",
    "Applications are linked to your Discord account so our staff team can confirm who you are and send you the decision. We only read your username and ID — never your messages or your server list.":
      "تُربط الطلبات بحساب ديسكورد الخاص بك ليتمكن فريقنا من تأكيد هويتك وإرسال القرار. نقرأ فقط اسم المستخدم والمعرّف — لا رسائلك ولا قائمة سيرفراتك.",
    "Continue with Discord": "المتابعة عبر ديسكورد",
    "Already a member? Sign in with the same account you use in the server.":
      "عضو بالفعل؟ سجّل الدخول بالحساب نفسه الذي تستخدمه في السيرفر.",
    "Signed in as": "مسجّل الدخول باسم",
    "Sign out": "تسجيل الخروج",
    "Allowlist application": "طلب القائمة البيضاء",
    "Your Discord handle is taken from your sign-in. Everything else is about your character.":
      "يُؤخذ اسمك في ديسكورد من تسجيل الدخول. والباقي عن شخصيتك.",
    "Character name": "اسم الشخصية",
    "Discord handle": "معرّف ديسكورد",
    "Age": "العمر",
    "Main language": "اللغة الأساسية",
    "Character background": "خلفية الشخصية",
    "What do you want to build here?": "ماذا تريد أن تبني هنا؟",
    "First Last": "الاسم الأول والأخير",
    "Where were they born, what do they do for a living, what brought them to the city?":
      "أين وُلد، ماذا يعمل، وما الذي جاء به إلى المدينة؟",
    "A business, a career in the LSPD, a crew, a quiet life…": "عمل تجاري، مسيرة في LSPD، طاقم، حياة هادئة…",
    "I have read the": "لقد قرأت",
    ", I am 18 or older, and I understand that this character will be permanently killed if I break the server's core roleplay standards.":
      "، وعمري 18 عامًا أو أكثر، وأفهم أن هذه الشخصية ستُقتل نهائيًا إذا خالفت معايير لعب الأدوار الأساسية في السيرفر.",
    "Submit application": "إرسال الطلب",
    "By applying you accept our": "بتقديمك توافق على",
    "and our": "و",
    "Before you apply": "قبل أن تقدّم",
    "What we look for": "ما نبحث عنه",
    "Coherence": "الاتساق",
    "A character that makes sense in the city — a job, a reason to be there, a flaw or two. Perfect characters are boring characters.":
      "شخصية منطقية في المدينة — وظيفة وسبب للوجود وعيب أو اثنان. الشخصيات المثالية مملة.",
    "Intent": "النية",
    "We want to know what you will bring to other players' scenes, not how much money you plan to make.":
      "نريد أن نعرف ما ستضيفه لمشاهد اللاعبين الآخرين، لا كم من المال تخطط لكسبه.",
    "Respect": "الاحترام",
    "Written answers tell us a lot about how someone handles a disagreement. Keep it civil, keep it clear.":
      "الأجوبة المكتوبة تكشف الكثير عن طريقة التعامل مع الخلاف. كن مهذبًا وواضحًا.",
    "Connect your Discord": "اربط ديسكورد",
    "This site is not connected to a Discord application yet, so the login cannot be verified automatically. Enter your Discord username to continue — staff will confirm it in the server. Once the site is live with its own Discord app, this becomes a real one-click sign-in.":
      "هذا الموقع غير مرتبط بعد بتطبيق ديسكورد، لذا لا يمكن التحقق من تسجيل الدخول تلقائيًا. أدخل اسم مستخدمك للمتابعة — وسيؤكده الفريق في السيرفر. عندما يُربط الموقع بتطبيقه الخاص سيصبح تسجيل الدخول بنقرة واحدة.",
    "Discord username": "اسم مستخدم ديسكورد",
    "yourname": "اسمك",
    "Cancel": "إلغاء",
    "Stored on your device only. Nothing is sent anywhere.": "يُخزَّن على جهازك فقط. لا يُرسل أي شيء.",

    /* ---------- rules page ---------- */
    "Last updated 12 November 2026": "آخر تحديث: 12 نوفمبر 2026",
    "The rulebook": "دفتر القوانين",
    "Rules protect stories, not opinions. Read them once properly — the allowlist application assumes you know them, and staff apply them equally to everyone.":
      "القوانين تحمي القصص لا الآراء. اقرأها مرة واحدة بجدية — طلب القائمة البيضاء يفترض معرفتك بها، والفريق يطبّقها على الجميع بالتساوي.",
    "On this page": "في هذه الصفحة",
    "1. Core roleplay": "1. لعب الأدوار الأساسي",
    "2. Characters": "2. الشخصيات",
    "3. Crime & violence": "3. الجريمة والعنف",
    "4. Police & EMS": "4. الشرطة والإسعاف",
    "5. Communication": "5. التواصل",
    "6. Out of character": "6. خارج الشخصية",
    "7. Sanctions": "7. العقوبات",
    "Short version: stay in character, value every scene, never ruin someone else's story to win. If you are unsure whether something is allowed, ask a ticket before you do it.":
      "باختصار: ابقَ في الشخصية، وامنح كل مشهد قيمته، ولا تخرّب قصة غيرك من أجل الفوز. إن لم تكن متأكدًا، افتح تذكرة قبل أن تتصرف.",
    "4. Police, EMS & whitelisted jobs": "4. الشرطة والإسعاف والوظائف البيضاء",
    "Stay in character": "ابقَ في الشخصية",
    "You are your character for as long as you are connected. Speak, act and react as they would — including when things go badly for you.":
      "أنت شخصيتك ما دمت متصلًا. تحدث وتصرّف ورد كما تفعل — حتى عندما تسوء الأمور.",
    "Value of life": "قيمة الحياة",
    "Your character wants to live. When a weapon is aimed at you at close range, comply or escalate believably — never ignore the threat. Repeated disregard is treated as a core roleplay failure.":
      "شخصيتك تريد العيش. عندما يُوجَّه سلاح إليك من مسافة قريبة، أطع أو صعّد بشكل مقنع — لا تتجاهل التهديد. التجاهل المتكرر يُعد إخفاقًا أساسيًا في لعب الأدوار.",
    "No powergaming": "لا للقوة المفرطة",
    "Do not force outcomes on other players, do not play your character as invincible, and do not use mechanics to bypass a roleplay situation that you could lose.":
      "لا تفرض نتائج على اللاعبين، ولا تلعب شخصية لا تُهزم، ولا تستخدم الميكانيكا لتجاوز موقف يمكن أن تخسره.",
    "No metagaming": "لا للميتاغيمنغ",
    "Information your character did not learn in character does not exist. That includes streams, Discord messages, support tickets and other players' screens.":
      "المعلومات التي لم يعرفها شخصيتك في اللعبة غير موجودة. ويشمل ذلك البثوث ورسائل ديسكورد والتذاكر وشاشات اللاعبين.",
    "No random deathmatch": "لا للقتل العشوائي",
    "Violence needs a story. A reason to fight must exist in character before the first shot — a debt, a rivalry, a deal gone wrong.":
      "العنف يحتاج قصة. يجب أن يوجد سبب للقتال داخل الشخصية قبل أول طلقة — دَين أو خصومة أو اتفاق فشل.",
    "Fear the consequences": "اخشَ العواقب",
    "Prison, fines, injuries and lost property are part of the story. Do not treat them as an interruption, and never try to escape roleplay by disconnecting.":
      "السجن والغرامات والإصابات وفقدان الممتلكات جزء من القصة. لا تتعامل معها كتوقف، ولا تهرب من لعب الأدوار بقطع الاتصال.",
    "One character at a time": "شخصية واحدة في كل مرة",
    "Play one character per scene. Switching characters to dodge a scene, a warrant or a debt is not allowed.":
      "العب شخصية واحدة في المشهد. تغيير الشخصية لتفادي مشهد أو مذكرة أو دَين غير مسموح.",
    "Three-strike background death": "موت الخلفية بعد ثلاث مخالفات",
    "A character permanently dies after three recorded core roleplay failures. Names, businesses and assets do not transfer to a new character.":
      "تموت الشخصية نهائيًا بعد ثلاث مخالفات أساسية مسجلة. الأسماء والأعمال والأصول لا تنتقل إلى شخصية جديدة.",
    "No protected identities": "لا هويات محمية",
    "Do not play real people, public figures, staff members or another player's character. Famous fictional personas need staff approval first.":
      "لا تلعب أشخاصًا حقيقيين أو شخصيات عامة أو أعضاء الفريق أو شخصية لاعب آخر. الشخصيات الخيالية المشهورة تحتاج موافقة مسبقة.",
    "Permadeath is story, not punishment": "الموت النهائي قصة لا عقاب",
    "Ambient injuries heal after treatment. Anything that would realistically end a life — a headshot in an execution scene, a fall from a bridge — has to be played out and recorded with a witness.":
      "الإصابات العادية تُشفى بعد العلاج. كل ما قد ينهي حياة فعليًا — كطلقة في الرأس في مشهد إعدام أو سقوط من جسر — يجب أن يُلعب ويُسجَّل بحضور شاهد.",
    "Escalation, not instant violence": "تصعيد لا عنف فوري",
    "Robberies need a verbal phase first: demand, threat, opportunity to comply. Heists need a plan, a crew and a believable exit.":
      "السرقة تحتاج مرحلة كلامية أولًا: طلب وتهديد وفرصة للإذعان. السرقة الكبرى تحتاج خطة وطاقمًا ومخرجًا مقنعًا.",
    "Cooldowns": "فترات الانتظار",
    "15 minutes between robberies on the same victim.": "15 دقيقة بين سرقتين من الضحية نفسها.",
    "30 minutes between armed heists per crew.": "30 دقيقة بين سرقتين مسلحتين لنفس الطاقم.",
    "No crime sprees against the same business within one session.": "لا سلسلة جرائم ضد العمل نفسه في جلسة واحدة.",
    "No crime in safe zones": "لا جريمة في المناطق الآمنة",
    "Hospitals, city hall, the DMV and the courthouse are protected. So are scenes involving a downed player who is already being treated.":
      "المستشفيات والبلدية وDMV والمحكمة محمية. وكذلك المشاهد التي تتضمن لاعبًا ساقطًا يتلقى العلاج.",
    "Kidnapping & execution": "الاختطاف والإعدام",
    "Requires a story reason, a recording, and a clear demand. Executions must be a scene, never a silent click. Report them in the designated Discord channel afterwards.":
      "يتطلب سببًا قصصيًا وتسجيلًا وطلبًا واضحًا. الإعدام يجب أن يكون مشهدًا لا نقرة صامتة. أبلغ عنه لاحقًا في قناة ديسكورد المخصصة.",
    "Procedures exist": "الإجراءات موجودة",
    "LSPD, EMS and DOJ operate under written procedures. Breaking them is an in-character offence that Internal Affairs handles — not an out-of-character grievance.":
      "يعمل LSPD والإسعاف والعدالة وفق إجراءات مكتوبة. خرقها مخالفة داخل الشخصية تتولاها الشؤون الداخلية — لا شكوى خارج الشخصية.",
    "Nobody is the main character": "لا أحد هو البطل",
    "Officers are not action heroes, criminals are not untouchable, medics are not delivery services. Play the role, not the fantasy.":
      "الشرطي ليس بطل أكشن، والمجرم ليس منيعًا، والمسعف ليس خدمة توصيل. العب الدور لا الخيال.",
    "No corruption without approval": "لا فساد بدون موافقة",
    "Corrupt officers are a great story, but they require a staff-approved arc so that IA scenes stay fair for everyone involved.":
      "الشرطي الفاسد قصة رائعة، لكنه يحتاج خطًا دراميًا معتمدًا من الفريق لتبقى مشاهد الشؤون الداخلية عادلة.",
    "Voice first": "الصوت أولًا",
    "Voice roleplay is the default. Text is for phones, documents and situations where a microphone is impossible.":
      "لعب الأدوار الصوتي هو الأساس. النص للهواتف والوثائق والحالات التي يتعذر فيها الميكروفون.",
    "Keep the accent clean": "ابقَ واضحًا",
    "Use /me and /do for actions and context. No emotes that decide another player's reaction.":
      "استخدم /me و/do للأفعال والسياق. لا إيموتات تقرر رد فعل لاعب آخر.",
    "Accents, not caricatures": "لهجات لا كاريكاتير",
    "Characters may have any background. Mocking a real nationality, religion or disability — in or out of character — is not a character choice.":
      "يمكن أن تكون للشخصية أي خلفية. السخرية من جنسية أو دين أو إعاقة حقيقية — داخل اللعبة أو خارجها — ليست خيار شخصية.",
    "No OOC in local chat": "لا OOC في الدردشة المحلية",
    "Use the report system or a ticket. Arguing in character about an out-of-character problem breaks the scene for everyone around you.":
      "استخدم نظام الإبلاغ أو تذكرة. الجدال داخل الشخصية حول مشكلة خارجية يفسد المشهد للجميع.",
    "Streams and recordings": "البث والتسجيل",
    "Streaming is welcome. Do not use a stream to gain information, and do not stream another player's private scene without their consent.":
      "البث مرحّب به. لا تستخدم بثًا للحصول على معلومات، ولا تبث مشهد لاعب آخر الخاص دون موافقته.",
    "Exploits & cheats": "الثغرات والغش",
    "Any modification, macro, duplication bug or economy exploit results in a permanent ban and the removal of everything earned with it. Report bugs and you get rewarded instead.":
      "أي تعديل أو ماكرو أو خطأ تكرار أو استغلال للاقتصاد يؤدي إلى حظر دائم وحذف كل ما كُسب به. أبلغ عن الأخطاء وستُكافأ.",
    "Graduated, then final": "تدريجية ثم نهائية",
    "Warning, then a temporary ban, then a permanent ban. Severe cases — cheating, harassment, doxxing, hate speech — skip straight to permanent, without appeal.":
      "تحذير ثم حظر مؤقت ثم دائم. الحالات الجسيمة — الغش والتحرش ونشر البيانات وخطاب الكراهية — تنتقل مباشرة للدائم دون استئناف.",
    "Appeals": "الاستئناف",
    "Every sanction except the permanent category can be appealed once, in a ticket, within 14 days. Bring the recording; we will bring the logs.":
      "كل عقوبة غير دائمة يمكن استئنافها مرة واحدة في تذكرة خلال 14 يومًا. أحضر التسجيل وسنحضر السجلات.",
    "Staff decisions": "قرارات الفريق",
    "Staff are human. If you believe a decision was wrong, escalate it calmly to an administrator — never to the whole Discord.":
      "الفريق بشر. إن اعتقدت أن قرارًا خاطئ، ارفعه بهدوء إلى إداري — لا إلى كل ديسكورد.",
    "I have read the rules — apply": "قرأت القوانين — قدّم",
    "Ask a question": "اسأل سؤالًا"
  };

  const DICT = { fr: fr, ar: ar };

  let current = "en";
  let observer = null;
  let scheduled = false;

  const normalize = (value) => value.replace(/\s+/g, " ").trim();

  function applyNode(node, map) {
    if (!node.__i18nSource) node.__i18nSource = node.nodeValue;
    const source = node.__i18nSource;
    const key = normalize(source);
    if (!key) return;

    const translated = map[key];
    if (!translated) {
      if (node.nodeValue !== source) node.nodeValue = source;
      return;
    }

    const lead = source.match(/^\s*/)[0];
    const trail = source.match(/\s*$/)[0];
    const target = lead + translated + trail;
    if (node.nodeValue !== target) node.nodeValue = target;
  }

  function translateConstants(root) {
    if (!root) return;
    const map = DICT[current] || null;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest("[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
        if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!map) {
        // Back to English: restore whatever was there before translation.
        if (node.__i18nSource && node.nodeValue !== node.__i18nSource) node.nodeValue = node.__i18nSource;
        continue;
      }
      applyNode(node, map);
    }
  }

  function translatePlaceholders() {
    const map = DICT[current];
    document.querySelectorAll("[placeholder]").forEach((node) => {
      if (!node.__i18nPlaceholder) node.__i18nPlaceholder = node.getAttribute("placeholder");
      const source = node.__i18nPlaceholder;
      node.setAttribute("placeholder", (map && map[normalize(source)]) || source);
    });
  }

  const GROUP_LABELS = {
    fr: { Legal: "Métiers légaux", Civilian: "Civils" },
    ar: { Legal: "وظائف قانونية", Civilian: "مدنية" }
  };

  function translateGroups() {
    const map = GROUP_LABELS[current] || {};
    document.querySelectorAll("optgroup[label]").forEach((group) => {
      if (!group.__i18nLabel) group.__i18nLabel = group.getAttribute("label");
      const source = group.__i18nLabel;
      group.setAttribute("label", map[source] || source);
    });
  }

  function scheduleTranslate() {
    if (scheduled || !observer) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      translateConstants(document.body);
    });
  }

  function syncSelects() {
    document.querySelectorAll(".lang-select").forEach((select) => {
      select.value = current;
    });
  }

  function setLang(lang) {
    current = LANGS.includes(lang) ? lang : "en";
    document.documentElement.lang = current;
    document.documentElement.dir = current === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, current);
    } catch {
      /* storage blocked — the choice lasts for this page only */
    }
    syncSelects();
    translateConstants(document.body);
    translatePlaceholders();
    translateGroups();
    document.dispatchEvent(new CustomEvent("bcsd:lang", { detail: { lang: current } }));
  }

  function init() {
    let saved = "en";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "en";
    } catch {
      saved = "en";
    }

    document.querySelectorAll(".lang-select").forEach((select) => {
      select.addEventListener("change", () => setLang(select.value));
    });

    observer = new MutationObserver(scheduleTranslate);
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });

    setLang(saved);
  }

  window.I18N = { init: init, setLang: setLang, get lang() { return current; } };
})();
