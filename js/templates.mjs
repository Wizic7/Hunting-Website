export function countriesTempelate(country)
{
    return `<a class="country-card" href="region.html?Region=${country.region}">
                <section>
                    <h2>${country.name.common}</h2>
                    <img src="../images/flags/4x3/${country.altSpellings[0]}.svg">
                    <h3>Region:</h3>
                    <p>${country.region}</p>
                </section>
            </a>`
}

export function animalTemplete(Animal)
{
    if(Animal.PhotoCredit.Name == "")
    {
        return `<section class="animal-card">
    <p class="name">${Animal.Name}</p>
    <img src="${Animal.Image}" alt="${Animal.Alt}">
    <p>Photo from <a href="${Animal.PhotoCredit.Weblink}">${Animal.PhotoCredit.Website}</a></p>
    </section>`;
    }
    return `<section class="animal-card">
    <p class="name">${Animal.Name}</p>
    <img src="${Animal.Image}" alt="${Animal.Alt}">
    <p>Photo by <a href="${Animal.PhotoCredit.Profile}">${Animal.PhotoCredit.Name}</a> on <a href="${Animal.PhotoCredit.Weblink}">${Animal.PhotoCredit.Website}</a></p>
    </section>`;
}