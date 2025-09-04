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

    if (amount < 1 || amount > 999999999999) {
        alert('Please enter a valid number above 0 and below 1 trillion');
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
        "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
        "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
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
        "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
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
    
    const gen3Array = [];
    const gen4Array = [];
    const gen5Array = [];
    const gen6Array = [];
    const gen7Array = [];
    const gen8Array = [];
    const gen9Array = [];

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
    var gen4Check = document.getElementById("gen4").checked;
    var gen5Check = document.getElementById("gen5").checked;
    var gen6Check = document.getElementById("gen6").checked;
    var gen7Check = document.getElementById("gen7").checked;
    var gen8Check = document.getElementById("gen8").checked;
    var gen9Check = document.getElementById("gen9").checked;
    var allgenCheck = document.getElementById("all").checked;

    const randomIndex = Math.floor(Math.random() * choiceArray.length);
    const randomPokemon = choiceArray[randomIndex];

    document.getElementById("resultPokemon").textContent = randomPokemon;

    if (choiceArray.length == 0) {
        alert("Please choose at least one option");
    }

};
