// Currency Converter

const apiKey = '3d5d4dc5e856270ae07ded59';
const baseCurrency = 'GBP';
const apiUrl = `https://v6.exchangerate-api.com/v6/3d5d4dc5e856270ae07ded59/latest/${baseCurrency}`;

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (!fromCurrency || !toCurrency || !amount) {
        alert('Please fill in all fields');
        return;
    }

    if (amount < 0.01 || amount > 999999999999) {
        alert('Please enter a valid number above 0.01 and below 1 trillion');
        return;
    }

    try {
        const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
        const response = await fetch(conversionUrl);
        const data = await response.json();
        const result = data.conversion_result;
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchCurrencies);

// Pokémon Randomizer

function getRandomPokemon() {

    const gen1Array = [
        "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
        "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
        "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
        "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
        "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina",
        "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable",
        "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
        "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat",
        "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck",
        "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
        "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
        "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
        "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
        "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch’d", "Doduo",
        "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
        "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
        "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
        "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
        "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela",
        "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
        "Starmie", "Mr-Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
        "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto",
        "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte",
        "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
        "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
    ];

    const gen2Array = [
        "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion",
        "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot",
        "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat",
        "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi",
        "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos",
        "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip",
        "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma",
        "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking",
        "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress",
        "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish",
        "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring",
        "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid",
        "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom",
        "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle",
        "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank",
        "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar",
        "Tyranitar", "Lugia", "Ho-oh", "Celebi"
    ];
    
    const gen3Array = [
        "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken",
        "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon",
        "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox",
        "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry",
        "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia",
        "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth",
        "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur",
        "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass",
        "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon",
        "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle",
        "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot",
        "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt",
        "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava",
        "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose",
        "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish",
        "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith",
        "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet",
        "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol",
        "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein",
        "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon",
        "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock",
        "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon",
        "Rayquaza", "Jirachi", "Deoxys"
    ];

    const gen4Array = [
        "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape",
        "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor",
        "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio",
        "Luxray", "Budew", "Roserade", "Cranidos", "Rampardos", "Shieldon",
        "Bastiodon", "Burmy", "Wormadam", "Mothim", "Combee", "Vespiquen",
        "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos",
        "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny",
        "Mismagius", "Honchkrow", "Glameow", "Purugly", "Chingling", "Stunky",
        "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr.", "Happiny",
        "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax",
        "Riolu", "Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion",
        "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon", "Mantyke",
        "Snover", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior",
        "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon",
        "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Probopass",
        "Dusknoir", "Froslass", "Rotom", "Uxie", "Mesprit", "Azelf",
        "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia",
        "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus"
    ];

    const gen5Array = [
        "Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite",
        "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog",
        "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage",
        "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Munna",
        "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika",
        "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur",
        "Excadrill", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole",
        "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon",
        "Leavanny", "Venipede", "Whirlipede", "Scolipede", "Cottonee", "Whimsicott",
        "Petilil", "Lilligant", "Basculin", "Sandile", "Krokorok", "Krookodile",
        "Darumaka", "Darmanitan", "Maractus", "Dwebble", "Crustle", "Scraggy",
        "Scrafty", "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta",
        "Archen", "Archeops", "Trubbish", "Garbodor", "Zorua", "Zoroark",
        "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle", "Solosis",
        "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish",
        "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier",
        "Foongus", "Amoonguss", "Frillish", "Jellicent", "Alomomola", "Joltik",
        "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang",
        "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem", "Litwick",
        "Lampent", "Chandelure", "Axew", "Fraxure", "Haxorus", "Cubchoo",
        "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo",
        "Mienshao", "Druddigon", "Golett", "Golurk", "Pawniard", "Bisharp",
        "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor",
        "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona",
        "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram",
        "Zekrom", "Landorus", "Kyurem", "Keldeo", "Meloetta", "Genesect"
    ];

    const gen6Array = [
        "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox",
        "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling",
        "Fletchinder", "Talonflame", "Scatterbug", "Spewpa", "Vivillon", "Litleo",
        "Pyroar", "Flabébé", "Floette", "Florges", "Skiddo", "Gogoat",
        "Pancham", "Pangoro", "Furfrou", "Espurr", "Meowstic", "Honedge",
        "Doublade", "Aegislash", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff",
        "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge",
        "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum",
        "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink",
        "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant",
        "Pumpkaboo", "Gourgeist", "Bergmite", "Avalugg", "Noibat", "Noivern",
        "Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa", "Volcanion"
    ];
    const gen7Array = [
        "Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar",
        "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon",
        "Yungoos", "Gumshoos", "Grubbin", "Charjabug", "Vikavolt", "Crabrawler",
        "Crabominable", "Oricorio", "Cutiefly", "Ribombee", "Rockruff", "Lycanroc",
        "Wishiwashi", "Mareanie", "Toxapex", "Mudbray", "Mudsdale", "Dewpider",
        "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Salandit",
        "Salazzle", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena",
        "Comfey", "Oranguru", "Passimian", "Wimpod", "Golisopod", "Sandygast",
        "Palossand", "Pyukumuku", "Type: Null", "Silvally", "Minior", "Komala",
        "Turtonator", "Togedemaru", "Mimikyu", "Bruxish", "Drampa", "Dhelmise",
        "Jangmo-o", "Hakamo-o", "Kommo-o", "Tapu Koko", "Tapu Lele", "Tapu Bulu",
        "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego",
        "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord",
        "Necrozma", "Magearna", "Marshadow", "Poipole", "Naganadel", "Stakataka",
        "Blacephalon", "Zeraora", "Meltan", "Melmetal"
    ];

    const gen8Array = [
        "Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace",
        "Sobble", "Drizzile", "Inteleon", "Skwovet", "Greedent", "Rookidee",
        "Corvisquire", "Corviknight", "Blipbug", "Dottler", "Orbeetle", "Nickit",
        "Thievul", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Chewtle",
        "Drednaw", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal",
        "Applin", "Flapple", "Appletun", "Silicobra", "Sandaconda", "Cramorant",
        "Arrokuda", "Barraskewda", "Toxel", "Toxtricity", "Sizzlipede", "Centiskorch",
        "Clobbopus", "Grapploct", "Sinistea", "Polteageist", "Hatenna", "Hattrem",
        "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Obstagoon", "Perrserker",
        "Cursola", "Sirfetch’d", "Mr. Rime", "Runerigus", "Milcery", "Alcremie",
        "Falinks", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue",
        "Indeedee", "Morpeko", "Cufant", "Copperajah", "Dracozolt", "Arctozolt",
        "Dracovish", "Arctovish", "Duraludon", "Dreepy", "Drakloak", "Dragapult",
        "Zacian", "Zamazenta", "Eternatus", "Kubfu", "Urshifu", "Zarude",
        "Regieleki", "Regidrago", "Glastrier", "Spectrier", "Calyrex", "Wyrdeer",
        "Kleavor", "Ursaluna", "Basculegion", "Sneasler", "Overqwil", "Enamorus"
    ];

    const gen9Array = [
        "Sprigatito", "Floragato", "Meowscarada", "Fuecoco", "Crocalor", "Skeledirge",
        "Quaxly", "Quaxwell", "Quaquaval", "Lechonk", "Oinkologne", "Tarountula",
        "Spidops", "Nymble", "Lokix", "Pawmi", "Pawmo", "Pawmot",
        "Tandemaus", "Maushold", "Fidough", "Dachsbun", "Smoliv", "Dolliv",
        "Arboliva", "Squawkabilly", "Nacli", "Naclstack", "Garganacl", "Charcadet",
        "Armarouge", "Ceruledge", "Tadbulb", "Bellibolt", "Wattrel", "Kilowattrel",
        "Maschiff", "Mabosstiff", "Shroodle", "Grafaiai", "Bramblin", "Brambleghast",
        "Toedscool", "Toedscruel", "Klawf", "Capsakid", "Scovillain", "Rellor",
        "Rabsca", "Flittle", "Espathra", "Tinkatink", "Tinkatuff", "Tinkaton",
        "Wiglett", "Wugtrio", "Bombirdier", "Finizen", "Palafin", "Varoom",
        "Revavroom", "Cyclizar", "Orthworm", "Glimmet", "Glimmora", "Greavard",
        "Houndstone", "Flamigo", "Cetoddle", "Cetitan", "Veluza", "Dondozo",
        "Tatsugiri", "Annihilape", "Clodsire", "Farigiraf", "Dudunsparce", "Kingambit",
        "Great Tusk", "Scream Tail", "Brute Bonnet", "Flutter Mane", "Slither Wing", "Sandy Shocks",
        "Iron Treads", "Iron Bundle", "Iron Hands", "Iron Jugulis", "Iron Moth", "Iron Thorns",
        "Frigibax", "Arctibax", "Baxcalibur", "Gimmighoul", "Gholdengo", "Wo-Chien",
        "Chien-Pao", "Ting-Lu", "Chi-Yu", "Roaring Moon", "Iron Valiant", "Koraidon",
        "Miraidon", "Walking Wake", "Iron Leaves", "Dipplin", "Poltchageist", "Sinistcha",
        "Okidogi", "Munkidori", "Fezandipiti", "Ogerpon", "Archaludon", "Hydrapple",
        "Gouging Fire", "Raging Bolt", "Iron Boulder", "Iron Crown", "Terapagos", "Pecharunt"
    ];

    const testArray = [
        "Enamorous-Therian"
    ];

    let choiceArray = [];

    var gen1Check = document.getElementById("gen1").checked;

    if (gen1Check) {

        choiceArray.push(...gen1Array);

    };

    var gen2Check = document.getElementById("gen2").checked;

    if (gen2Check) {

        choiceArray.push(...gen2Array);

    };

    var gen3Check = document.getElementById("gen3").checked;

    if (gen3Check) {

        choiceArray.push(...gen3Array);

    };

    var gen4Check = document.getElementById("gen4").checked;

    if (gen4Check) {

        choiceArray.push(...gen4Array);
    };

    var gen5Check = document.getElementById("gen5").checked;

    if (gen5Check) {

        choiceArray.push(...gen5Array);

    };

    var gen6Check = document.getElementById("gen6").checked;

    if (gen6Check) {

        choiceArray.push(...gen6Array);

    };

    var gen7Check = document.getElementById("gen7").checked;

    if (gen7Check) {

        choiceArray.push(...gen7Array);

    };

    var gen8Check = document.getElementById("gen8").checked;

    if (gen8Check) {

        choiceArray.push(...gen8Array);

    };

    var gen9Check = document.getElementById("gen9").checked;

    if (gen9Check) {

        choiceArray.push(...gen9Array);

    };

    var allgenCheck = document.getElementById("all").checked;

    if (allgenCheck) {

        choiceArray.push(...gen1Array);
        choiceArray.push(...gen2Array);
        choiceArray.push(...gen3Array);
        choiceArray.push(...gen4Array);
        choiceArray.push(...gen5Array);
        choiceArray.push(...gen6Array);
        choiceArray.push(...gen7Array);
        choiceArray.push(...gen8Array);
        choiceArray.push(...gen9Array);

    };

    var testCheck = document.getElementById("test").checked;

    if (testCheck) {

        choiceArray.push(...testArray);
    
    };

    if (choiceArray.length == 0) {
        alert("Please choose at least one option");
        return;
    }

    const randomIndex = Math.floor(Math.random() * choiceArray.length);
    const randomPokemon = choiceArray[randomIndex];

    function formatName(name) {
        return name
            .toLowerCase()
            .split(/[-\s]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
}

    function showPokemon(randomPokemon) {
        const displayName = formatName(randomPokemon);
        const urlName = randomPokemon.toLowerCase().replace(/[^a-z0-9]/g, "");
        const urlImg = `https://play.pokemonshowdown.com/sprites/gen5/${urlName}.png`;

        const container = document.getElementById("resultPokemon");

        container.innerHTML = `
            <div>${displayName}</div>
            <div class="spinner"></div>
        `;

        const img = new Image();
        img.src = urlImg;
        img.alt = displayName;

        img.onload = () => {
            container.innerHTML = `<div>${displayName}</div>`;
            container.appendChild(img);
        };

        img.onerror = () => {
            container.innerHTML = `<div>${displayName}</div>
            <div style="red">Image not available</div>`;
        };
    }

    showPokemon(randomPokemon);
};

// Times Table Helper

document.getElementById("times-table-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const number = parseInt(document.getElementById("number").value);
    const limit = parseInt(document.getElementById("limit").value);

    const randomMultiplier = Math.floor(Math.random() * limit) + 1;
    const correctAnswer = number * randomMultiplier;

    document.getElementById("question").innerText = `What is ${number} x ${randomMultiplier}?`;
    document.getElementById("question-section").style.display = "block";

    document.getElementById("feedback").innerText = "";

    document.getElementById("checkAnswerButton").onclick = function() {
        const userAnswer = parseInt(document.getElementById("answer").value);
        const feedbackElement = document.getElementById("feedback");
        if (userAnswer === correctAnswer) {
            feedbackElement.innerText = "Correct!";
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerText = `Incorrect. The correct answer is ${correctAnswer}.`;
            feedbackElement.style.color = "red";
        }
    }
});

// Fatebringer

let options = [];

function addOption() {
    const newOption = document.getElementById("option").value;

    options.push(newOption);

    document.getElementById("option-section").style.display = "block";

    renderOptions();

    input.value = "";

};

function renderOptions() {
    const list =document.getElementById("option-list");

    list.innerHTML = "";

    options.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        list.appendChild(li);
    });
}

function decideFate() {
    const optionsRandIndex = Math.floor(Math.random() * options.length);
    const finalChoice = options[optionsRandIndex];

    const p = document.getElementById("final-choice");

    p.innerHTML = `${finalChoice}`;
};

// Weather App

const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const weatherApiKey = "553f5fda1bc3ae7464c97a29ae97e2f6";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) { 
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city name");
    }
});

async function getWeatherData(city) {


    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {

    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
              return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
              return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
              return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
              return "❄️";
        case (weatherId >= 700 && weatherId < 800):
              return "🌫️";
        case (weatherId === 800):
              return "☀️";
        case (weatherId >= 801 && weatherId < 810):
              return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

// Filters

const invertSlider = document.getElementById("invert");
const blurSlider = document.getElementById("blur");
const contrastSlider = document.getElementById("contrast");
const sepiaSlider = document.getElementById("sepia");
const saturateSlider = document.getElementById("saturate");
const hueRotateSlider = document.getElementById("hue-rotate");
const grayscaleSlider = document.getElementById("grayscale");
const brightnessSlider = document.getElementById("brightness");
const opacitySlider = document.getElementById("opacity");

function updateFilters() {
    const invertValue = invertSlider.value;
    const blurValue = blurSlider.value;
    const contrastValue = contrastSlider.value;
    const sepiaValue = sepiaSlider.value;
    const saturateValue = saturateSlider.value;
    const hueRotateValue = hueRotateSlider.value;
    const grayscaleValue = grayscaleSlider.value;
    const brightnessValue = brightnessSlider.value;
    const opacityValue = opacitySlider.max - opacitySlider.value;

    document.documentElement.style.filter = `invert(${invertValue}%)
                                             blur(${blurValue}px) 
                                             contrast(${contrastValue}%) 
                                             sepia(${sepiaValue}%) 
                                             saturate(${saturateValue}%) 
                                             hue-rotate(${hueRotateValue}deg) 
                                             grayscale(${grayscaleValue}%)
                                             brightness(${brightnessValue}%) 
                                             opacity(${opacityValue}%)`;

}

 


updateFilters();

invertSlider.addEventListener("input", updateFilters);
blurSlider.addEventListener("input", updateFilters);
contrastSlider.addEventListener("input", updateFilters);
sepiaSlider.addEventListener("input", updateFilters);
saturateSlider.addEventListener("input", updateFilters);
hueRotateSlider.addEventListener("input", updateFilters);
grayscaleSlider.addEventListener("input", updateFilters);
brightnessSlider.addEventListener("input", updateFilters);
opacitySlider.addEventListener("input", updateFilters);

function resetFilters() {

    invertSlider.value = 0;
    blurSlider.value = 0;
    contrastSlider.value = 100;
    sepiaSlider.value = 0;
    saturateSlider.value = 100;
    hueRotateSlider.value = 0;
    grayscaleSlider.value = 0;
    brightnessSlider.value = 100;
    opacitySlider.value = 0;

    updateFilters();

}

// Calculator

const display = document.querySelector('.display');

function appendToDisplay(input) {

    display.value += input;

}

function clearDisplay() {

    display.value = "";

}

function calculate() {

    try {

        display.value = eval(display.value);

    }
    catch(error) {

        display.value = "Error";
        
    }
}

// Stopwatch

const stopwatchDisplay = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {

    if(!isRunning) {

        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        console.log(elapsedTime);
    }
}

function stop() {

    if(isRunning) {

        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;

    }

}

function reset() {

    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    stopwatchDisplay.textContent = "00:00:00:00";
    
}

function update() {
    console.log("update running");
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Random Cat 

const catImage = document.getElementById("cat-image");
const breed = document.getElementById("cat-breed");
const temperament = document.getElementById("cat-temp");
const origin = document.getElementById("cat-origin");
const description = document.getElementById("cat-desc");

async function fetchCat() {

    const response = await fetch("https://api.thecatapi.com/v1/images/search?has_breeds=1", {

        headers: {

            "x-api-key": "live_6Mp412toxS5v7xzRCLGvcaM43uQLOkR6UgAgySH93sqwmBpxLW9kdm0UsJgunvX6"

        }
        
    });

    const data = await response.json();

    const cat = data[0];
    catImage.style.display = "block";
    catImage.src = data[0].url;
    breed.textContent = `Breed: ${cat.breeds[0].name}`;
    temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
    origin.textContent = `Origin: ${cat.breeds[0].origin}`;
    description.textContent = `Description: ${cat.breeds[0].description}`;

}

// Lightswitch

const onSwitch = document.getElementById("on-switch");
const offSwitch = document.getElementById("off-switch");
const body = document.getElementById("body");
const lightswitch = document.getElementById("lightswitch");

function lightsOff() {

    const elements = document.querySelectorAll('*:not(.always-on)');

    elements.forEach(el => {

        el.style.display = "none";

    })

    body.style.background = "black";

    lightswitch.style.position = "absolute";
    lightswitch.style.top = "50%";
    lightswitch.style.right = "50%";
    lightswitch.style.transform = "translate(50%, -50%)";
    lightswitch.style.height = "25vh";
    lightswitch.style.width = "25vw";
    lightswitch.style.border = "none";
    lightswitch.style.background = "black";

    onSwitch.style.filter = "drop-shadow(0 0 30px #f9feba)"

    onSwitch.style.display = "block";
    offSwitch.style.display = "none";

    resetFilters();
    
}

function lightsOn() {

    const elements = document.querySelectorAll('*:not(.always-on');

    elements.forEach(el => {

        el.style.display = "";

    });

    body.style.background = "";
    lightswitch.style = "";

    onSwitch.style.display = "none";
    offSwitch.style.display = "block";
}

offSwitch.addEventListener('click', lightsOff);
onSwitch.addEventListener('click', lightsOn);
