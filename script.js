let api = `https://v6.exchangerate-api.com/v6/1135ecd86bff9e395101b2b8/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const iofRate = 1.1;

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
    });

    currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.text = currency;
        toDropDown.add(option);
    });

    fromDropDown.value = "BRL";
    toDropDown.value = "USD";
    let converterForm = () => {

        const amount = document.querySelector("#amount").value;
        const fromCurrency = fromDropDown.value;
        const toCurrency = toDropDown.value;

        if (amount.length != 0) {
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            if (fromDropDown.value == "BRL" && toDropDown.value == "BRL"){
                conversionResult.textContent = `${amount} ${fromCurrency} equivale a ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } else {
                const iofAmount = amount * iofRate;
                const totalAmountWithIOF = convertedAmount + iofAmount;
                conversionResult.textContent = `${amount} ${fromCurrency} equivale a ${convertedAmount.toFixed(2)} ${toCurrency}
                (inclui IOF de ${iofAmount.toFixed(2)} ${toCurrency}, totalizando ${totalAmountWithIOF.toFixed(2)} ${toCurrency})`;
            }
            });
        } else {
        alert("Por favor preencha a quantia.");
        }
    };

  document
    .querySelector("#submit")
    .addEventListener("click", converterForm);